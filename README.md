
🏥 Salud Campus | Evaluación de Bienestar Integral
 
📌 Descripción
Salud Campus es una plataforma digital robusta diseñada para el monitoreo y análisis del bienestar físico y mental de la comunidad universitaria.
A través de un enfoque clínico-preventivo, la aplicación permite identificar factores de riesgo en áreas críticas como:
•	Estrés académico/laboral
•	Higiene del sueño
•	Hábitos de vida saludables
 
🎯 Objetivo
El objetivo del proyecto es:
•	Evaluar el bienestar integral de estudiantes y personal
•	Detectar factores de riesgo de manera temprana
•	Generar reportes con recomendaciones personalizadas
•	Promover una cultura de salud dentro del campus
 
🚀 Funcionalidades Principales
🧠 1. Motor de Evaluación Dinámica
•	Segmentación de roles:
Cuestionarios diferenciados para:
o	Alumnos (enfoque académico)
o	Administrativos (enfoque laboral)
•	Indicadores de progreso:
Barra visual y navegación por secciones:
o	Estrés
o	Sueño
o	Hábitos
•	Lógica de riesgo:
Clasificación automática:
o	Bajo
o	Moderado
o	Medio Alto
o	Alto
Basada en el porcentaje obtenido vs puntaje máximo.
 
🔐 2. Seguridad
•	Protección básica contra múltiples solicitudes repetidas (evita saturación del sistema)
•	Configuración de seguridad en el servidor para reducir riesgos comunes en aplicaciones web
•	Acceso administrativo protegido mediante clave
 
📊 3. Reportes y Analítica
•	Exportación a PDF:
Reportes personalizados con recomendaciones.
•	Dashboard administrativo:
o	Gráficas de distribución de riesgo
o	Historial de evaluaciones
o	Tablas dinámicas de resultados
 
🏗️ Arquitectura del Sistema
El sistema sigue una arquitectura cliente-servidor:
•	Frontend (Cliente): Interfaz dinámica en HTML, CSS y JavaScript
•	Backend (Servidor): API REST construida con Flask
•	Base de Datos: SQLite para almacenamiento local
Flujo general:
1.	El usuario interactúa con la interfaz
2.	Se envían solicitudes a la API
3.	El servidor procesa y consulta la base de datos
4.	Se devuelve la respuesta al cliente
 

🔌 Endpoints principales (API)
Método	Endpoint	Descripción
GET	/preguntas	Obtiene preguntas del cuestionario
POST	/guardar	Guarda evaluación del usuario
GET	/resultados	Consulta resultados
 
🧮 Algoritmo de Evaluación
El sistema calcula el nivel de riesgo mediante:
1.	Suma de puntajes por sección
2.	Comparación con puntaje máximo posible
3.	Conversión a porcentaje
4.	Clasificación en niveles de riesgo
Esto permite generar recomendaciones personalizadas automáticamente.
 
📂 Estructura del Proyecto
salud-campus/
│
├── DATABASE/
│   ├── database.py        # Inicialización y esquema de BD
│   └── salud_campus.db   # Base de datos SQLite
│
├── SRC/
│   ├── app.py            # Servidor Flask (API + seguridad)
│   ├── index.html        # Interfaz principal
│   ├── script.js         # Lógica del frontend
│   ├── styles.css        # Diseño (Glassmorphism + responsive)
│   ├── login.html        # Acceso administrativo
│   └── privacy.html      # Política de privacidad
│
└── README.md
 
🗄️ Base de Datos
El sistema utiliza SQLite con un modelo relacional que incluye:
•	Usuarios
•	Roles
•	Preguntas
•	Opciones
•	Evaluaciones
•	Detalles

✔ Incluye:
•	Integridad referencial
•	Restricciones de inmutabilidad (ej. matrícula)
•	Banco inicial de 36 preguntas
 
🛠️ Tecnologías Utilizadas
Backend
•	Python 3.8+
•	Flask
•	Flask-CORS
Frontend
•	HTML5
•	CSS3 (Glassmorphism + responsive design)
•	JavaScript (ES6+)
Librerías externas (CDN)
•	Lucide Icons
•	jsPDF
•	AutoTable
 
⚙️ Instalación y Configuración
1. Instalar dependencias
pip install flask flask-cors
 
2. Preparar la base de datos
cd DATABASE
python database.py
 
3. Ejecutar el servidor
cd ../SRC
python app.py
 
4. Acceso a la aplicación
Abrir en el navegador:
https://iconsuite.click/ 
🔑 Acceso administrativo
•	Disponible desde login.html
•	Usa la clave definida en variables de entorno o la configurada en el código
 
📊 Flujo de Uso
1.	El usuario ingresa a la plataforma
2.	Selecciona su tipo de perfil
3.	Responde el cuestionario
4.	El sistema analiza los resultados
5.	Se genera un reporte con recomendaciones
6.	(Opcional) Descarga en PDF

 
🤝 Contribución
Si deseas contribuir:
1.	Haz un fork del repositorio
2.	Crea una nueva rama
3.	Realiza tus cambios
4.	Envía un pull request

 
📜 Política de Uso y Privacidad
El sistema está diseñado bajo el principio de minimización de datos:
•	Se solicita matrícula solo para identificación
•	La información se maneja localmente
•	Cumple con buenas prácticas de protección de datos
 
💡 Mejoras Futuras
•	Dashboard más avanzado con analítica predictiva
•	Integración con dispositivos de salud
•	Aplicación móvil
•	Sistema de notificaciones inteligentes
 
👨‍💻 Autores
Mayra Aguilar
Fernanda Herrera
Santiago Morales
Luis Cobos


<img width="426" height="691" alt="image" src="https://github.com/user-attachments/assets/edd9770d-105f-4d0f-afa6-edbf1d77555f" />
