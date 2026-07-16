/*********************************************************
 SPAE

 Sistema Profesional de Autoría de Evaluaciones

 Archivo:
 js/validation-engine.js

 Motor de validación pedagógica del sistema.

*********************************************************/

const ValidationEngine = {


    /*****************************************************
     CONFIGURACIÓN
    *****************************************************/

    MAX_SCORE: 100,



    /*****************************************************
     INICIALIZACIÓN
    *****************************************************/

    init() {

        console.log(
            "Validation Engine inicializado."
        );

    },



    /*****************************************************
     VALIDACIÓN GENERAL DEL PROYECTO
    *****************************************************/

    validateProject() {

        return {

            course:
                this.validateCourse(),

            questions:
                this.validateQuestions(),

            blueprint:
                this.validateBlueprint(),

            exam:
                this.validateExam(),

            score:
                this.calculateScore(),

            recommendation:
                this.getRecommendation()

        };

    },



    /*****************************************************
     VALIDACIÓN DEL CURSO
    *****************************************************/

    validateCourse() {

        const project =
            PersistenceManager.loadProject();

        const course =
            project.course;


        if (
            !course ||
            Object.keys(course).length === 0
        ) {

            return {

                valid: false,

                message:
                    "No existe un curso registrado."

            };

        }


        return {

            valid: true,

            message:
                "Curso registrado correctamente."

        };

    },



    /*****************************************************
     VALIDACIÓN DE PREGUNTAS
    *****************************************************/

    validateQuestions() {

        const project =
            PersistenceManager.loadProject();

        const questions =
            project.questions;


        if (!questions.length) {

            return {

                valid: false,

                message:
                    "No existen preguntas registradas."

            };

        }


        return {

            valid: true,

            total:
                questions.length,

            message:
                "Banco de preguntas disponible."

        };

    },



    /*****************************************************
     VALIDACIÓN DEL BLUEPRINT
    *****************************************************/

    validateBlueprint() {

        const project =
            PersistenceManager.loadProject();

        const blueprint =
            project.blueprint;


        if (
            !blueprint ||
            Object.keys(blueprint).length === 0
        ) {

            return {

                valid: false,

                message:
                    "No existe un Blueprint."

            };

        }


        return {

            valid: true,

            message:
                "Blueprint construido."

        };

    },



    /*****************************************************
     VALIDACIÓN DEL EXAMEN
    *****************************************************/

    validateExam() {

        const project =
            PersistenceManager.loadProject();

        const exam =
            project.exam;


        if (
            !exam ||
            Object.keys(exam).length === 0
        ) {

            return {

                valid: false,

                message:
                    "El examen aún no ha sido generado."

            };

        }


        return {

            valid: true,

            message:
                "Examen disponible."

        };

    },



    /*****************************************************
     COBERTURA CURRICULAR (V1)
    *****************************************************/

    validateLearningOutcomes() {

        const project =
            PersistenceManager.loadProject();

        const course =
            project.course;


        /*
         Preparado para futuras versiones.
        */

        if (
            !course.learningOutcomes
        ) {

            return {

                valid: false,

                coverage: 0,

                message:
                    "No existen resultados de aprendizaje registrados."

            };

        }


        return {

            valid: true,

            coverage: 100,

            message:
                "Resultados de aprendizaje registrados."

        };

    },



    /*****************************************************
     VALIDACIÓN DE PROGRESO
    *****************************************************/

    validateWorkflow() {

        if (
            !window.WorkflowManager
        ) {

            return {

                progress: 0

            };

        }


        return {

            progress:
                WorkflowManager.getProgress()

        };

    },



    /*****************************************************
     CÁLCULO DE LA PUNTUACIÓN GLOBAL
    *****************************************************/

    calculateScore() {

        let score = 0;


        if (
            this.validateCourse().valid
        ) {

            score += 25;

        }


        if (
            this.validateQuestions().valid
        ) {

            score += 25;

        }


        if (
            this.validateBlueprint().valid
        ) {

            score += 25;

        }


        if (
            this.validateExam().valid
        ) {

            score += 25;

        }


        return score;

    },



    /*****************************************************
     NIVEL DEL PROYECTO
    *****************************************************/

    getProjectLevel() {

        const score =
            this.calculateScore();


        if (score < 25) {

            return "Inicial";

        }


        if (score < 50) {

            return "En desarrollo";

        }


        if (score < 75) {

            return "Avanzado";

        }


        if (score < 100) {

            return "Muy avanzado";

        }


        return "Proyecto completado";

    },



    /*****************************************************
     RECOMENDACIONES
    *****************************************************/

    getRecommendation() {

        const course =
            this.validateCourse();

        const questions =
            this.validateQuestions();

        const blueprint =
            this.validateBlueprint();

        const exam =
            this.validateExam();


        if (!course.valid) {

            return course.message;

        }


        if (!questions.valid) {

            return questions.message;

        }


        if (!blueprint.valid) {

            return blueprint.message;

        }


        if (!exam.valid) {

            return exam.message;

        }


        return (
            "El proyecto cumple con los criterios mínimos del MVP."
        );

    },



    /*****************************************************
     REPORTE DE VALIDACIÓN
    *****************************************************/

    generateReport() {

        return {

            score:
                this.calculateScore(),

            level:
                this.getProjectLevel(),

            course:
                this.validateCourse(),

            questions:
                this.validateQuestions(),

            blueprint:
                this.validateBlueprint(),

            exam:
                this.validateExam(),

            learningOutcomes:
                this.validateLearningOutcomes(),

            workflow:
                this.validateWorkflow(),

            recommendation:
                this.getRecommendation()

        };

    },



    /*****************************************************
     DASHBOARD
    *****************************************************/

    updateDashboard() {

        const report =
            this.generateReport();


        const alerts =
            document.getElementById(
                "project-alerts"
            );


        if (alerts) {

            alerts.textContent =
                report.recommendation;

        }

    },



    /*****************************************************
     VALIDACIÓN RÁPIDA
    *****************************************************/

    isReadyForExamGeneration() {

        return (

            this.validateCourse().valid
            &&
            this.validateQuestions().valid
            &&
            this.validateBlueprint().valid

        );

    },



    /*****************************************************
     VALIDACIÓN RÁPIDA
    *****************************************************/

    isProjectCompleted() {

        return (

            this.calculateScore()
            === this.MAX_SCORE

        );

    },



    /*****************************************************
     DEBUG
    *****************************************************/

    debug() {

        console.table(
            this.generateReport()
        );

    }

};



/*********************************************************
 EXPORTACIÓN GLOBAL
*********************************************************/

window.ValidationEngine =
    ValidationEngine;



/*********************************************************
 INICIALIZACIÓN AUTOMÁTICA
*********************************************************/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        ValidationEngine.init();

    }

);
