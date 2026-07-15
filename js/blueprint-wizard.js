/*********************************************************
 SPAE

 Sistema Profesional de Autoría de Evaluaciones

 Archivo:
 js/blueprint-wizard.js

 Asistente de creación de Blueprints.

*********************************************************/

const BlueprintWizard = {

    //--------------------------------------------------
    // ESTADO DEL WIZARD
    //--------------------------------------------------

    currentStep: 1,

    totalSteps: 10,

    blueprintData: {},



    //--------------------------------------------------
    // INICIALIZACIÓN
    //--------------------------------------------------

    init() {

        console.log(
            "Blueprint Wizard inicializado."
        );

    },



    //--------------------------------------------------
    // INICIAR WIZARD
    //--------------------------------------------------

    start() {

        this.currentStep = 1;

        this.blueprintData = {};

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
    // RENDERIZAR PASOS
    //--------------------------------------------------

    render() {

        switch (this.currentStep) {

            case 1:
                this.renderCourseSelection();
                break;

            case 2:
                this.renderExamConfiguration();
                break;

            case 3:
                this.renderBloomDistribution();
                break;

            case 4:
                this.renderDifficultyDistribution();
                break;

            case 5:
                this.renderQuestionTypes();
                break;

            case 6:
                this.renderLearningOutcomes();
                break;

            case 7:
                this.renderCompetencies();
                break;

            case 8:
                this.renderPedagogicalRules();
                break;

            case 9:
                this.renderPreview();
                break;

            case 10:
                this.renderFinalValidation();
                break;

        }

    },



    //--------------------------------------------------
    // PASO 1
    //--------------------------------------------------

    renderCourseSelection() {

        console.log(
            "Paso 1: Seleccionar curso."
        );

    },



    //--------------------------------------------------
    // PASO 2
    //--------------------------------------------------

    renderExamConfiguration() {

        console.log(
            "Paso 2: Configuración del examen."
        );

    },



    //--------------------------------------------------
    // PASO 3
    //--------------------------------------------------

    renderBloomDistribution() {

        console.log(
            "Paso 3: Distribución Bloom."
        );

    },



    //--------------------------------------------------
    // PASO 4
    //--------------------------------------------------

    renderDifficultyDistribution() {

        console.log(
            "Paso 4: Distribución de dificultad."
        );

    },



    //--------------------------------------------------
    // PASO 5
    //--------------------------------------------------

    renderQuestionTypes() {

        console.log(
            "Paso 5: Tipos de preguntas."
        );

    },



    //--------------------------------------------------
    // PASO 6
    //--------------------------------------------------

    renderLearningOutcomes() {

        console.log(
            "Paso 6: Resultados de aprendizaje."
        );

    },



    //--------------------------------------------------
    // PASO 7
    //--------------------------------------------------

    renderCompetencies() {

        console.log(
            "Paso 7: Competencias."
        );

    },



    //--------------------------------------------------
    // PASO 8
    //--------------------------------------------------

    renderPedagogicalRules() {

        console.log(
            "Paso 8: Reglas pedagógicas."
        );

    },



    //--------------------------------------------------
    // PASO 9
    //--------------------------------------------------

    renderPreview() {

        console.log(
            "Paso 9: Vista previa."
        );

    },



    //--------------------------------------------------
    // PASO 10
    //--------------------------------------------------

    renderFinalValidation() {

        console.log(
            "Paso 10: Validación final."
        );

    },



    //--------------------------------------------------
    // GUARDAR INFORMACIÓN
    //--------------------------------------------------

    saveData(data) {

        Object.assign(

            this.blueprintData,

            data

        );

    },



    //--------------------------------------------------
    // VALIDACIÓN BLOOM
    //--------------------------------------------------

    validateBloomDistribution() {

        const bloom =

            this.blueprintData
            .bloomDistribution;


        if (!bloom) {

            return false;

        }


        let total = 0;

        Object.values(bloom)
        .forEach(value => {

            total += value;

        });


        return total === 100;

    },



    //--------------------------------------------------
    // VALIDACIÓN DIFICULTAD
    //--------------------------------------------------

    validateDifficultyDistribution() {

        const difficulty =

            this.blueprintData
            .difficultyDistribution;


        if (!difficulty) {

            return false;

        }


        let total = 0;

        Object.values(difficulty)
        .forEach(value => {

            total += value;

        });


        return total === 100;

    },



    //--------------------------------------------------
    // VALIDACIÓN TIPOS
    //--------------------------------------------------

    validateQuestionTypes() {

        const types =

            this.blueprintData
            .questionTypes;


        if (!types) {

            return false;

        }


        let total = 0;

        Object.values(types)
        .forEach(value => {

            total += value;

        });


        return (

            total ===
            this.blueprintData.totalQuestions

        );

    },



    //--------------------------------------------------
    // VALIDACIÓN GENERAL
    //--------------------------------------------------

    validateBlueprint() {

        return (

            this.validateBloomDistribution()

            &&

            this.validateDifficultyDistribution()

            &&

            this.validateQuestionTypes()

        );

    },



    //--------------------------------------------------
    // VISTA PREVIA
    //--------------------------------------------------

    getPreview() {

        return {

            title:
                this.blueprintData.title,

            duration:
                this.blueprintData.duration,

            questions:
                this.blueprintData.totalQuestions,

            bloom:
                this.blueprintData
                .bloomDistribution,

            difficulty:
                this.blueprintData
                .difficultyDistribution

        };

    },



    //--------------------------------------------------
    // CREAR BLUEPRINT
    //--------------------------------------------------

    createBlueprint() {

        if (!this.validateBlueprint()) {

            Notifications.error(

                "El Blueprint contiene errores."

            );

            return null;

        }


        const blueprint =

            BlueprintEngine
            .createBlueprint(

                this.blueprintData

            );


        Notifications.success(

            "Blueprint creado correctamente."

        );


        return blueprint;

    },



    //--------------------------------------------------
    // IMPORTAR
    //--------------------------------------------------

    importBlueprint(data) {

        this.blueprintData = data;

    },



    //--------------------------------------------------
    // EXPORTAR
    //--------------------------------------------------

    exportBlueprint() {

        Exporter.exportCustom(

            "Blueprint",

            this.blueprintData

        );

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
    // RESUMEN
    //--------------------------------------------------

    getSummary() {

        return this.blueprintData;

    },



    //--------------------------------------------------
    // CANCELAR
    //--------------------------------------------------

    cancel() {

        this.currentStep = 1;

        this.blueprintData = {};

    },



    //--------------------------------------------------
    // DEBUG
    //--------------------------------------------------

    debug() {

        console.table(

            this.blueprintData

        );

    }


};



/*********************************************************
 EXPORTACIÓN GLOBAL
*********************************************************/

window.BlueprintWizard = BlueprintWizard;



/*********************************************************
 INICIALIZACIÓN AUTOMÁTICA
*********************************************************/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        BlueprintWizard.init();

    }

);
