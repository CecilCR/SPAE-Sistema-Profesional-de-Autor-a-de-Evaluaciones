/*********************************************************
 SPAE

 Sistema Profesional de Autoría de Evaluaciones

 Archivo:
 js/exam-builder.js

 Constructor profesional de exámenes.

*********************************************************/

const ExamBuilder = {


    //--------------------------------------------------
    // ESTADO
    //--------------------------------------------------

    currentStep: 1,

    totalSteps: 10,

    examData: {},



    //--------------------------------------------------
    // INICIALIZACIÓN
    //--------------------------------------------------

    init() {

        console.log(
            "Exam Builder inicializado."
        );

    },



    //--------------------------------------------------
    // INICIAR
    //--------------------------------------------------

    start() {

        this.currentStep = 1;

        this.examData = {};

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
    // RENDERIZAR
    //--------------------------------------------------

    render() {

        switch (this.currentStep) {

            case 1:
                this.renderCourseBlueprint();
                break;

            case 2:
                this.renderEvaluationType();
                break;

            case 3:
                this.renderExamSettings();
                break;

            case 4:
                this.renderRestrictions();
                break;

            case 5:
                this.renderBuildMode();
                break;

            case 6:
                this.renderBuildProcess();
                break;

            case 7:
                this.renderCurricularValidation();
                break;

            case 8:
                this.renderPedagogicalValidation();
                break;

            case 9:
                this.renderPreview();
                break;

            case 10:
                this.renderGenerateExam();
                break;

        }

    },



    //--------------------------------------------------
    // PASOS DEL WIZARD
    //--------------------------------------------------

    renderCourseBlueprint() {

        console.log(
            "Seleccionar Curso y Blueprint."
        );

    },


    renderEvaluationType() {

        console.log(
            "Seleccionar tipo de evaluación."
        );

    },


    renderExamSettings() {

        console.log(
            "Configuración del examen."
        );

    },


    renderRestrictions() {

        console.log(
            "Restricciones pedagógicas."
        );

    },


    renderBuildMode() {

        console.log(
            "Modo de construcción."
        );

    },


    renderBuildProcess() {

        console.log(
            "Construcción del examen."
        );

    },


    renderCurricularValidation() {

        console.log(
            "Validación curricular."
        );

    },


    renderPedagogicalValidation() {

        console.log(
            "Validación pedagógica."
        );

    },


    renderPreview() {

        console.log(
            "Vista previa."
        );

    },


    renderGenerateExam() {

        console.log(
            "Generar examen."
        );

    },



    //--------------------------------------------------
    // GUARDAR DATOS
    //--------------------------------------------------

    saveData(data) {

        Object.assign(
            this.examData,
            data
        );

    },



    //--------------------------------------------------
    // VALIDACIONES
    //--------------------------------------------------

    validateCourse() {

        return !!this.examData.courseID;

    },


    validateBlueprint() {

        return !!this.examData.blueprintID;

    },


    validateDuration() {

        return this.examData.duration > 0;

    },


    validateTotalScore() {

        return this.examData.totalScore > 0;

    },


    validateQuestions() {

        return this.examData.totalQuestions > 0;

    },


    validateExam() {

        return (

            this.validateCourse()
            &&

            this.validateBlueprint()
            &&

            this.validateDuration()
            &&

            this.validateTotalScore()
            &&

            this.validateQuestions()

        );

    },



    //--------------------------------------------------
    // MODOS DE GENERACIÓN
    //--------------------------------------------------

    buildAutomatic() {

        return ExamEngine.generateExam(
            this.examData
        );

    },


    buildSemiAutomatic() {

        return ExamEngine.generateExam(
            this.examData
        );

    },


    buildManual() {

        return ExamEngine.generateExam(
            this.examData
        );

    },



    //--------------------------------------------------
    // VALIDACIÓN CURRICULAR
    //--------------------------------------------------

    curricularValidation() {

        return {

            learningOutcomes:

                true,

            competencies:

                true,

            blueprint:

                true

        };

    },



    //--------------------------------------------------
    // VALIDACIÓN PEDAGÓGICA
    //--------------------------------------------------

    pedagogicalValidation() {

        return {

            bloomCoverage:

                true,

            difficultyCoverage:

                true,

            questionTypes:

                true,

            qualityScore:

                true

        };

    },



    //--------------------------------------------------
    // QUALITY ENGINE
    //--------------------------------------------------

    qualityAnalysis() {

        if (

            window.QualityEngine &&
            QualityEngine.analyzeExam

        ) {

            return QualityEngine
                .analyzeExam(

                    this.examData

                );

        }

        return null;

    },



    //--------------------------------------------------
    // TIEMPO ESTIMADO
    //--------------------------------------------------

    estimateDuration() {

        if (

            window.ExamEngine &&
            ExamEngine.calculateDuration

        ) {

            return ExamEngine
                .calculateDuration();

        }

        return 0;

    },



    //--------------------------------------------------
    // VISTA PREVIA
    //--------------------------------------------------

    getPreview() {

        return {

            title:
                this.examData.title,

            type:
                this.examData.type,

            duration:
                this.examData.duration,

            questions:
                this.examData.totalQuestions,

            versions:
                this.examData.versions

        };

    },



    //--------------------------------------------------
    // GENERAR EXAMEN
    //--------------------------------------------------

    createExam() {

        if (!this.validateExam()) {

            Notifications.error(
                "La configuración del examen contiene errores."
            );

            return null;

        }


        const exam =

            ExamEngine.generateExam(

                this.examData

            );


        Notifications.success(
            "Examen generado correctamente."
        );


        return exam;

    },



    //--------------------------------------------------
    // EXPORTAR
    //--------------------------------------------------

    exportExam() {

        Exporter.exportCustom(

            "Exam Configuration",

            this.examData

        );

    },



    //--------------------------------------------------
    // IMPORTAR
    //--------------------------------------------------

    importExam(data) {

        this.examData = data;

    },



    //--------------------------------------------------
    // PROGRESO
    //--------------------------------------------------

    getProgress() {

        return Math.round(

            (this.currentStep /
                this.totalSteps)

            * 100

        );

    },



    //--------------------------------------------------
    // CANCELAR
    //--------------------------------------------------

    cancel() {

        this.currentStep = 1;

        this.examData = {};

    },



    //--------------------------------------------------
    // RESUMEN
    //--------------------------------------------------

    getSummary() {

        return this.examData;

    },



    //--------------------------------------------------
    // DEBUG
    //--------------------------------------------------

    debug() {

        console.table(
            this.examData
        );

    }


};



/*********************************************************
 EXPORTACIÓN GLOBAL
*********************************************************/

window.ExamBuilder = ExamBuilder;



/*********************************************************
 INICIALIZACIÓN AUTOMÁTICA
*********************************************************/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        ExamBuilder.init();

    }

);
