/*********************************************************
 SPAE
 Sistema Profesional de Autoría de Evaluaciones

 Archivo : js/app.js
 Versión : 1.0

 Núcleo principal del sistema.

*********************************************************/


const SPAE = {


    //--------------------------------------------------
    // CONFIGURACIÓN GENERAL
    //--------------------------------------------------

    VERSION: "1.0.0",

    NAME: "SPAE",

    COURSE_LOADED: null,

    MODULES: {

        ui: false,
        dashboard: false,
        notifications: false,
        dialogs: false,
        courses: false,
        questionBank: false,
        examBuilder: false

    },


    //--------------------------------------------------
    // INICIALIZACIÓN DEL SISTEMA
    //--------------------------------------------------

    init() {

        console.group(
            "SPAE - Inicialización"
        );

        this.showWelcome();

        this.initializeModules();

        this.bindGlobalEvents();

        this.checkSystemStatus();

        this.loadDashboard();

        console.groupEnd();

    },


    //--------------------------------------------------
    // MENSAJE DE INICIO
    //--------------------------------------------------

    showWelcome() {

        console.log(
            "Sistema SPAE iniciado."
        );

        console.log(
            "Versión:",
            this.VERSION
        );

    },


    //--------------------------------------------------
    // INICIALIZAR MÓDULOS
    //--------------------------------------------------

    initializeModules() {

        this.initializeUI();

        this.initializeDashboard();

        this.initializeNotifications();

        this.initializeDialogs();

        this.initializeCourses();

        this.initializeQuestionBank();

        this.initializeExamBuilder();

    },


    //--------------------------------------------------
    // UI
    //--------------------------------------------------

    initializeUI() {

        if (window.SPAEUI) {

            this.MODULES.ui = true;

        }

    },


    //--------------------------------------------------
    // DASHBOARD
    //--------------------------------------------------

    initializeDashboard() {

        if (window.DashboardModule) {

            this.MODULES.dashboard = true;

        }

    },


    //--------------------------------------------------
    // NOTIFICACIONES
    //--------------------------------------------------

    initializeNotifications() {

        if (window.Notifications) {

            this.MODULES.notifications = true;

        }

    },


    //--------------------------------------------------
    // DIALOGS
    //--------------------------------------------------

    initializeDialogs() {

        if (window.Dialogs) {

            this.MODULES.dialogs = true;

        }

    },


    //--------------------------------------------------
    // CURSOS
    //--------------------------------------------------

    initializeCourses() {

        if (window.CourseManager) {

            this.MODULES.courses = true;

        }

    },


    //--------------------------------------------------
    // BANCO DE PREGUNTAS
    //--------------------------------------------------

    initializeQuestionBank() {

        if (window.QuestionBank) {

            this.MODULES.questionBank = true;

        }

    },


    //--------------------------------------------------
    // EXAM BUILDER
    //--------------------------------------------------

    initializeExamBuilder() {

        if (window.ExamBuilder) {

            this.MODULES.examBuilder = true;

        }

    },


    //--------------------------------------------------
    // DASHBOARD INICIAL
    //--------------------------------------------------

    loadDashboard() {

        if (

            window.SPAEUI &&
            SPAEUI.showView

        ) {

            SPAEUI.showView(
                "view-dashboard"
            );

        }

    },


    //--------------------------------------------------
    // CURSO ACTUAL
    //--------------------------------------------------

    setCurrentCourse(course) {

        this.COURSE_LOADED = course;

        if (

            window.SPAEUI &&
            SPAEUI.updateCourseStatus

        ) {

            SPAEUI.updateCourseStatus(
                course.name
            );

        }

    },


    getCurrentCourse() {

        return this.COURSE_LOADED;

    },


    //--------------------------------------------------
    // EVENTOS GLOBALES
    //--------------------------------------------------

    bindGlobalEvents() {

        this.bindMenuEvents();

        this.bindKeyboardShortcuts();

    },


    //--------------------------------------------------
    // MENÚ PRINCIPAL
    //--------------------------------------------------

    bindMenuEvents() {

        const buttons = document.querySelectorAll(
            "[data-view]"
        );

        buttons.forEach(button => {

            button.addEventListener(

                "click",

                () => {

                    const viewID = button.dataset.view;

                    if (

                        window.SPAEUI &&
                        SPAEUI.showView

                    ) {

                        SPAEUI.showView(
                            viewID
                        );

                    }

                }

            );

        });

    },


    //--------------------------------------------------
    // ATAJOS DE TECLADO
    //--------------------------------------------------

    bindKeyboardShortcuts() {

        document.addEventListener(

            "keydown",

            (event) => {

                if (

                    event.ctrlKey &&
                    event.key === "s"

                ) {

                    event.preventDefault();

                    this.saveProject();

                }


                if (

                    event.ctrlKey &&
                    event.key === "e"

                ) {

                    event.preventDefault();

                    this.exportProject();

                }

            }

        );

    },


    //--------------------------------------------------
    // GUARDAR PROYECTO
    //--------------------------------------------------

    saveProject() {

        console.log(
            "Guardar proyecto."
        );

        this.notify(

            "success",

            "Proyecto guardado correctamente."

        );

    },


    //--------------------------------------------------
    // EXPORTAR
    //--------------------------------------------------

    exportProject() {

        console.log(
            "Exportar proyecto."
        );

        this.notify(

            "info",

            "Preparando exportación."

        );

    },


    //--------------------------------------------------
    // NOTIFICACIONES
    //--------------------------------------------------

    notify(type, message) {

        if (

            window.Notifications &&
            Notifications.show

        ) {

            Notifications.show(

                type,
                message

            );

        }

    },


    //--------------------------------------------------
    // ESTADO DEL SISTEMA
    //--------------------------------------------------

    checkSystemStatus() {

        const loadedModules = Object.values(
            this.MODULES
        ).filter(Boolean).length;


        console.log(

            "Módulos activos:",
            loadedModules

        );

    },


    //--------------------------------------------------
    // VALIDACIONES
    //--------------------------------------------------

    isModuleLoaded(moduleName) {

        return this.MODULES[moduleName] || false;

    },


    //--------------------------------------------------
    // RESET
    //--------------------------------------------------

    resetApplication() {

        this.COURSE_LOADED = null;

        if (

            window.SPAEUI &&
            SPAEUI.clearWorkspace

        ) {

            SPAEUI.clearWorkspace();

        }

    },


    //--------------------------------------------------
    // DEBUG
    //--------------------------------------------------

    debug() {

        console.table(

            this.MODULES

        );

    },


    //--------------------------------------------------
    // INFORMACIÓN DEL SISTEMA
    //--------------------------------------------------

    getSystemInformation() {

        return {

            name: this.NAME,
            version: this.VERSION,
            course: this.COURSE_LOADED,
            modules: this.MODULES

        };

    }

};



/*********************************************************
EXPORTACIÓN GLOBAL
*********************************************************/

window.SPAE = SPAE;



/*********************************************************
INICIALIZACIÓN DEL SISTEMA
*********************************************************/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        SPAE.init();

    }

);
