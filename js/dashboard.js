/*********************************************************
 SPAE

 Archivo : js/dashboard.js
 Versión : 1.0

 Módulo Dashboard del sistema.

*********************************************************/


const DashboardModule = {


    //--------------------------------------------------
    // ESTADO DEL DASHBOARD
    //--------------------------------------------------

    statistics: {

        courses: 0,
        questions: 0,
        exams: 0,
        learningOutcomes: 0

    },


    //--------------------------------------------------
    // INICIALIZACIÓN
    //--------------------------------------------------

    init() {

        this.loadStatistics();

        this.bindQuickActions();

        this.renderDashboard();

        console.log(
            "Dashboard inicializado."
        );

    },


    //--------------------------------------------------
    // CARGAR ESTADÍSTICAS
    //--------------------------------------------------

    loadStatistics() {

        this.statistics.courses = 0;
        this.statistics.questions = 0;
        this.statistics.exams = 0;
        this.statistics.learningOutcomes = 0;

    },


    //--------------------------------------------------
    // ACTUALIZAR ESTADÍSTICAS
    //--------------------------------------------------

    updateStatistics(data = {}) {

        this.statistics = {

            ...this.statistics,
            ...data

        };

        this.renderStatistics();

    },


    //--------------------------------------------------
    // RENDER PRINCIPAL
    //--------------------------------------------------

    renderDashboard() {

        this.renderStatistics();

        this.renderSystemStatus();

    },


    //--------------------------------------------------
    // RENDER DE ESTADÍSTICAS
    //--------------------------------------------------

    renderStatistics() {

        this.updateElement(

            "stat-courses",
            this.statistics.courses

        );

        this.updateElement(

            "stat-questions",
            this.statistics.questions

        );

        this.updateElement(

            "stat-exams",
            this.statistics.exams

        );

        this.updateElement(

            "stat-outcomes",
            this.statistics.learningOutcomes

        );

    },


    //--------------------------------------------------
    // RENDER DEL ESTADO DEL SISTEMA
    //--------------------------------------------------

    renderSystemStatus() {

        this.updateElement(

            "dashboard-version",
            "v1.0.0"

        );

        this.updateElement(

            "dashboard-status",
            "Operativo"

        );

    },


    //--------------------------------------------------
    // ACCIONES RÁPIDAS
    //--------------------------------------------------

    bindQuickActions() {

        const actions = document.querySelectorAll(

            "[data-action]"

        );


        actions.forEach(action => {

            action.addEventListener(

                "click",

                () => {

                    this.executeAction(

                        action.dataset.action

                    );

                }

            );

        });

    },


    //--------------------------------------------------
    // EJECUTAR ACCIONES
    //--------------------------------------------------

    executeAction(action) {

        switch(action){

            case "new-course":

                this.newCourse();

                break;


            case "new-exam":

                this.newExam();

                break;


            case "new-question":

                this.newQuestion();

                break;


            case "open-bank":

                this.openQuestionBank();

                break;


            default:

                console.warn(

                    "Acción desconocida:",
                    action

                );

        }

    },


    //--------------------------------------------------
    // NUEVO CURSO
    //--------------------------------------------------

    newCourse() {

        console.log(
            "Crear nuevo curso."
        );

        if(window.Notifications){

            Notifications.success(

                "Abrir asistente de creación de curso."

            );

        }

    },


    //--------------------------------------------------
    // NUEVO EXAMEN
    //--------------------------------------------------

    newExam() {

        console.log(
            "Crear examen."
        );

        if(window.Notifications){

            Notifications.info(

                "Abrir constructor de exámenes."

            );

        }

    },


    //--------------------------------------------------
    // NUEVA PREGUNTA
    //--------------------------------------------------

    newQuestion() {

        console.log(
            "Crear pregunta."
        );

        if(window.Notifications){

            Notifications.info(

                "Abrir editor de preguntas."

            );

        }

    },


    //--------------------------------------------------
    // BANCO DE PREGUNTAS
    //--------------------------------------------------

    openQuestionBank() {

        console.log(
            "Banco de preguntas."
        );

        if(window.SPAEUI){

            SPAEUI.showView(

                "view-question-bank"

            );

        }

    },


    //--------------------------------------------------
    // ACTUALIZAR ELEMENTOS
    //--------------------------------------------------

    updateElement(id,value){

        const element = document.getElementById(id);

        if(element){

            element.textContent = value;

        }

    },


    //--------------------------------------------------
    // INFORMACIÓN DEL CURSO
    //--------------------------------------------------

    setCourseInformation(course){

        if(!course){

            return;

        }

        this.updateElement(

            "dashboard-course-name",
            course.name

        );

        this.updateElement(

            "dashboard-course-code",
            course.code

        );

    },


    //--------------------------------------------------
    // INFORMACIÓN DEL EXAMEN
    //--------------------------------------------------

    setExamInformation(exam){

        if(!exam){

            return;

        }

        this.updateElement(

            "dashboard-exam-name",
            exam.title

        );

    },


    //--------------------------------------------------
    // REFRESH COMPLETO
    //--------------------------------------------------

    refresh(){

        this.renderDashboard();

    },


    //--------------------------------------------------
    // LIMPIAR DASHBOARD
    //--------------------------------------------------

    clear(){

        this.statistics = {

            courses:0,
            questions:0,
            exams:0,
            learningOutcomes:0

        };

        this.renderStatistics();

    },


    //--------------------------------------------------
    // DEBUG
    //--------------------------------------------------

    debug(){

        console.table(

            this.statistics

        );

    }

};



/*********************************************************
EXPORTACIÓN GLOBAL
*********************************************************/

window.DashboardModule = DashboardModule;



/*********************************************************
INICIALIZACIÓN
*********************************************************/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        DashboardModule.init();

    }

);
