// SECCIONES DEL CUESTIONARIO
const SECTIONS = ['Estrés', 'Sueño', 'Hábitos Saludables'];

const SECTION_ICONS = {
    'Estrés': 'brain',
    'Sueño': 'moon',
    'Hábitos Saludables': 'heart-pulse'
};

// BASES DE DATOS DE PREGUNTAS (agrupadas por sección, 6 preguntas por sección)
const database = {
    alumno: [
        // ─── ESTRÉS ───
        {
            id: 'a1', section: 'Estrés',
            question: '¿Con qué frecuencia te sientes estresado/a por tus responsabilidades académicas?',
            options: [
                { text: 'Siempre o casi siempre', score: 0 },
                { text: 'Frecuentemente', score: 3 },
                { text: 'A veces', score: 7 },
                { text: 'Rara vez o nunca', score: 10 }
            ]
        },
        {
            id: 'a2', section: 'Estrés',
            question: '¿Sientes ansiedad o preocupación excesiva por tus calificaciones?',
            options: [
                { text: 'Constantemente', score: 0 },
                { text: 'Con frecuencia', score: 3 },
                { text: 'Ocasionalmente', score: 7 },
                { text: 'Casi nunca', score: 10 }
            ]
        },
        {
            id: 'a3', section: 'Estrés',
            question: '¿Te sientes abrumado por la cantidad  de tareas?',
            options: [
                { text: 'Constantemente', score: 0 },
                { text: 'Frecuentemente', score: 4 },
                { text: 'Ocacionalmente', score: 7 },
                { text: 'Casi nunca', score: 10 }
            ]
        },
        {
            id: 'a4', section: 'Estrés',
            question: '¿Has experimentado síntomas físicos (dolores de cabeza, problemas estomacales) por la presión escolar?',
            options: [
                { text: 'Frecuentemente', score: 0 },
                { text: 'Varias veces al mes', score: 3 },
                { text: 'Rara vez', score: 7 },
                { text: 'Nunca', score: 10 }
            ]
        },
        {
            id: 'a5', section: 'Estrés',
            question: '¿Te resulta difícil concentrarte en tus estudios por estar pensando en otras preocupaciones?',
            options: [
                { text: 'Casi siempre', score: 0 },
                { text: 'Con regularidad', score: 3 },
                { text: 'Solo en épocas de exámenes', score: 7 },
                { text: 'Rara vez', score: 10 }
            ]
        },
        {
            id: 'a6', section: 'Estrés',
            question: '¿Sientes que la carga de trabajo de tus materias es abrumadora y difícil de manejar?',
            options: [
                { text: 'Totalmente abrumadora', score: 0 },
                { text: 'Difícil la mayor parte del tiempo', score: 3 },
                { text: 'Manejable con esfuerzo', score: 7 },
                { text: 'Fácil de manejar', score: 10 }
            ]
        },

        // ─── SUEÑO ───
        {
            id: 'a7', section: 'Sueño',
            question: 'En promedio, ¿cuántas horas de sueño real logras tener por noche?',
            options: [
                { text: 'Menos de 4 horas', score: 0 },
                { text: 'Entre 4 y 6 horas', score: 4 },
                { text: 'Entre 6 y 7 horas', score: 7 },
                { text: '7 horas o más', score: 10 }
            ]
        },
        {
            id: 'a8', section: 'Sueño',
            question: '¿Mantienes un horario regular para acostarte y levantarte?',
            options: [
                { text: 'Nunca, mis horarios son caóticos', score: 0 },
                { text: 'A veces', score: 4 },
                { text: 'Casi siempre', score: 7 },
                { text: 'Siempre, incluso fines de semana', score: 10 }
            ]
        },
        {
            id: 'a9', section: 'Sueño',
            question: '¿Con qué frecuencia te despiertas sintiéndote cansado/a o sin energía?',
            options: [
                { text: 'Todos los días', score: 0 },
                { text: 'La mayoría de los días', score: 3 },
                { text: 'Algunas veces', score: 7 },
                { text: 'Rara vez o nunca', score: 10 }
            ]
        },
        {
            id: 'a10', section: 'Sueño',
            question: '¿Te cuesta trabajo quedarte dormido/a cuando te acuestas por la noche?',
            options: [
                { text: 'Me toma más de 1 hora', score: 0 },
                { text: 'Tardo entre 30 y 60 min', score: 3 },
                { text: 'A veces me cuesta un poco', score: 7 },
                { text: 'Me duermo rápido (menos de 20 min)', score: 10 }
            ]
        },
        {
            id: 'a11', section: 'Sueño',
            question: '¿Te despiertas varias veces durante la noche y te cuesta volver a dormir?',
            options: [
                { text: 'Todas las noches', score: 0 },
                { text: 'Varias veces por semana', score: 3 },
                { text: 'Ocasionalmente', score: 7 },
                { text: 'Casi nunca me despierto', score: 10 }
            ]
        },
        {
            id: 'a12', section: 'Sueño',
            question: '¿Sueles usar el celular, estudiar o trabajar en la cama justo antes de intentar dormir?',
            options: [
                { text: 'Siempre, es mi rutina', score: 0 },
                { text: 'Frecuentemente', score: 3 },
                { text: 'Solo algunas veces', score: 7 },
                { text: 'Nunca, la cama es solo para dormir', score: 10 }
            ]
        },

        // ─── HÁBITOS SALUDABLES ───
        {
            id: 'a13', section: 'Hábitos Saludables',
            question: '¿Cómo describirías tu alimentación en general?',
            options: [
                { text: 'Mala (comida rápida, horarios irregulares)', score: 0 },
                { text: 'Regular, podría mejorar', score: 4 },
                { text: 'Buena (balanceada la mayor parte del tiempo)', score: 7 },
                { text: 'Muy buena (balanceada, horarios fijos)', score: 10 }
            ]
        },
        {
            id: 'a14', section: 'Hábitos Saludables',
            question: '¿Realizas alguna actividad física durante la semana?',
            options: [
                { text: 'No, soy sedentario/a', score: 0 },
                { text: '1-2 veces por semana', score: 4 },
                { text: '3-4 veces por semana', score: 7 },
                { text: '5 o más veces por semana', score: 10 }
            ]
        },
        {
            id: 'a15', section: 'Hábitos Saludables',
            question: '¿Consumes suficiente agua a lo largo del día (al menos 2 litros)?',
            options: [
                { text: 'Casi nunca tomo agua', score: 0 },
                { text: 'Tomo poco, menos de 1 litro', score: 3 },
                { text: 'Entre 1 y 2 litros', score: 7 },
                { text: 'Sí, 2 litros o más', score: 10 }
            ]
        },
        {
            id: 'a16', section: 'Hábitos Saludables',
            question: '¿Tomas un desayuno nutritivo regularmente a una hora adecuada?',
            options: [
                { text: 'Nunca desayuno', score: 0 },
                { text: 'Solo café o algo rápido de vez en cuando', score: 3 },
                { text: 'Desayuno la mayoría de los días', score: 7 },
                { text: 'Siempre tomo un buen desayuno', score: 10 }
            ]
        },
        {
            id: 'a17', section: 'Hábitos Saludables',
            question: '¿Con qué frecuencia consumes alimentos ultraprocesados o comida rápida?',
            options: [
                { text: 'Todos o casi todos los días', score: 0 },
                { text: '3-4 veces por semana', score: 3 },
                { text: '1-2 veces por semana', score: 7 },
                { text: 'Rara vez (menos de 2 veces al mes)', score: 10 }
            ]
        },
        {
            id: 'a18', section: 'Hábitos Saludables',
            question: '¿Sueles saltarte comidas debido a tus ocupaciones o falta de tiempo?',
            options: [
                { text: 'Frecuentemente me salto comidas', score: 0 },
                { text: 'A veces, especialmente el almuerzo', score: 3 },
                { text: 'Rara vez', score: 7 },
                { text: 'Nunca, respeto mis horarios de comida', score: 10 }
            ]
        }
    ],

    admin: [
        // ─── ESTRÉS ───
        {
            id: 'ad1', section: 'Estrés',
            question: '¿Sientes que tu trabajo interfiere negativamente con tu vida personal o familiar?',
            options: [
                { text: 'Constantemente', score: 0 },
                { text: 'A menudo', score: 3 },
                { text: 'Rara vez', score: 7 },
                { text: 'Nunca', score: 10 }
            ]
        },
        {
            id: 'ad2', section: 'Estrés',
            question: '¿Cómo describirías tu nivel de estrés laboral actual?',
            options: [
                { text: 'Muy alto (agotamiento)', score: 0 },
                { text: 'Alto, me abruma a veces', score: 3 },
                { text: 'Moderado', score: 6 },
                { text: 'Bajo / Manejable', score: 10 }
            ]
        },
        {
            id: 'ad3', section: 'Estrés',
            question: '¿Sientes apoyo por parte de tu equipo o supervisores en momentos de alta carga laboral?',
            options: [
                { text: 'No, me siento aislado/a', score: 0 },
                { text: 'Poco apoyo', score: 4 },
                { text: 'Apoyo moderado', score: 7 },
                { text: 'Mucho apoyo', score: 10 }
            ]
        },
        {
            id: 'ad4', section: 'Estrés',
            question: '¿Sientes que tus responsabilidades superan el tiempo que tienes disponible para cumplirlas?',
            options: [
                { text: 'Siempre, nunca termino', score: 0 },
                { text: 'Con frecuencia me falta tiempo', score: 3 },
                { text: 'A veces, en cierres de mes', score: 7 },
                { text: 'Casi nunca, mi tiempo alcanza', score: 10 }
            ]
        },
        {
            id: 'ad5', section: 'Estrés',
            question: '¿Llevas preocupaciones del trabajo a casa, afectando tu capacidad de relajarte?',
            options: [
                { text: 'Todos los días', score: 0 },
                { text: 'Con bastante frecuencia', score: 3 },
                { text: 'Ocasionalmente', score: 7 },
                { text: 'Logro desconectarme totalmente', score: 10 }
            ]
        },
        {
            id: 'ad6', section: 'Estrés',
            question: '¿Con qué frecuencia sientes frustración o enojo continuo por situaciones en tu entorno laboral?',
            options: [
                { text: 'A diario', score: 0 },
                { text: 'Varias veces por semana', score: 3 },
                { text: 'Rara vez', score: 7 },
                { text: 'Nunca o casi nunca', score: 10 }
            ]
        },

        // ─── SUEÑO ───
        {
            id: 'ad7', section: 'Sueño',
            question: '¿Duermes las horas necesarias para sentirte verdaderamente descansado/a al día siguiente?',
            options: [
                { text: 'No, casi nunca', score: 0 },
                { text: 'A veces', score: 4 },
                { text: 'La mayoría de las veces', score: 7 },
                { text: 'Sí, habitualmente', score: 10 }
            ]
        },

        {
            id: 'ad8', section: 'Sueño',
            question: '¿El estrés o la carga laboral afecta de forma directa la calidad de tu sueño?',
            options: [
                { text: 'Sí, me causa insomnio severo', score: 0 },
                { text: 'Frecuentemente me despierto pensando en trabajo', score: 3 },
                { text: 'A veces en temporadas pesadas', score: 7 },
                { text: 'No, mi sueño no se altera', score: 10 }
            ]
        },
        {
            id: 'ad9', section: 'Sueño',
            question: '¿Usas pantallas (celular, computadora, TV) justo antes de cerrar los ojos para dormir?',
            options: [
                { text: 'Siempre, es lo último que hago', score: 0 },
                { text: 'Casi siempre', score: 3 },
                { text: 'Algunas noches', score: 7 },
                { text: 'Nunca, las apago 30-60 min antes', score: 10 }
            ]
        },
        {
            id: 'ad10', section: 'Sueño',
            question: '¿Tienes problemas para conciliar el sueño al acostarte?',
            options: [
                { text: 'Me toma horas dormirme', score: 0 },
                { text: 'Frecuentemente doy vueltas', score: 3 },
                { text: 'A veces', score: 7 },
                { text: 'Me duermo con facilidad', score: 10 }
            ]
        },
        {
            id: 'ad11', section: 'Sueño',
            question: '¿Te despiertas mucho antes de que suene la alarma y ya no puedes volver a dormir?',
            options: [
                { text: 'Sí, con mucha frecuencia', score: 0 },
                { text: 'A menudo', score: 3 },
                { text: 'Rara vez', score: 7 },
                { text: 'Nunca ocurre', score: 10 }
            ]
        },
        {
            id: 'ad12', section: 'Sueño',
            question: '¿Sientes que necesitas estímulos extra (como mucha cafeína) para mantenerte alerta en el día?',
            options: [
                { text: 'Sí, no funciono sin altas dosis de cafeína', score: 0 },
                { text: 'A menudo tomo bebidas energéticas/café', score: 3 },
                { text: 'Solo ocasionalmente', score: 7 },
                { text: 'No, mi energía natural es suficiente', score: 10 }
            ]
        },

        // ─── HÁBITOS SALUDABLES ───
        {
            id: 'ad13', section: 'Hábitos Saludables',
            question: '¿Cuántas horas pasas sentado/a trabajando sin tomar un descanso físico?',
            options: [
                { text: 'Más de 4 horas continuas', score: 0 },
                { text: '3-4 horas', score: 3 },
                { text: '1-2 horas', score: 7 },
                { text: 'Menos de 1 hora (hago pausas breves)', score: 10 }
            ]
        },
        {
            id: 'ad14', section: 'Hábitos Saludables',
            question: '¿Realizas alguna actividad física o ejercicio de forma regular y estructurada?',
            options: [
                { text: 'No, soy totalmente sedentario/a', score: 0 },
                { text: 'De 1 a 2 veces por semana', score: 4 },
                { text: 'De 3 a 4 veces por semana', score: 7 },
                { text: '5 o más veces por semana', score: 10 }
            ]
        },
        {
            id: 'ad15', section: 'Hábitos Saludables',
            question: '¿Cómo describirías tu alimentación en los días laborables?',
            options: [
                { text: 'Mala (pico cosas, compro lo que haya rápido)', score: 0 },
                { text: 'Regular (trato de cuidarme pero fallo a menudo)', score: 4 },
                { text: 'Buena (la mayoría de las comidas son balanceadas)', score: 7 },
                { text: 'Muy buena (comidas completas, nutritivas y a sus horas)', score: 10 }
            ]
        },
        {
            id: 'ad16', section: 'Hábitos Saludables',
            question: '¿Sueles llevar o planificar opciones saludables para tus comidas/snacks durante el trabajo?',
            options: [
                { text: 'Nunca, compro lo que sea allí', score: 0 },
                { text: 'Rara vez me organizo', score: 3 },
                { text: 'A veces llevo mi comida o snacks saludables', score: 7 },
                { text: 'Siempre planifico mis comidas del día', score: 10 }
            ]
        },
        {
            id: 'ad17', section: 'Hábitos Saludables',
            question: '¿Con qué frecuencia tomas pausas activas (estiramientos, caminar) durante tus horas laborales?',
            options: [
                { text: 'Nunca, me quedo en mi lugar todo el día', score: 0 },
                { text: 'Rara vez', score: 3 },
                { text: 'Al menos una vez a la mitad del día', score: 7 },
                { text: 'Tomo pausas activas cada par de horas', score: 10 }
            ]
        },
        {
            id: 'ad18', section: 'Hábitos Saludables',
            question: '¿Mantienes una hidratación adecuada (al menos 2 litros de agua natural) mientras trabajas?',
            options: [
                { text: 'Casi no tomo agua, solo café o refresco', score: 0 },
                { text: 'Tomo muy poca agua', score: 3 },
                { text: 'Trato de tomar, al menos un litro', score: 7 },
                { text: 'Sí, mantengo mi botella de agua y bebo constantemente', score: 10 }
            ]
        }
    ]
};

