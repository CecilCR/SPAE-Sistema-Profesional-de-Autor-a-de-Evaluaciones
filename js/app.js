/*==========================================================
 SPAE
 Sistema Profesional de Autoría de Evaluaciones

 app.js
 Versión 1.0
==========================================================*/

const SPAE = (() => {

"use strict";

/*==========================================================
 CONFIGURACIÓN
==========================================================*/

const CONFIG = {

    appName: "SPAE",

    version: "1.0.0",

    autoSave: true,

    autoSaveInterval: 30000

};

/*==========================================================
 ESTADO GLOBAL
==========================================================*/

const state = {

    initialized: false,

    currentCourse: null,

    currentExam: null,

    currentQuestion: null,

    currentView: "dashboard",

    autoSaveTimer: null

};

/*==========================================================
 INICIALIZACIÓN GENERAL
==========================================================*/

async function init() {

    console.log(

        `${CONFIG.appName} ${CONFIG.version}`

    );

    initializeModules();

    registerEvents();

    loadApplication();

    startAutoSave();

    state.initialized = true;

}

/*==========================================================
 INICIALIZAR MÓDULOS
==========================================================*/

function initializeModules() {

    if (window.SPAEStorage)

        SPAEStorage.init();

    if (window.SPAECourses)

        SPAECourses.init();

    if (window.SPAEQuestionBank)

        SPAEQuestionBank.init();

    if (window.SPAEExamBuilder)

        SPAEExamBuilder.init();

    if (window.SPAEQualityEngine)

        SPAEQualityEngine.init();

    if (window.SPAEBloomEngine)

        SPAEBloomEngine.init();

    if (window.SPAEDistractorEngine)

        SPAEDistractorEngine.init();

    if (window.SPAECaseGenerator)

        SPAECaseGenerator.init();

    if (window.SPAEAdvisorEngine)

        SPAEAdvisorEngine.init();

    if (window.SPAERouter)

        SPAERouter.init();

    if (window.SPAEUI)

        SPAEUI.init();

}

/*==========================================================
 CARGAR APLICACIÓN
==========================================================*/

function loadApplication() {

    loadRecentCourses();

    updateDashboard();

}

/*==========================================================
 CURSOS RECIENTES
==========================================================*/

function loadRecentCourses() {

    if (!window.SPAECourses)

        return;

    const list =

        SPAECourses.getCourses();

    SPAEUI.renderRecentCourses(

        list

    );

}

/*==========================================================
 DASHBOARD
==========================================================*/

function updateDashboard() {

    if (!window.SPAEUI)

        return;

    SPAEUI.updateDashboard({

        currentCourse:

            state.currentCourse,

        version:

            CONFIG.version

    });

}
/*==========================================================
 REGISTRO DE EVENTOS
==========================================================*/

function registerEvents() {

    bindButton(

        "btnCreateCourse",

        createCourse

    );

    bindButton(

        "btnOpenCourse",

        openCourse

    );

    bindButton(

        "btnImportWord",

        importWord

    );

    bindButton(

        "btnQuestionBank",

        openQuestionBank

    );

    bindButton(

        "btnBuildExam",

        buildExam

    );

    window.addEventListener(

        "beforeunload",

        beforeExit

    );

}

/*==========================================================
 UTILIDADES
==========================================================*/

function bindButton(id, callback) {

    const button =

        document.getElementById(id);

    if (!button) {

        console.warn(

            `No existe el botón ${id}`

        );

        return;

    }

    button.addEventListener(

        "click",

        callback

    );

}

/*==========================================================
 CREAR CURSO
==========================================================*/

function createCourse() {

    if (

        window.SPAEDialogs

    ) {

        SPAEDialogs.openCourseDialog({

            mode: "create",

            onSave: saveCourse

        });

        return;

    }

    // Modo temporal hasta completar dialogs.js

    const name = prompt(

        "Nombre del curso"

    );

    if (

        !name ||

        !name.trim()

    ) {

        return;

    }

    const program = prompt(

        "Programa",

        ""

    ) || "";

    const semester = prompt(

        "Semestre",

        ""

    ) || "";

    saveCourse({

        id: crypto.randomUUID(),

        name: name.trim(),

        program,

        semester,

        createdAt:

            new Date().toISOString(),

        updatedAt:

            new Date().toISOString()

    });

}

/*==========================================================
 GUARDAR CURSO
==========================================================*/

function saveCourse(course) {

    if (

        !window.SPAECourses

    ) {

        console.error(

            "SPAECourses no está disponible."

        );

        return;

    }

    SPAECourses.addCourse(

        course

    );

    state.currentCourse =

        course;

    if (

        window.SPAENotifications

    ) {

        SPAENotifications.success(

            "Curso creado correctamente."

        );

    }

    refreshCourses();

}

/*==========================================================
 ACTUALIZAR LISTA
==========================================================*/

function refreshCourses() {

    if (

        !window.SPAECourses ||

        !window.SPAEUI

    ) {

        return;

    }

    const list =

        SPAECourses.getCourses();

    SPAEUI.renderRecentCourses(

        list

    );

    updateDashboard();

}

/*==========================================================
 ABRIR CURSO
==========================================================*/

function openCourse() {

    const courses =

        SPAECourses.getCourses();

    if (

        courses.length === 0

    ) {

        notify(

            "No existen cursos registrados."

        );

        return;

    }

    if (

        window.SPAEDialogs

    ) {

        SPAEDialogs.openCourseSelector(

            courses,

            loadCourse

        );

        return;

    }

    loadCourse(

        courses[0]

    );

}

/*==========================================================
 CARGAR CURSO
==========================================================*/

function loadCourse(course) {

    state.currentCourse =

        course;

    if (

        window.SPAERouter

    ) {

        SPAERouter.navigate(

            "course"

        );

    }

    updateDashboard();

    notify(

        `Curso activo: ${course.name}`

    );

} 
/*==========================================================
 IMPORTAR DOCUMENTOS
==========================================================*/

function importWord() {

    const input = document.createElement("input");

    input.type = "file";

    input.accept = ".doc,.docx,.txt,.pdf";

    input.addEventListener(

        "change",

        event => {

            const file =

                event.target.files[0];

            if (!file) {

                return;

            }

            notify(

                `Archivo seleccionado: ${file.name}`

            );

            // Integración futura:
            // SPAEImportEngine.import(file);

        }

    );

    input.click();

}

/*==========================================================
 BANCO DE PREGUNTAS
==========================================================*/

function openQuestionBank() {

    if (!state.currentCourse) {

        notify(

            "Primero debe abrir un curso."

        );

        return;

    }

    if (

        window.SPAERouter

    ) {

        SPAERouter.navigate(

            "question-bank"

        );

    }

}

/*==========================================================
 CONSTRUCTOR DE EXÁMENES
==========================================================*/

function buildExam() {

    if (!state.currentCourse) {

        notify(

            "Seleccione un curso antes de crear un examen."

        );

        return;

    }

    if (

        window.SPAERouter

    ) {

        SPAERouter.navigate(

            "exam-builder"

        );

    }

}

/*==========================================================
 AUTOGUARDADO
==========================================================*/

function startAutoSave() {

    if (

        !CONFIG.autoSave

    ) {

        return;

    }

    stopAutoSave();

    state.autoSaveTimer =

        setInterval(

            autoSave,

            CONFIG.autoSaveInterval

        );

}

function stopAutoSave() {

    if (

        state.autoSaveTimer

    ) {

        clearInterval(

            state.autoSaveTimer

        );

        state.autoSaveTimer = null;

    }

}

function autoSave() {

    if (

        !window.SPAEStorage

    ) {

        return;

    }

    try {

        SPAEStorage.save(

            "spae-session",

            {

                currentCourse:

                    state.currentCourse,

                currentExam:

                    state.currentExam,

                currentQuestion:

                    state.currentQuestion,

                currentView:

                    state.currentView,

                savedAt:

                    new Date().toISOString()

            }

        );

    }

    catch (error) {

        console.error(

            error

        );

    }

}

/*==========================================================
 RECUPERAR SESIÓN
==========================================================*/

function restoreSession() {

    if (

        !window.SPAEStorage

    ) {

        return;

    }

    const session =

        SPAEStorage.load(

            "spae-session"

        );

    if (!session) {

        return;

    }

    state.currentCourse =

        session.currentCourse || null;

    state.currentExam =

        session.currentExam || null;

    state.currentQuestion =

        session.currentQuestion || null;

    state.currentView =

        session.currentView || "dashboard";

}

/*==========================================================
 CIERRE SEGURO
==========================================================*/

function beforeExit() {

    autoSave();

}

/*==========================================================
 NOTIFICACIONES
==========================================================*/

function notify(message) {

    if (

        window.SPAENotifications

    ) {

        SPAENotifications.info(

            message

        );

    }

    else {

        console.log(message);

    }

}

/*==========================================================
 API PÚBLICA
==========================================================*/

return {

    init,

    createCourse,

    saveCourse,

    openCourse,

    loadCourse,

    importWord,

    openQuestionBank,

    buildExam,

    refreshCourses,

    updateDashboard,

    autoSave,

    restoreSession,

    currentCourse() {

        return structuredClone(

            state.currentCourse

        );

    },

    currentExam() {

        return structuredClone(

            state.currentExam

        );

    },

    currentQuestion() {

        return structuredClone(

            state.currentQuestion

        );

    }

};

})();

/*==========================================================
 ARRANQUE DE LA APLICACIÓN
==========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        SPAE.init();

        SPAE.restoreSession();

    }

);  
