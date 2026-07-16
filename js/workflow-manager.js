/*********************************************************
 SPAE

 Sistema Profesional de Autoría de Evaluaciones

 Archivo:
 js/workflow-manager.js

 Gestiona el flujo pedagógico y operativo del sistema.

*********************************************************/


const WorkflowManager = {


    /*****************************************************
     CONFIGURACIÓN DEL FLUJO
    *****************************************************/

    STEPS: [

        "course",
        "questions",
        "blueprint",
        "exam",
        "reports"

    ],



    /*****************************************************
     INICIALIZACIÓN
    *****************************************************/

    init() {

        console.log(
            "Workflow Manager inicializado."
        );

        this.updateDashboard();

    },



    /*****************************************************
     OBTENER ESTADO DEL PROYECTO
    *****************************************************/

    getProjectStatus() {

        const project =
            PersistenceManager.loadProject();

        return {

            course:

                Object.keys(
                    project.course
                ).length > 0,


            questions:

                project.questions.length > 0,


            blueprint:

                Object.keys(
                    project.blueprint
                ).length > 0,


            exam:

                Object.keys(
                    project.exam
                ).length > 0,


            reports:

                Object.keys(
                    project.reports
                ).length > 0

        };

    },



    /*****************************************************
     CURSO DISPONIBLE
    *****************************************************/

    hasCourse() {

        return this.getProjectStatus()
            .course;

    },



    /*****************************************************
     PREGUNTAS DISPONIBLES
    *****************************************************/

    hasQuestions() {

        return this.getProjectStatus()
            .questions;

    },



    /*****************************************************
     BLUEPRINT DISPONIBLE
    *****************************************************/

    hasBlueprint() {

        return this.getProjectStatus()
            .blueprint;

    },



    /*****************************************************
     EXAMEN DISPONIBLE
    *****************************************************/

    hasExam() {

        return this.getProjectStatus()
            .exam;

    },



    /*****************************************************
     REPORTES DISPONIBLES
    *****************************************************/

    hasReports() {

        return this.getProjectStatus()
            .reports;

    },



    /*****************************************************
     VALIDACIONES DEL FLUJO
    *****************************************************/

    canAccess(module) {

        switch (module) {

            case "course":
                return true;


            case "questions":
                return this.hasCourse();


            case "blueprint":
                return (
                    this.hasCourse()
                    &&
                    this.hasQuestions()
                );


            case "exam":
                return (
                    this.hasCourse()
                    &&
                    this.hasQuestions()
                    &&
                    this.hasBlueprint()
                );


            case "reports":
                return (
                    this.hasExam()
                );


            default:
                return false;

        }

    },



    /*****************************************************
     OBTENER MENSAJES PEDAGÓGICOS
    *****************************************************/

    getNextRecommendation() {

        const status =
            this.getProjectStatus();


        if (!status.course) {

            return "Comience creando un curso.";

        }


        if (!status.questions) {

            return "Debe registrar preguntas en el banco.";

        }


        if (!status.blueprint) {

            return "Debe construir el blueprint.";

        }


        if (!status.exam) {

            return "El examen aún no ha sido generado.";

        }


        if (!status.reports) {

            return "Puede generar reportes pedagógicos.";

        }


        return (
            "Proyecto completado correctamente."
        );

    },



    /*****************************************************
     CALCULAR AVANCE
    *****************************************************/

    getProgress() {

        const status =
            this.getProjectStatus();


        let completed = 0;


        Object.values(status).forEach(
            item => {

                if (item) {

                    completed++;

                }

            }
        );


        return Math.round(

            (completed / this.STEPS.length) * 100

        );

    },



    /*****************************************************
     OBTENER PASO ACTUAL
    *****************************************************/

    getCurrentStep() {

        const status =
            this.getProjectStatus();


        if (!status.course) {

            return "course";

        }


        if (!status.questions) {

            return "questions";

        }


        if (!status.blueprint) {

            return "blueprint";

        }


        if (!status.exam) {

            return "exam";

        }


        if (!status.reports) {

            return "reports";

        }


        return "completed";

    },



    /*****************************************************
     ACTUALIZAR DASHBOARD
    *****************************************************/

    updateDashboard() {

        this.updateSummaryCards();

        this.updateAlerts();

    },



    /*****************************************************
     RESUMEN DEL PROYECTO
    *****************************************************/

    updateSummaryCards() {

        const project =
            PersistenceManager.loadProject();


        /*
        Curso.
        */

        const courseElement =
            document.getElementById(
                "summary-course"
            );

        if (courseElement) {

            courseElement.textContent =

                project.course.name ||
                "No definido";

        }


        /*
        Preguntas.
        */

        const questionsElement =
            document.getElementById(
                "summary-questions"
            );

        if (questionsElement) {

            questionsElement.textContent =

                project.questions.length;

        }


        /*
        Blueprint.
        */

        const blueprintElement =
            document.getElementById(
                "summary-blueprint"
            );

        if (blueprintElement) {

            blueprintElement.textContent =

                this.hasBlueprint()
                    ? "Completado"
                    : "Pendiente";

        }


        /*
        Examen.
        */

        const examElement =
            document.getElementById(
                "summary-exam"
            );

        if (examElement) {

            examElement.textContent =

                this.hasExam()
                    ? "Generado"
                    : "Pendiente";

        }

    },



    /*****************************************************
     MENSAJES DEL PROYECTO
    *****************************************************/

    updateAlerts() {

        const alertElement =
            document.getElementById(
                "project-alerts"
            );


        if (!alertElement) {

            return;

        }


        alertElement.textContent =

            this.getNextRecommendation();

    },



    /*****************************************************
     BLOQUEAR NAVEGACIÓN
    *****************************************************/

    validateNavigation(module) {

        if (

            this.canAccess(module)

        ) {

            return true;

        }


        alert(

            this.getNextRecommendation()

        );


        return false;

    },



    /*****************************************************
     INFORMACIÓN COMPLETA
    *****************************************************/

    getWorkflowInformation() {

        return {

            progress:

                this.getProgress(),


            currentStep:

                this.getCurrentStep(),


            recommendation:

                this.getNextRecommendation(),


            status:

                this.getProjectStatus()

        };

    },



    /*****************************************************
     DEBUG
    *****************************************************/

    debug() {

        console.table(

            this.getWorkflowInformation()

        );

    }

};



/*********************************************************
 EXPORTACIÓN GLOBAL
*********************************************************/

window.WorkflowManager =
    WorkflowManager;



/*********************************************************
 INICIALIZACIÓN AUTOMÁTICA
*********************************************************/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        WorkflowManager.init();

    }

);
