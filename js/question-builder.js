/*******************************************************
 SPAE

 Archivo:
 js/question-builder.js

 Constructor profesional de preguntas.

*******************************************************/

const QuestionBuilder = {


    //--------------------------------------------------
    // ESTADO
    //--------------------------------------------------

    currentStep: 1,

    totalSteps: 10,

    questionData: {},



    //--------------------------------------------------
    // INICIALIZACIÓN
    //--------------------------------------------------

    init() {

        console.log(
            "Question Builder inicializado."
        );

    },



    //--------------------------------------------------
    // INICIAR
    //--------------------------------------------------

    start() {

        this.currentStep = 1;

        this.questionData = {};

        this.render();

    },



    //--------------------------------------------------
    // NAVEGACIÓN
    //--------------------------------------------------

    nextStep() {

        if (this.currentStep < this.totalSteps) {

            this.currentStep++;

            this.render();

        }

    },


    previousStep() {

        if (this.currentStep > 1) {

            this.currentStep--;

            this.render();

        }

    },



    //--------------------------------------------------
    // RENDER
    //--------------------------------------------------

    render() {

        switch (this.currentStep) {

            case 1:
                this.renderCourse();
                break;

            case 2:
                this.renderUnit();
                break;

            case 3:
                this.renderLearningOutcome();
                break;

            case 4:
                this.renderCompetency();
                break;

            case 5:
                this.renderPedagogicalSettings();
                break;

            case 6:
                this.renderQuestionStem();
                break;

            case 7:
                this.renderOptions();
                break;

            case 8:
                this.renderJustification();
                break;

            case 9:
                this.renderFeedback();
                break;

            case 10:
                this.renderValidation();
                break;

        }

    },



    //--------------------------------------------------
    // PASOS
    //--------------------------------------------------

    renderCourse() {

        console.log(
            "Paso 1: Curso"
        );

    },


    renderUnit() {

        console.log(
            "Paso 2: Unidad"
        );

    },


    renderLearningOutcome() {

        console.log(
            "Paso 3: Resultado de aprendizaje"
        );

    },


    renderCompetency() {

        console.log(
            "Paso 4: Competencia"
        );

    },


    renderPedagogicalSettings() {

        console.log(
            "Paso 5: Bloom y dificultad"
        );

    },


    renderQuestionStem() {

        console.log(
            "Paso 6: Enunciado"
        );

    },


    renderOptions() {

        console.log(
            "Paso 7: Alternativas"
        );

    },


    renderJustification() {

        console.log(
            "Paso 8: Justificación"
        );

    },


    renderFeedback() {

        console.log(
            "Paso 9: Retroalimentación"
        );

    },


    renderValidation() {

        console.log(
            "Paso 10: Validación"
        );

    },



    //--------------------------------------------------
    // GUARDAR INFORMACIÓN
    //--------------------------------------------------

    saveData(data) {

        Object.assign(

            this.questionData,

            data

        );

    },



    //--------------------------------------------------
    // VALIDACIONES BÁSICAS
    //--------------------------------------------------

    validateQuestion() {

        const requiredFields = [

            "courseID",
            "learningOutcome",
            "bloomLevel",
            "difficulty",
            "stem"

        ];


        for (let field of requiredFields) {

            if (!this.questionData[field]) {

                return false;

            }

        }

        return true;

    },



    //--------------------------------------------------
    // QUALITY ENGINE
    //--------------------------------------------------

    evaluateQuality() {

        if (

            window.QualityEngine &&
            QualityEngine.evaluateQuestion

        ) {

            return QualityEngine
                .evaluateQuestion(

                    this.questionData

                );

        }

        return null;

    },



    //--------------------------------------------------
    // BLOOM ENGINE
    //--------------------------------------------------

    validateBloomLevel() {

        if (

            window.BloomEngine &&
            BloomEngine.validateBloom

        ) {

            return BloomEngine
                .validateBloom(

                    this.questionData

                );

        }

        return true;

    },



    //--------------------------------------------------
    // DISTRACTORES
    //--------------------------------------------------

    evaluateDistractors() {

        if (

            window.DistractorEngine &&
            DistractorEngine
            .evaluateDistractors

        ) {

            return DistractorEngine
                .evaluateDistractors(

                    this.questionData.options

                );

        }

        return null;

    },



    //--------------------------------------------------
    // VISTA PREVIA
    //--------------------------------------------------

    previewQuestion() {

        return {

            course:

                this.questionData.courseID,

            bloom:

                this.questionData.bloomLevel,

            difficulty:

                this.questionData.difficulty,

            question:

                this.questionData.stem,

            options:

                this.questionData.options

        };

    },



    //--------------------------------------------------
    // CREAR PREGUNTA
    //--------------------------------------------------

    createQuestion() {

        if (!this.validateQuestion()) {

            return null;

        }


        const question =

            QuestionBank.createQuestion(

                this.questionData

            );


        Notifications.success(

            "Pregunta creada correctamente."

        );


        return question;

    },



    //--------------------------------------------------
    // DUPLICAR
    //--------------------------------------------------

    duplicateQuestion(id) {

        QuestionBank
            .duplicateQuestion(id);

    },



    //--------------------------------------------------
    // EXPORTAR
    //--------------------------------------------------

    exportQuestion(id) {

        QuestionBank
            .exportQuestion(id);

    },



    //--------------------------------------------------
    // PROGRESO
    //--------------------------------------------------

    getProgress() {

        return Math.round(

            (this.currentStep /

            this.totalSteps) * 100

        );

    },



    //--------------------------------------------------
    // RESUMEN
    //--------------------------------------------------

    getSummary() {

        return this.questionData;

    },



    //--------------------------------------------------
    // CANCELAR
    //--------------------------------------------------

    cancel() {

        this.currentStep = 1;

        this.questionData = {};

    },



    //--------------------------------------------------
    // DEBUG
    //--------------------------------------------------

    debug() {

        console.table(

            this.questionData

        );

    }

};



/*******************************************************
 EXPORTACIÓN GLOBAL
*******************************************************/

window.QuestionBuilder = QuestionBuilder;



/*******************************************************
 INICIALIZACIÓN AUTOMÁTICA
*******************************************************/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        QuestionBuilder.init();

    }

);
