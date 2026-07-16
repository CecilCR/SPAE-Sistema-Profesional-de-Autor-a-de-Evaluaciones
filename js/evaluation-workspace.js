/*********************************************************
 SPAE

 Sistema Profesional de Autoría de Evaluaciones

 Archivo:
 js/evaluation-workspace.js

 Controla el flujo operativo completo del usuario.

*********************************************************/


const EvaluationWorkspace = {

    /*****************************************************
     CONFIGURACIÓN DEL FLUJO
    *****************************************************/

    STEPS: [

        {
            id: "course",
            title: "Información del Curso",
            module: "CourseModule"
        },

        {
            id: "assessment",
            title: "Configuración de la Evaluación",
            module: "AssessmentModule"
        },

        {
            id: "questions",
            title: "Banco de Preguntas",
            module: "QuestionModule"
        },

        {
            id: "blueprint",
            title: "Blueprint",
            module: "BlueprintModule"
        },

        {
            id: "exam",
            title: "Generar Examen",
            module: "ExamModule"
        },

        {
            id: "export",
            title: "Exportar Evaluación",
            module: "ExportModule"
        }

    ],


    currentStep: 0,



    /*****************************************************
     INICIALIZACIÓN
    *****************************************************/

    init() {

        console.log(
            "Evaluation Workspace inicializado."
        );

    },



    /*****************************************************
     INICIAR NUEVA EVALUACIÓN
    *****************************************************/

    start() {

        this.currentStep = 0;

        this.render();

    },



    /*****************************************************
     RENDER GENERAL
    *****************************************************/

    render() {

        this.renderProgress();

        this.loadCurrentModule();

    },



    /*****************************************************
     OBTENER PASO ACTUAL
    *****************************************************/

    getCurrentStep() {

        return this.STEPS[
            this.currentStep
        ];

    },



    /*****************************************************
     CARGAR MÓDULO ACTUAL
    *****************************************************/

    loadCurrentModule() {

        const step =
            this.getCurrentStep();

        const moduleName =
            step.module;


        if (

            window[moduleName]
            &&
            typeof window[moduleName].render === "function"

        ) {

            window[moduleName].render();

        }

        else {

            console.warn(

                `El módulo ${moduleName} no está disponible.`

            );

        }

    },



    /*****************************************************
     PASO SIGUIENTE
    *****************************************************/

    next() {

        if (!this.validateCurrentStep()) {

            return;

        }


        if (

            this.currentStep <
            this.STEPS.length - 1

        ) {

            this.currentStep++;

            this.render();

        }

    },



    /*****************************************************
     PASO ANTERIOR
    *****************************************************/

    previous() {

        if (

            this.currentStep > 0

        ) {

            this.currentStep--;

            this.render();

        }

    },



    /*****************************************************
     IR A UN PASO
    *****************************************************/

    goTo(stepNumber) {

        if (

            stepNumber < 0 ||
            stepNumber >= this.STEPS.length

        ) {

            return;

        }


        this.currentStep =
            stepNumber;

        this.render();

    },



    /*****************************************************
     VALIDAR PASO ACTUAL
    *****************************************************/

    validateCurrentStep() {

        const step =
            this.getCurrentStep();

        const moduleName =
            step.module;


        if (

            window[moduleName]
            &&
            typeof window[moduleName].validate === "function"

        ) {

            return window[moduleName]
                .validate();

        }


        return true;

    },



    /*****************************************************
     PROGRESO
    *****************************************************/

    getProgress() {

        return Math.round(

            ((this.currentStep + 1)
                / this.STEPS.length)

            * 100

        );

    },



    /*****************************************************
     BARRA DE PROGRESO
    *****************************************************/

    renderProgress() {

        const element =
            document.getElementById(
                "evaluation-progress"
            );


        if (!element) {

            return;

        }


        element.innerHTML = `

            <h3>

                Paso ${this.currentStep + 1}
                de
                ${this.STEPS.length}

            </h3>

            <p>

                ${this.getCurrentStep().title}

            </p>

            <p>

                Progreso:
                ${this.getProgress()}%

            </p>

        `;

    },



    /*****************************************************
     BOTONES DE NAVEGACIÓN
    *****************************************************/

    renderNavigationButtons() {

        return `

        <div class="evaluation-navigation">

            <button
                onclick="EvaluationWorkspace.previous()">

                Anterior

            </button>

            <button
                onclick="EvaluationWorkspace.next()">

                Siguiente

            </button>

        </div>

        `;

    },



    /*****************************************************
     GUARDAR PROGRESO
    *****************************************************/

    saveProgress() {

        localStorage.setItem(

            "SPAE_CURRENT_STEP",

            this.currentStep

        );

    },



    /*****************************************************
     RECUPERAR PROGRESO
    *****************************************************/

    loadProgress() {

        const savedStep =
            localStorage.getItem(
                "SPAE_CURRENT_STEP"
            );


        if (savedStep) {

            this.currentStep =
                Number(savedStep);

        }

    },



    /*****************************************************
     REINICIAR EVALUACIÓN
    *****************************************************/

    reset() {

        this.currentStep = 0;

        this.render();

    },



    /*****************************************************
     INFORMACIÓN DEL PROYECTO
    *****************************************************/

    getSummary() {

        return {

            step:

                this.currentStep + 1,

            totalSteps:

                this.STEPS.length,

            progress:

                this.getProgress(),

            title:

                this.getCurrentStep().title

        };

    },



    /*****************************************************
     DEBUG
    *****************************************************/

    debug() {

        console.table(
            this.getSummary()
        );

    }

};



/*********************************************************
 EXPORTACIÓN GLOBAL
*********************************************************/

window.EvaluationWorkspace =
    EvaluationWorkspace;



/*********************************************************
 INICIALIZACIÓN AUTOMÁTICA
*********************************************************/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        EvaluationWorkspace.init();

    }

);