// ESTADO DE LA APLICACIÓN
const state = {
    currentRole: null, // 'alumno' | 'admin'
    questions: [],
    currentQuestionIndex: 0,
    answers: [], // Array of objects { questionId, score, answerText, section }
    totalScore: 0,
    sectionScores: {}, // { 'Estrés': 0, 'Sueño': 0, 'Hábitos Saludables': 0 }
    studentData: null // { name, age, matricula, carrera }
};

// MÓDULO DE LA APLICACIÓN
const app = {
    mobileBreakpoint: 1024,

    // --- NAVEGACIÓN Y VISTAS ---

    showView: (viewId) => {
        document.querySelectorAll('.view').forEach(el => {
            el.classList.add('hidden');
            el.classList.remove('active');
        });
        const target = document.getElementById(viewId);
        if (!target) return;
        target.classList.remove('hidden');
        setTimeout(() => target.classList.add('active'), 10);
    },

    init: () => {
        app.mobileMenuOpen = false;
        if (document.getElementById('view-home')) {
            app.showView('view-home');
        }

        const mobileBtn = document.getElementById('mobile-menu-btn');
        if (mobileBtn && !app.navbarEventsBound) {
            mobileBtn.addEventListener('click', app.toggleMobileMenu);
            document.addEventListener('click', app.handleGlobalClick);
            document.addEventListener('keydown', app.handleGlobalKeydown);
            window.addEventListener('resize', app.handleViewportResize);
            app.navbarEventsBound = true;
        }

        app.closeMobileMenu();
        if (window.lucide) {
            lucide.createIcons();
        }
    },

    setMobileMenuState: (isOpen) => {
        const menu = document.getElementById('mobile-menu');
        const menuBtn = document.getElementById('mobile-menu-btn');
        app.mobileMenuOpen = Boolean(isOpen);

        if (!menu || !menuBtn) return;

        menu.classList.toggle('active', app.mobileMenuOpen);
        menuBtn.setAttribute('aria-expanded', String(app.mobileMenuOpen));
        menuBtn.setAttribute('aria-label', app.mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú');
        menuBtn.innerHTML = `<i data-lucide="${app.mobileMenuOpen ? 'x' : 'menu'}" aria-hidden="true"></i>`;

        if (window.lucide) {
            lucide.createIcons();
        }
    },

    toggleMobileMenu: () => {
        if (!app.isMobileViewport()) return;
        app.setMobileMenuState(!app.mobileMenuOpen);
    },

    closeMobileMenu: () => {
        app.setMobileMenuState(false);
    },

    handleGlobalClick: (event) => {
        if (!app.mobileMenuOpen) return;
        const navbar = document.querySelector('.navbar');
        if (navbar && !navbar.contains(event.target)) {
            app.closeMobileMenu();
        }
    },

    handleGlobalKeydown: (event) => {
        if (event.key === 'Escape') {
            app.closeMobileMenu();
        }
    },

    handleViewportResize: () => {
        if (!app.isMobileViewport() && app.mobileMenuOpen) {
            app.closeMobileMenu();
        }
    },

    isMobileViewport: () => {
        return window.matchMedia(`(max-width: ${app.mobileBreakpoint}px)`).matches;
    },

    showHome: () => {
        app.closeMobileMenu();
        app.resetState();
        app.showView('view-home');
    },

    startQuestionnaire: (role) => {
        app.closeMobileMenu();
        state.currentRole = role;
        state.questions = database[role];
        state.currentQuestionIndex = 0;
        state.answers = [];
        state.totalScore = 0;
        state.studentData = null;

        // Configure form dynamically based on role
        const isAlumno = role === 'alumno';
        document.getElementById('form-title').textContent = isAlumno ? 'Datos del Alumno' : 'Datos del Administrativo';
        document.getElementById('form-icon-wrap').innerHTML = `<i data-lucide="${isAlumno ? 'graduation-cap' : 'briefcase'}"></i>`;
        document.getElementById('label-last-field').textContent = isAlumno ? 'Carrera' : 'Puesto';
        document.getElementById('student-carrera').placeholder = isAlumno ? 'Ej. Ingeniería en Sistemas' : 'Ej. Coordinador Académico';

        app.showView('view-student-form');
        if (typeof lucide !== 'undefined') lucide.createIcons();
    },

    submitStudentForm: () => {
        const name = document.getElementById('student-name').value.trim();
        const age = document.getElementById('student-age').value.trim();
        const matricula = document.getElementById('student-matricula').value.trim();
        const lastField = document.getElementById('student-carrera').value.trim();
        const errorEl = document.getElementById('student-form-error');

        if (!name || !age || !matricula || !lastField) {
            errorEl.classList.remove('hidden');
            return;
        }

        errorEl.classList.add('hidden');

        // Store with the correct key based on role
        if (state.currentRole === 'alumno') {
            state.studentData = { name, age, matricula, carrera: lastField };
        } else {
            state.studentData = { name, age, matricula, puesto: lastField };
        }

        app.renderQuestion();
        app.showView('view-questionnaire');
    },

    toggleDashboard: () => {
        app.closeMobileMenu();
        app.showView('view-login');
        document.getElementById('admin-password').value = '';
        document.getElementById('login-error').classList.add('hidden');
    },

    checkLoginEnter: (e) => {
        if (e.key === 'Enter') app.login();
    },

    login: () => {
        const pass = document.getElementById('admin-password').value;
        // Contraseña de admin
        if (pass === 'mayraperrilla') {
            app.renderDashboard();
            app.showView('view-dashboard');
        } else {
            document.getElementById('login-error').classList.remove('hidden');
        }
    },

    // --- LÓGICA DEL CUESTIONARIO ---

    getCurrentSection: () => {
        return state.questions[state.currentQuestionIndex]?.section || SECTIONS[0];
    },

    getSectionQuestions: (section) => {
        return state.questions.filter(q => q.section === section);
    },

    renderQuestion: () => {
        const question = state.questions[state.currentQuestionIndex];
        const total = state.questions.length;
        const current = state.currentQuestionIndex + 1;
        const currentSection = question.section;
        const currentSectionIdx = SECTIONS.indexOf(currentSection);

        // --- Section stepper ---
        const stepsContainer = document.getElementById('section-steps');
        stepsContainer.innerHTML = SECTIONS.map((sec, idx) => {
            let status = 'upcoming';
            if (idx < currentSectionIdx) status = 'completed';
            else if (idx === currentSectionIdx) status = 'active';
            return `
                <div class="section-step ${status}">
                    <div class="step-circle">
                        ${status === 'completed'
                    ? '<i data-lucide="check"></i>'
                    : `<i data-lucide="${SECTION_ICONS[sec]}"></i>`}
                    </div>
                    <span class="step-label">${sec}</span>
                </div>
            `;
        }).join('<div class="step-connector"></div>');

        // --- Progress within section ---
        const sectionQs = app.getSectionQuestions(currentSection);
        const idxInSection = sectionQs.indexOf(question);
        const sectionProgress = ((idxInSection) / sectionQs.length) * 100;

        document.getElementById('progress-bar').style.width = `${((current - 1) / total) * 100}%`;
        document.getElementById('question-count').textContent = `Pregunta ${current} de ${total}`;

        // --- Section badge + question ---
        const container = document.getElementById('question-container');
        container.innerHTML = `
            <div class="section-badge">
                <i data-lucide="${SECTION_ICONS[currentSection]}"></i>
                <span>${currentSection}</span>
                <small>${idxInSection + 1} de ${sectionQs.length}</small>
            </div>
            <h3 class="question-title">${question.question}</h3>
            <div class="options-list">
                ${question.options.map((opt, idx) => `
                    <div class="option-item" onclick="app.selectOption(${idx}, this)">
                        ${opt.text}
                    </div>
                `).join('')}
            </div>
        `;

        // Re-render Lucide icons
        if (typeof lucide !== 'undefined') lucide.createIcons();

        // Deshabilitar botón siguiente
        document.getElementById('btn-next').disabled = true;
        document.getElementById('btn-next').style.opacity = '0.5';
    },

    selectOption: (optionIndex, element) => {
        document.querySelectorAll('.option-item').forEach(el => el.classList.remove('selected'));
        element.classList.add('selected');

        const question = state.questions[state.currentQuestionIndex];
        const selectedOption = question.options[optionIndex];

        state.currentTempAnswer = {
            questionId: question.id,
            section: question.section,
            questionText: question.question,
            answerText: selectedOption.text,
            score: selectedOption.score
        };

        const btn = document.getElementById('btn-next');
        btn.disabled = false;
        btn.style.opacity = '1';
    },

    nextQuestion: () => {
        if (!state.currentTempAnswer) return;

        // Guardar respuesta definitiva
        state.answers.push(state.currentTempAnswer);
        state.totalScore += state.currentTempAnswer.score;

        // Track per-section score
        const sec = state.currentTempAnswer.section;
        if (!state.sectionScores[sec]) state.sectionScores[sec] = 0;
        state.sectionScores[sec] += state.currentTempAnswer.score;

        state.currentTempAnswer = null;

        // Avanzar o terminar
        if (state.currentQuestionIndex < state.questions.length - 1) {
            state.currentQuestionIndex++;
            app.renderQuestion();
        } else {
            app.finishQuestionnaire();
        }
    },

    finishQuestionnaire: () => {
        app.saveToRegistry();
        app.renderResults();
        app.showView('view-results');
    },

    resetState: () => {
        state.currentRole = null;
        state.questions = [];
        state.answers = [];
        state.totalScore = 0;
        state.sectionScores = {};
        state.currentQuestionIndex = 0;
        state.studentData = null;

        // Clear student form fields
        const nameEl = document.getElementById('student-name');
        const ageEl = document.getElementById('student-age');
        const matriculaEl = document.getElementById('student-matricula');
        const carreraEl = document.getElementById('student-carrera');
        const errorEl = document.getElementById('student-form-error');
        if (nameEl) nameEl.value = '';
        if (ageEl) ageEl.value = '';
        if (matriculaEl) matriculaEl.value = '';
        if (carreraEl) carreraEl.value = '';
        if (errorEl) errorEl.classList.add('hidden');
    },

    // --- RESULTADOS Y RECOMENDACIONES ---

    renderResults: () => {
        const maxScore = state.questions.length * 10;
        const percentage = (state.totalScore / maxScore) * 100;

        // Animar círculo
        const circle = document.querySelector('.progress-ring__circle');
        const radius = circle.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        const offset = circumference - (percentage / 100) * circumference;

        circle.style.strokeDashoffset = circumference; // Reset
        setTimeout(() => {
            circle.style.strokeDashoffset = offset;
        }, 100);

        // Texto puntaje
        document.getElementById('final-score').textContent = state.totalScore;

        // Overall risk
        const overallRisk = app.getOverallRiskLevel(percentage);
        circle.style.stroke = overallRisk.color;
        state.currentRiskLevel = overallRisk.level;

        document.getElementById('result-summary').textContent = overallRisk.summary;

        // --- PER-SECTION RESULTS ---
        const recContainer = document.getElementById('recommendations-container');
        recContainer.innerHTML = SECTIONS.map(section => {
            const sectionScore = state.sectionScores[section] || 0;
            const sectionQs = state.questions.filter(q => q.section === section);
            const sectionMax = sectionQs.length * 10;
            const sectionPct = sectionMax > 0 ? (sectionScore / sectionMax) * 100 : 0;
            const { level, color, recs } = app.getSectionRecommendation(section, sectionScore, sectionMax);

            return `
                <div class="section-result-card">
                    <div class="section-result-header">
                        <div class="section-result-icon" style="background: ${color}20; color: ${color}">
                            <i data-lucide="${SECTION_ICONS[section]}"></i>
                        </div>
                        <div class="section-result-info">
                            <h3>${section}</h3>
                            <span class="section-score" style="color: ${color}">${sectionScore}/${sectionMax} pts</span>
                        </div>
                        <span class="section-risk-pill" style="background: ${color}18; color: ${color}; border: 1px solid ${color}30">${level}</span>
                    </div>
                    <div class="section-bar-track">
                        <div class="section-bar-fill" style="width: ${sectionPct}%; background: ${color}"></div>
                    </div>
                    <div class="section-recs">
                        ${recs.map(r => `
                            <div class="section-rec-item">
                                <strong>${r.title}:</strong> ${r.text}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }).join('');

        // Re-render icons
        if (typeof lucide !== 'undefined') lucide.createIcons();

        // --- POPULATE FORM FIELDS ---
        document.getElementById('form-role').value = state.currentRole;
        document.getElementById('form-score').value = state.totalScore;
        document.getElementById('form-risk').value = overallRisk.level;
    },

    // --- PERSISTENCIA (LOCAL STORAGE) ---

    saveToRegistry: () => {
        const registry = JSON.parse(localStorage.getItem('saludCampusRegistry') || '[]');
        const entry = {
            id: Date.now(),
            date: new Date().toLocaleDateString(),
            role: state.currentRole,
            score: state.totalScore,
            riskLevel: app.calculateRiskLevel(state.totalScore, state.questions.length * 10),
            sectionScores: { ...state.sectionScores },
            answers: state.answers,
            studentData: state.studentData || null
        };
        registry.push(entry);
        localStorage.setItem('saludCampusRegistry', JSON.stringify(registry));
    },

    calculateRiskLevel: (score, max) => {
        const pct = (score / max) * 100;
        if (pct >= 80) return "Bajo";
        if (pct >= 50) return "Moderado";
        return "Alto";
    },

    clearData: () => {
        if (confirm("¿Estás seguro de que deseas borrar todos los registros? Esta acción no se puede deshacer.")) {
            localStorage.removeItem('saludCampusRegistry');
            app.renderDashboard(); // Refresh
        }
    },

    // --- DASHBOARD ---

    renderDashboard: () => {
        const registry = JSON.parse(localStorage.getItem('saludCampusRegistry') || '[]');

        // --- CALCULAR ESTADÍSTICAS ---
        const total = registry.length;
        const avgScore = total > 0 ? (registry.reduce((sum, item) => sum + item.score, 0) / total).toFixed(1) : 0;

        const riskCounts = { Bajo: 0, Moderado: 0, Alto: 0 };
        registry.forEach(item => {
            if (riskCounts[item.riskLevel] !== undefined) riskCounts[item.riskLevel]++;
        });

        // --- RENDERIZAR CARDS ---
        document.getElementById('stat-total').textContent = total;
        document.getElementById('stat-avg').textContent = avgScore;

        const highRiskPct = total > 0 ? Math.round((riskCounts.Alto / total) * 100) : 0;
        document.getElementById('stat-high-risk').textContent = `${highRiskPct}%`;

        // --- RENDERIZAR CHARTS (Barras) ---
        const getPct = (count) => total > 0 ? (count / total) * 100 : 0;

        document.getElementById('bar-low').style.width = `${getPct(riskCounts.Bajo)}%`;
        document.getElementById('count-low').textContent = riskCounts.Bajo;

        document.getElementById('bar-medium').style.width = `${getPct(riskCounts.Moderado)}%`;
        document.getElementById('count-medium').textContent = riskCounts.Moderado;

        document.getElementById('bar-high').style.width = `${getPct(riskCounts.Alto)}%`;
        document.getElementById('count-high').textContent = riskCounts.Alto;

        // --- RENDERIZAR TABLA ---
        const tbody = document.getElementById('stats-body');

        if (registry.length === 0) {
            tbody.innerHTML = `<tr><td colspan="4" class="empty-state-cell">No hay registros aún.</td></tr>`;
            return;
        }

        tbody.innerHTML = registry.slice().reverse().map(item => `
            <tr>
                <td>${item.date}</td>
                <td class="role-cell">${item.role}</td>
                <td>${item.score}</td>
                <td><span class="risk-pill ${item.riskLevel === 'Bajo' ? 'risk-low' : item.riskLevel === 'Moderado' ? 'risk-medium' : 'risk-high'}">
                    ${item.riskLevel}
                </span></td>
            </tr>
        `).join('');
    },

    // --- ACTIONS ---

    sendUserEmail: () => {
        const email = document.getElementById('user-email').value;
        if (!email || !email.includes('@')) {
            alert("Por favor, ingresa un correo electrónico válido.");
            return;
        }

        // Simulation
        const btn = document.querySelector('.email-section .primary-btn');
        const originalText = btn.innerHTML;

        btn.disabled = true;
        btn.innerHTML = `<i data-lucide="check"></i> Enviando...`;

        setTimeout(() => {
            alert(`Resultados enviados a ${email} (Simulado).\n\nEn un entorno real, esto enviaría el PDF a tu correo.`);
            btn.innerHTML = `<i data-lucide="check-circle"></i> ¡Enviado!`;
            setTimeout(() => {
                btn.disabled = false;
                btn.innerHTML = originalText;
                document.getElementById('user-email').value = '';
            }, 3000);
        }, 1500);
    },

    downloadAdminPDF: () => {
        const registry = JSON.parse(localStorage.getItem('saludCampusRegistry') || '[]');
        if (registry.length === 0) {
            alert("No hay datos para generar el reporte.");
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Configuración
        doc.setFont("helvetica");

        // Header
        doc.setFillColor(43, 77, 144); // Primary Brand Color
        doc.rect(0, 0, 210, 40, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22);
        doc.text("Reporte Global de Salud Campus", 20, 25);

        // Info
        doc.setTextColor(50, 50, 50);
        doc.setFontSize(12);
        doc.text(`Fecha de Corte: ${new Date().toLocaleDateString()}`, 20, 50);
        doc.text(`Total de Evaluaciones: ${registry.length}`, 20, 58);

        // Stats Table
        const tableData = registry.map(item => [
            item.date,
            item.role.charAt(0).toUpperCase() + item.role.slice(1),
            item.score,
            item.riskLevel
        ]);

        doc.autoTable({
            startY: 70,
            head: [['Fecha', 'Rol', 'Puntaje', 'Riesgo']],
            body: tableData,
            theme: 'grid',
            headStyles: { fillColor: [43, 77, 144] },
            alternateRowStyles: { fillColor: [244, 244, 244] }
        });

        // Footer
        const pageHeight = doc.internal.pageSize.height;
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text("Salud Campus - Reporte Administrativo Confidencial", 20, pageHeight - 10);

        doc.save(`salud-campus-reporte-global-${Date.now()}.pdf`);
    },

    getOverallRiskLevel: (percentage) => {
        if (percentage >= 75) return { level: 'Bajo', color: '#059669', summary: '¡Excelente! Tus hábitos de bienestar son muy buenos. Sigue así y comparte tu ejemplo.' };
        if (percentage >= 50) return { level: 'Moderado', color: '#d97706', summary: 'Estás en un punto medio. Hay áreas que puedes mejorar para sentirte mejor.' };
        if (percentage >= 30) return { level: 'Medio Alto', color: '#d94c06', summary: 'Varias áreas necesitan atención. Te recomendamos tomar acción pronto.' };
        return { level: 'Alto', color: '#dc2626', summary: 'Tus niveles de riesgo son altos. Es importante que busques apoyo y hagas cambios.' };
    },

    getSectionRecommendation: (section, score, maxScore) => {
        const pct = maxScore > 0 ? (score / maxScore) * 100 : 0;
        let level, color, recs;

        if (pct >= 75) {
            level = 'Bien'; color = '#059669';
        } else if (pct >= 50) {
            level = 'Regular'; color = '#d97706';
        } else {
            level = 'Atención'; color = '#dc2626';
        }

        // Section-specific recommendations
        const recsMap = {
            'Estrés': {
                good: [{ title: 'Mantén el equilibrio', text: 'Sigue gestionando bien tu tiempo y prioridades.' },
                { title: 'Refuerza hábitos saludables', text: 'Continúa realizando actividades que te relajen como caminar o escuchar música.' },
                { title: 'Tiempo personal', text: 'Dedica tiempo a actividades que disfrutes y te ayuden a desconectarte.' },
                ],
                regular: [{ title: 'Gestión del tiempo', text: 'Organiza tus tareas por prioridad y toma descansos breves.' },
                { title: 'Respiración consciente', text: 'Practica ejercicios de respiración para reducir la tensión.' },
                { title: 'Apoyo social', text: 'Habla con amigos o familiares sobre cómo te sientes.' }
                ],
                bad: [{ title: 'Busca apoyo', text: 'Habla con un profesional o acude a los servicios de bienestar.' },
                { title: 'Atención profesional', text: 'Considera acudir con un terapeuta especializado en manejo del estrés.' },
                { title: 'Consulta médica', text: 'Si presentas síntomas físicos, acude con un médico general.' }
                ]
            },
            'Sueño': {
                good: [{ title: 'Rutina estable', text: 'Mantienes horarios de sueño adecuados, continúa así.' },
                { title: 'Descanso de calidad', text: 'Tu descanso es reparador, sigue cuidando tu ambiente de sueño.' }
                ],
                regular: [{ title: 'Reduce pantallas', text: 'Evita usar el celular o computadora antes de dormir.' },
                { title: 'Relajación nocturna', text: 'Prueba leer o escuchar música tranquila antes de dormir.' },
                { title: 'Evita siestas largas', text: 'Limita las siestas durante el día para mejorar tu descanso nocturno.' }
                ],
                bad: [{ title: 'Prioriza el sueño', text: 'Dormir bien es fundamental. Establece un horario fijo y crea un ambiente tranquilo para descansar.' },
                { title: 'Consulta especialista', text: 'Considera acudir con un médico o especialista en sueño.' },
                { title: 'Apoyo profesional', text: 'Un psicólogo puede ayudarte si el insomnio está relacionado con estrés o ansiedad.' }
                ]

            },
            'Hábitos Saludables': {
                good: [{ title: 'Excelente estilo de vida', text: 'Mantienes hábitos saludables, sigue así.' },
                { title: 'Constancia', text: 'Tu disciplina en alimentación y ejercicio es muy positiva.' }
                ],
                regular: [{ title: 'Pequeños cambios', text: 'Incrementa poco a poco tu actividad física diaria.' },
                { title: 'Mejora tu alimentación', text: 'Incluye más frutas y verduras en tus comidas.' },
                { title: 'Hidratación', text: 'Aumenta tu consumo de agua durante el día.' }
                ],
                bad: [{ title: 'Empieza gradualmente', text: 'Realiza caminatas cortas y mejora tu alimentación poco a poco.' },
                { title: 'Asesoría profesional', text: 'Consulta a un nutriólogo para mejorar tu alimentación.' },
                { title: 'Atención médica', text: 'Un médico puede orientarte sobre cambios necesarios en tu estilo de vida.' }
                ]
            }
        };

        const key = pct >= 75 ? 'good' : pct >= 50 ? 'regular' : 'bad';
        recs = recsMap[section]?.[key] || [{ title: 'Consulta', text: 'Habla con un profesional de salud.' }];

        return { level, color, recs };
    },

    downloadUserPDF: () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        const maxScore = state.questions.length * 10;
        const percentage = (state.totalScore / maxScore) * 100;
        const overallRisk = app.getOverallRiskLevel(percentage);

        // -- ESTILOS --
        const primaryColor = [43, 77, 144]; // #2b4d90

        // -- HEADER --
        doc.setFillColor(...primaryColor);
        doc.rect(0, 0, 210, 40, 'F');

        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.setTextColor(255, 255, 255);
        doc.text("Reporte Personal de Bienestar", 105, 25, { align: "center" });

        // -- INFO PERSONAL --
        doc.setTextColor(50, 50, 50);
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");

        let yPos = 55;
        doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 20, yPos);
        doc.text(`Perfil: ${state.currentRole === 'alumno' ? 'Alumno' : 'Administrativo/Docente'}`, 120, yPos);

        yPos += 10;
        doc.setDrawColor(200, 200, 200);
        doc.line(20, yPos, 190, yPos);

        // -- PUNTAJE GENERAL --
        yPos += 15;
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("Resultado General", 20, yPos);

        yPos += 12;
        doc.setFontSize(26);
        doc.setTextColor(overallRisk.color);
        doc.text(`${state.totalScore} / ${maxScore}`, 20, yPos);

        doc.setFontSize(14);
        doc.setTextColor(80, 80, 80);
        doc.text(`Nivel de Riesgo: ${overallRisk.level}`, 75, yPos - 2);

        // -- RESUMEN --
        yPos += 12;
        doc.setFontSize(11);
        doc.setFont("helvetica", "italic");
        doc.setTextColor(60, 60, 60);
        const splitSummary = doc.splitTextToSize(overallRisk.summary, 170);
        doc.text(splitSummary, 20, yPos);

        yPos += 12 * splitSummary.length + 5;
        doc.setDrawColor(200, 200, 200);
        doc.line(20, yPos, 190, yPos);
        yPos += 12;

        // -- RESULTADOS POR SECCIÓN --
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(43, 77, 144);
        doc.text("Resultados y Recomendaciones por Sección:", 20, yPos);
        yPos += 10;

        SECTIONS.forEach(section => {
            const sectionScore = state.sectionScores[section] || 0;
            const sectionQs = state.questions.filter(q => q.section === section);
            const sectionMax = sectionQs.length * 10;
            const { level, color, recs } = app.getSectionRecommendation(section, sectionScore, sectionMax);

            // Título de la sección
            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.setTextColor(color);
            doc.text(`${section} - ${sectionScore}/${sectionMax} pts (${level})`, 20, yPos);
            yPos += 7;

            // Recomendaciones de la sección
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.setTextColor(50, 50, 50);

            recs.forEach(rec => {
                doc.setFillColor(color);
                doc.circle(23, yPos - 1, 1, 'F');
                doc.setFont("helvetica", "bold");
                doc.text(`${rec.title}:`, 27, yPos);

                const titleWidth = doc.getTextWidth(`${rec.title}: `);
                doc.setFont("helvetica", "normal");
                const splitText = doc.splitTextToSize(rec.text, 140);
                doc.text(splitText, 27 + titleWidth, yPos);

                yPos += 5 * splitText.length + 2;
            });

            yPos += 5; // Espacio extra entre secciones

            // Si nos acercamos al final de la página, añadir nueva página
            if (yPos > 260) {
                doc.addPage();
                yPos = 20;
            }
        });

        // -- FOOTER --
        const pageHeight = doc.internal.pageSize.height;
        doc.setFontSize(9);
        doc.setTextColor(150);
        doc.text("Salud Campus - Evaluación de Bienestar Integral", 105, pageHeight - 10, { align: "center" });

        doc.save(`mi-reporte-bienestar-${Date.now()}.pdf`);
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', app.init);
} else {
    app.init();
}