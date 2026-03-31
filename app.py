from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import sqlite3
from pathlib import Path
from datetime import datetime
import os
import time
import hmac
from collections import defaultdict, deque
from functools import wraps

app = Flask(__name__)
CORS(app)
app.config["MAX_CONTENT_LENGTH"] = 64 * 1024

DATABASE = "salud_campus.db"
BASE_DIR = Path(__file__).resolve().parent
ADMIN_API_KEY = os.getenv("ADMIN_API_KEY", "mayraperrilla")

# Rate limiting simple en memoria por IP y endpoint.
RATE_LIMIT_STORAGE = defaultdict(deque)


def client_ip():
    return (request.headers.get("X-Forwarded-For", "").split(",")[0].strip()
            or request.remote_addr
            or "unknown")


def rate_limit(max_requests, window_seconds):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            now = time.time()
            key = (client_ip(), request.endpoint)
            bucket = RATE_LIMIT_STORAGE[key]

            while bucket and now - bucket[0] > window_seconds:
                bucket.popleft()

            if len(bucket) >= max_requests:
                return jsonify({"success": False, "error": "Demasiadas solicitudes. Intenta de nuevo más tarde."}), 429

            bucket.append(now)
            return func(*args, **kwargs)

        return wrapper

    return decorator


def clean_text(value, max_len=120):
    if value is None:
        return ""
    return str(value).strip()[:max_len]


def validate_guardar_payload(data):
    if not isinstance(data, dict):
        return "Formato de petición inválido"

    role = data.get("role")
    if role not in {"alumno", "admin"}:
        return "Rol inválido"

    student = data.get("studentData") or {}
    if not isinstance(student, dict):
        return "Datos de usuario inválidos"

    matricula = clean_text(student.get("matricula"), 20)
    name = clean_text(student.get("name"), 120)
    seguro = clean_text(student.get("seguro"), 40)
    if not matricula or not name or not seguro:
        return "Faltan campos obligatorios de usuario"

    age = student.get("age")
    try:
        age = int(age)
    except (TypeError, ValueError):
        return "Edad inválida"
    if age < 15 or age > 99:
        return "Edad fuera de rango"

    answers = data.get("answers")
    if not isinstance(answers, list) or not answers or len(answers) > 80:
        return "Respuestas inválidas"

    valid_sections = {"Estrés", "Sueño", "Hábitos Saludables"}
    for ans in answers:
        if not isinstance(ans, dict):
            return "Formato de respuesta inválido"
        question_id = clean_text(ans.get("questionId"), 20)
        question_text = clean_text(ans.get("questionText"), 300)
        section = clean_text(ans.get("section"), 40)
        answer_text = clean_text(ans.get("answerText"), 200)
        if not question_id or not question_text or not answer_text or section not in valid_sections:
            return "Contenido de respuesta inválido"
        try:
            score = int(ans.get("score", 0))
        except (TypeError, ValueError):
            return "Puntaje inválido"
        if score < 0 or score > 10:
            return "Puntaje fuera de rango"

    return None


@app.after_request
def set_security_headers(response):
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
    # Se permite inline por los onclick actuales del proyecto.
    response.headers["Content-Security-Policy"] = (
        "default-src 'self'; "
        "script-src 'self' 'unsafe-inline' https://unpkg.com https://cdnjs.cloudflare.com; "
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
        "font-src 'self' https://fonts.gstatic.com; "
        "img-src 'self' data:; "
        "connect-src 'self';"
    )
    return response

# ==========================
# CONEXIÓN A BASE DE DATOS
# ==========================
def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn


