/*********************************************************
 SPAE

 Sistema Profesional de Autoría de Evaluaciones

 Archivo:
 js/course-wizard.js

 Wizard para la creación guiada de cursos.

*********************************************************/

const CourseWizard = {

    //--------------------------------------------------
    // ESTADO DEL WIZARD
    //--------------------------------------------------

    currentStep: 1,

    totalSteps: 6,

    courseData: {},



    //--------------------------------------------------
    // INICIALIZACIÓN
    //--------------------------------------------------

    init() {

        console.log(
            "Course Wizard inicializado."
        );

    },



    //--------------------------------------------------
    // INICIAR WIZARD
    //--------------------------------------------------

    start() {

        this.currentStep = 1;

        this.courseData = {};

        this.render();

    },



    //--------------------------------------------------
    // SIGUIENTE PASO
    //--------------------------------------------------

    nextStep() {

        if (this.currentStep < this.totalSteps) {

            this.currentStep++;

            this.render();

        }

    },



    //--------------------------------------------------
    // PASO ANTERIOR
    //--------------------------------------------------

    previousStep() {

        if (this.currentStep > 1) {

            this.currentStep--;

            this.render();

        }

    },



    //--------------------------------------------------
    // GUARDAR INFORMACIÓN
    //--------------------------------------------------

    saveStepData(data) {

        Object.assign(

            this.courseData,

            data

        );

    },



    //--------------------------------------------------
    // RENDERIZAR
    //--------------------------------------------------

    render() {

        switch (this.currentStep) {

            case 1:

                this.renderCourseInformation();

                break;

            case 2:

                this.renderLearningOutcomes();

                break;

            case 3:

                this.renderCompetencies();

                break;

            case 4:

                this.renderUnits();

                break;

            case 5:

                this.renderPedagogicalConfiguration();

                break;

            case 6:

                this.renderSummary();

                break;

        }

    },



    //--------------------------------------------------
    // PASO 1
    //--------------------------------------------------

    renderCourseInformation() {

        console.log(

            "Paso 1: Información del curso"

        );

    },



    //--------------------------------------------------
    // PASO 2
    //--------------------------------------------------

    renderLearningOutcomes() {

        console.log(

            "Paso 2: Resultados de aprendizaje"

        );

    },



    //--------------------------------------------------
    // PASO 3
    //--------------------------------------------------

    renderCompetencies() {

        console.log(

            "Paso 3: Competencias"

        );

    },



    //--------------------------------------------------
    // PASO 4
    //--------------------------------------------------

    renderUnits() {

        console.log(

            "Paso 4: Unidades"

        );

    },



    //--------------------------------------------------
    // PASO 5
    //--------------------------------------------------

    renderPedagogicalConfiguration() {

        console.log(

            "Paso 5: Configuración pedagógica"

        );

    },



    //--------------------------------------------------
    // PASO 6
    //--------------------------------------------------

    renderSummary() {

        console.log(

            "Paso 6: Resumen curricular"

        );

    },



    //--------------------------------------------------
    // CREAR CURSO
    //--------------------------------------------------

    createCourse() {

        const course =

            CourseManager.createCourse(

                this.courseData

            );


        CourseManager.setCurrentCourse(

            course

        );


        Notifications.success(

            "Curso creado correctamente."

        );

        return course;

    },



    //--------------------------------------------------
    // CANCELAR
    //--------------------------------------------------

    cancel() {

        this.courseData = {};

        this.currentStep = 1;

    },



    //--------------------------------------------------
    // VALIDACIONES
    //--------------------------------------------------

    validateCurrentStep() {

        return true;

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

        return this.courseData;

    },



    //--------------------------------------------------
    // DEBUG
    //--------------------------------------------------

    debug() {

        console.table(

            this.courseData

        );

    }

};



/*********************************************************
EXPORTACIÓN GLOBAL
*********************************************************/

window.CourseWizard = CourseWizard;



/*********************************************************
INICIALIZACIÓN AUTOMÁTICA
*********************************************************/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        CourseWizard.init();

    }

);