# ==========================
# CREAR TABLAS (AUTO)
# ==========================
def create_tables():
    conn = get_db_connection()
    cursor = conn.cursor()

    def has_expected_columns(table_name, expected_columns):
        cursor.execute(f"PRAGMA table_info({table_name})")
        cols = {row[1] for row in cursor.fetchall()}
        return expected_columns.issubset(cols)

    evaluaciones_cols = {"id", "fecha", "rol", "nombre", "edad", "matricula", "carrera_puesto", "puntaje", "riesgo"}
    respuestas_cols = {"id", "evaluacion_id", "pregunta_id", "seccion", "respuesta", "puntaje"}
    respuestas_usuario_cols = {"id_respuesta", "id_evaluacion", "id_pregunta", "id_opcion"}

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS Usuarios (
        id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
        id_rol INTEGER NOT NULL,
        matricula TEXT UNIQUE NOT NULL,
        nombre TEXT NOT NULL,
        edad INTEGER,
        turno TEXT,
        carrera TEXT,
        puesto TEXT,
        email TEXT,
        seguro_medico TEXT
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS Roles (
        id_rol INTEGER PRIMARY KEY,
        nombre_rol TEXT NOT NULL
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS Preguntas (
        id_pregunta INTEGER PRIMARY KEY AUTOINCREMENT,
        id_rol INTEGER NOT NULL,
        categoria TEXT NOT NULL,
        enunciado TEXT NOT NULL,
        FOREIGN KEY (id_rol) REFERENCES Roles(id_rol)
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS Opciones (
        id_opcion INTEGER PRIMARY KEY AUTOINCREMENT,
        id_pregunta INTEGER NOT NULL,
        texto_opcion TEXT NOT NULL,
        valor_puntos INTEGER NOT NULL,
        FOREIGN KEY (id_pregunta) REFERENCES Preguntas(id_pregunta)
    )
    """)

    cursor.execute("INSERT OR IGNORE INTO Roles (id_rol, nombre_rol) VALUES (1, 'alumno')")
    cursor.execute("INSERT OR IGNORE INTO Roles (id_rol, nombre_rol) VALUES (2, 'administrativo')")

    cursor.execute("PRAGMA table_info(Usuarios)")
    usuarios_actual_cols = {row[1] for row in cursor.fetchall()}
    if "seguro_medico" not in usuarios_actual_cols:
        cursor.execute("ALTER TABLE Usuarios ADD COLUMN seguro_medico TEXT")
    if "puesto" not in usuarios_actual_cols:
        cursor.execute("ALTER TABLE Usuarios ADD COLUMN puesto TEXT")

    # Garantiza matricula unica aunque la tabla venga de versiones antiguas.
    cursor.execute("CREATE UNIQUE INDEX IF NOT EXISTS idx_usuarios_matricula ON Usuarios(matricula)")

    # Impide cambios de matricula una vez creada la fila.
    cursor.execute("DROP TRIGGER IF EXISTS trg_usuarios_matricula_inmutable")
    cursor.execute("""
    CREATE TRIGGER trg_usuarios_matricula_inmutable
    BEFORE UPDATE OF matricula ON Usuarios
    FOR EACH ROW
    WHEN NEW.matricula <> OLD.matricula
    BEGIN
        SELECT RAISE(ABORT, 'La matricula no se puede cambiar');
    END;
    """)

    # Si las tablas existen con un esquema diferente, se recrean para evitar errores de columnas.
    if not has_expected_columns("evaluaciones", evaluaciones_cols):
        cursor.execute("DROP TABLE IF EXISTS respuestas")
        cursor.execute("DROP TABLE IF EXISTS evaluaciones")

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS evaluaciones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fecha TEXT,
        rol TEXT,
        nombre TEXT,
        edad INTEGER,
        matricula TEXT,
        carrera_puesto TEXT,
        puntaje INTEGER,
        riesgo TEXT
    )
    """)

    # Migracion no destructiva: agrega columna seguro si no existe.
    cursor.execute("PRAGMA table_info(evaluaciones)")
    evaluaciones_actual_cols = {row[1] for row in cursor.fetchall()}
    if "seguro" not in evaluaciones_actual_cols:
        cursor.execute("ALTER TABLE evaluaciones ADD COLUMN seguro TEXT")

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS respuestas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        evaluacion_id INTEGER,
        pregunta_id TEXT,
        seccion TEXT,
        respuesta TEXT,
        puntaje INTEGER,
        FOREIGN KEY (evaluacion_id) REFERENCES evaluaciones(id)
    )
    """)

    if not has_expected_columns("respuestas", respuestas_cols):
        cursor.execute("DROP TABLE IF EXISTS respuestas")
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS respuestas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            evaluacion_id INTEGER,
            pregunta_id TEXT,
            seccion TEXT,
            respuesta TEXT,
            puntaje INTEGER,
            FOREIGN KEY (evaluacion_id) REFERENCES evaluaciones(id)
        )
        """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS Respuestas_Usuario (
        id_respuesta INTEGER PRIMARY KEY AUTOINCREMENT,
        id_evaluacion INTEGER NOT NULL,
        id_pregunta INTEGER NOT NULL,
        id_opcion INTEGER NOT NULL,
        FOREIGN KEY (id_evaluacion) REFERENCES evaluaciones(id),
        FOREIGN KEY (id_pregunta) REFERENCES Preguntas(id_pregunta),
        FOREIGN KEY (id_opcion) REFERENCES Opciones(id_opcion)
    )
    """)

    if not has_expected_columns("Respuestas_Usuario", respuestas_usuario_cols):
        cursor.execute("DROP TABLE IF EXISTS Respuestas_Usuario")
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS Respuestas_Usuario (
            id_respuesta INTEGER PRIMARY KEY AUTOINCREMENT,
            id_evaluacion INTEGER NOT NULL,
            id_pregunta INTEGER NOT NULL,
            id_opcion INTEGER NOT NULL,
            FOREIGN KEY (id_evaluacion) REFERENCES evaluaciones(id),
            FOREIGN KEY (id_pregunta) REFERENCES Preguntas(id_pregunta),
            FOREIGN KEY (id_opcion) REFERENCES Opciones(id_opcion)
        )
        """)

    # Tablas espejo del esquema de database.py.
    # En SQLite, nombres de tabla con distinto case (Evaluaciones vs evaluaciones)
    # colisionan, por eso se usa sufijo _dbpy.
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS Evaluaciones_dbpy (
        id_evaluacion INTEGER PRIMARY KEY AUTOINCREMENT,
        id_usuario INTEGER NOT NULL,
        puntaje_total INTEGER,
        nivel_riesgo TEXT,
        fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS Respuestas_Detalle_dbpy (
        id_detalle INTEGER PRIMARY KEY AUTOINCREMENT,
        id_evaluacion INTEGER NOT NULL,
        id_pregunta INTEGER NOT NULL,
        id_opcion INTEGER NOT NULL,
        FOREIGN KEY (id_evaluacion) REFERENCES Evaluaciones_dbpy(id_evaluacion)
    )
    """)

    conn.commit()
    conn.close()


create_tables()


# ==========================
# FRONTEND (SERVIR ARCHIVOS)
# ==========================
@app.route("/")
def home_page():
    return send_from_directory(BASE_DIR, "index.html")


@app.route("/login")
def login_page():
    return send_from_directory(BASE_DIR, "login.html")


@app.route("/privacy")
def privacy_page():
    return send_from_directory(BASE_DIR, "privacy.html")


@app.route("/<path:filename>")
def static_files(filename):
    allowed_files = {"script.js", "style.css", "index.html", "login.html", "privacy.html"}
    if filename in allowed_files:
        return send_from_directory(BASE_DIR, filename)
    return jsonify({"error": "Archivo no encontrado"}), 404


# ==========================
# CALCULAR NIVEL DE RIESGO
# ==========================
def calcular_riesgo(score, max_score):
    if max_score <= 0:
        return "Alto"

    porcentaje = (score / max_score) * 100

    if porcentaje >= 75:
        return "Bajo"
    elif porcentaje >= 50:
        return "Moderado"
    elif porcentaje >= 30:
        return "Medio Alto"
    else:
        return "Alto"


def resolve_question_option_ids(cursor, role_id, section, question_text, answer_text, answer_score):
    # Busca o crea la pregunta para garantizar referencia relacional.
    cursor.execute(
        "SELECT id_pregunta FROM Preguntas WHERE id_rol = ? AND enunciado = ? LIMIT 1",
        (role_id, question_text)
    )
    row = cursor.fetchone()
    if row:
        id_pregunta = row[0]
    else:
        cursor.execute(
            "INSERT INTO Preguntas (id_rol, categoria, enunciado) VALUES (?, ?, ?)",
            (role_id, section, question_text)
        )
        id_pregunta = cursor.lastrowid

    # Busca o crea la opcion seleccionada.
    cursor.execute(
        """
        SELECT id_opcion
        FROM Opciones
        WHERE id_pregunta = ? AND texto_opcion = ? AND valor_puntos = ?
        LIMIT 1
        """,
        (id_pregunta, answer_text, answer_score)
    )
    opt_row = cursor.fetchone()
    if opt_row:
        id_opcion = opt_row[0]
    else:
        cursor.execute(
            "INSERT INTO Opciones (id_pregunta, texto_opcion, valor_puntos) VALUES (?, ?, ?)",
            (id_pregunta, answer_text, answer_score)
        )
        id_opcion = cursor.lastrowid

    return id_pregunta, id_opcion


# ==========================
# GUARDAR EVALUACIÓN
# ==========================
@app.route("/guardar", methods=["POST"])
@rate_limit(40, 60)
def guardar():
    data = request.get_json(silent=True)

    validation_error = validate_guardar_payload(data)
    if validation_error:
        return jsonify({"success": False, "error": validation_error}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        student = data.get("studentData", {})
        answers = data.get("answers", [])
        role = data.get("role")
        matricula = student.get("matricula")

        if not matricula:
            return jsonify({"success": False, "error": "La matricula es obligatoria"}), 400

        role_id = 1 if role == "alumno" else 2

        # El puntaje total se calcula con los valores enviados por cada opcion en script.js.
        total_score = sum(int(ans.get("score", 0) or 0) for ans in answers)
        max_score = len(answers) * 10
        riesgo = calcular_riesgo(total_score, max_score)

        # INSERTA/ACTUALIZA usuario por matricula incluyendo seguro medico.
        cursor.execute("""
        INSERT INTO Usuarios (id_rol, matricula, nombre, edad, carrera, puesto, seguro_medico)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(matricula) DO UPDATE SET
            id_rol = excluded.id_rol,
            nombre = excluded.nombre,
            edad = excluded.edad,
            carrera = excluded.carrera,
            puesto = excluded.puesto,
            seguro_medico = excluded.seguro_medico
        """, (
            role_id,
            matricula,
            student.get("name"),
            student.get("age"),
            student.get("carrera"),
            student.get("puesto"),
            student.get("seguro")
        ))

        # Obtiene id_usuario para guardar tambien en esquema Evaluaciones/Respuestas_Detalle.
        cursor.execute("SELECT id_usuario FROM Usuarios WHERE matricula = ? LIMIT 1", (matricula,))
        usuario_row = cursor.fetchone()
        if not usuario_row:
            return jsonify({"success": False, "error": "No se pudo resolver el usuario"}), 500
        id_usuario = usuario_row[0]

        # INSERTAR EVALUACIÓN
        cursor.execute("""
        INSERT INTO evaluaciones (
            fecha, rol, nombre, edad, matricula, carrera_puesto, seguro, puntaje, riesgo
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            datetime.now().strftime("%Y-%m-%d"),
            role,
            student.get("name"),
            student.get("age"),
            student.get("matricula"),
            student.get("carrera") or student.get("puesto"),
            student.get("seguro"),
            total_score,
            riesgo
        ))

        evaluacion_id = cursor.lastrowid

        # Inserta evaluacion espejo en esquema de database.py (tabla sin colision).
        cursor.execute("""
        INSERT INTO Evaluaciones_dbpy (
            id_usuario, puntaje_total, nivel_riesgo
        ) VALUES (?, ?, ?)
        """, (
            id_usuario,
            total_score,
            riesgo
        ))

        evaluacion_id_alt = cursor.lastrowid

        # INSERTAR RESPUESTAS EN ESTRUCTURA RELACIONAL (Respuestas_Usuario)
        for ans in answers:
            answer_score = int(ans.get("score", 0) or 0)
            question_text = clean_text(ans.get("questionText"), 300)
            answer_text = clean_text(ans.get("answerText"), 200)
            section = clean_text(ans.get("section"), 40)

            id_pregunta, id_opcion = resolve_question_option_ids(
                cursor,
                role_id,
                section,
                question_text,
                answer_text,
                answer_score
            )

            cursor.execute("""
            INSERT INTO Respuestas_Usuario (
                id_evaluacion, id_pregunta, id_opcion
            ) VALUES (?, ?, ?)
            """, (
                evaluacion_id,
                id_pregunta,
                id_opcion
            ))

            # Inserta detalle espejo en esquema de database.py (tabla sin colision).
            cursor.execute("""
            INSERT INTO Respuestas_Detalle_dbpy (
                id_evaluacion, id_pregunta, id_opcion
            ) VALUES (?, ?, ?)
            """, (
                evaluacion_id_alt,
                id_pregunta,
                id_opcion
            ))

        conn.commit()
        conn.close()

        return jsonify({"success": True})

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


# ==========================
# OBTENER TODAS LAS EVALUACIONES
# ==========================
@app.route("/evaluaciones", methods=["GET"])
@rate_limit(120, 60)
def obtener_evaluaciones():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM evaluaciones ORDER BY id DESC")
    evaluaciones = cursor.fetchall()

    result = []
    for ev in evaluaciones:
        result.append({
            "id": ev["id"],
            "fecha": ev["fecha"],
            "rol": ev["rol"],
            "nombre": ev["nombre"],
            "edad": ev["edad"],
            "matricula": ev["matricula"],
            "carrera_puesto": ev["carrera_puesto"],
            "seguro": ev["seguro"],
            "puntaje": ev["puntaje"],
            "riesgo": ev["riesgo"]
        })

    conn.close()
    return jsonify(result)


# ==========================
# OBTENER RESPUESTAS POR ID
# ==========================
@app.route("/respuestas/<int:evaluacion_id>", methods=["GET"])
@rate_limit(120, 60)
def obtener_respuestas(evaluacion_id):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            ru.id_pregunta,
            p.categoria AS seccion,
            p.enunciado AS pregunta,
            o.texto_opcion AS respuesta,
            o.valor_puntos AS puntaje
        FROM Respuestas_Usuario ru
        JOIN Preguntas p ON p.id_pregunta = ru.id_pregunta
        JOIN Opciones o ON o.id_opcion = ru.id_opcion
        WHERE ru.id_evaluacion = ?
        ORDER BY ru.id_respuesta ASC
    """, (evaluacion_id,))

    respuestas = cursor.fetchall()

    result = []
    for r in respuestas:
        result.append({
            "pregunta_id": r["id_pregunta"],
            "seccion": r["seccion"],
            "pregunta": r["pregunta"],
            "respuesta": r["respuesta"],
            "puntaje": r["puntaje"]
        })

    conn.close()
    return jsonify(result)


# ==========================
# BORRAR TODO (ADMIN)
# ==========================
@app.route("/borrar", methods=["DELETE"])
@rate_limit(10, 60)
def borrar_todo():
    provided_key = request.headers.get("X-Admin-Key", "")
    if not hmac.compare_digest(provided_key, ADMIN_API_KEY):
        return jsonify({"success": False, "error": "No autorizado"}), 401

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM Respuestas_Usuario")
    cursor.execute("DELETE FROM respuestas")
    cursor.execute("DELETE FROM evaluaciones")

    conn.commit()
    conn.close()

    return jsonify({"success": True})


# ==========================
# ESTADÍSTICAS
# ==========================
@app.route("/estadisticas", methods=["GET"])
@rate_limit(120, 60)
def estadisticas():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) as total FROM evaluaciones")
    total = cursor.fetchone()["total"]

    cursor.execute("SELECT AVG(puntaje) as promedio FROM evaluaciones")
    promedio = cursor.fetchone()["promedio"] or 0

    cursor.execute("SELECT COUNT(*) as alto FROM evaluaciones WHERE riesgo IN ('Alto', 'Medio Alto')")
    alto = cursor.fetchone()["alto"]

    cursor.execute("SELECT COUNT(*) as medio FROM evaluaciones WHERE riesgo = 'Moderado'")
    medio = cursor.fetchone()["medio"]

    cursor.execute("SELECT COUNT(*) as bajo FROM evaluaciones WHERE riesgo = 'Bajo'")
    bajo = cursor.fetchone()["bajo"]

    conn.close()

    return jsonify({
        "total": total,
        "promedio": round(promedio, 2),
        "alto": alto,
        "medio": medio,
        "bajo": bajo
    })


# ==========================
# MAIN
# ==========================
import os

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 10000)),
        debug=False
    )