/*********************************************************
 SPAE

 Sistema Profesional de Autoría de Evaluaciones

 Archivo:
 js/workflow-controller.js

 Controlador oficial del flujo pedagógico del sistema.

*********************************************************/

const WorkflowController = {

    /*****************************************************
     FLUJO OFICIAL DEL SPAE
    *****************************************************/

    steps: [

        "dashboard",
        "course",
        "assessment",
        "questions",
        "blueprint",
        "exam",
        "export"

    ],

    currentStep: "dashboard",


    /*****************************************************
     INICIALIZACIÓN
    *****************************************************/

    init() {

        console.log(
            "WorkflowController inicializado."
        );

        this.updateCurrentStep();

    },


    /*****************************************************
     ACTUALIZAR ETAPA ACTUAL
    *****************************************************/

    updateCurrentStep() {

        const project = this.getProject();

        if (!project.course) {

            this.currentStep = "course";
            return;
        }

        if (!project.assessment) {

            this.currentStep = "assessment";
            return;
        }

        if (!project.examDraft) {

            this.currentStep = "questions";
            return;
        }

        if (!project.blueprint) {

            this.currentStep = "blueprint";
            return;
        }

        if (!project.finalExam) {

            this.currentStep = "exam";
            return;
        }

        this.currentStep = "export";

    },


    /*****************************************************
     VALIDAR ACCESO A MÓDULO
    *****************************************************/

    canAccess(moduleName) {

        const project = this.getProject();

        switch (moduleName) {

            case "dashboard":
                return true;

            case "course":
                return true;

            case "assessment":
                return !!project.course;

            case "questions":
                return !!project.assessment;

            case "blueprint":
                return !!project.examDraft;

            case "exam":
                return !!project.blueprint;

            case "export":
                return !!project.finalExam;

            default:
                return false;
        }

    },


    /*****************************************************
     VALIDAR NAVEGACIÓN
    *****************************************************/

    validateNavigation(moduleName) {

        const allowed =
            this.canAccess(moduleName);

        if (!allowed) {

            this.showWorkflowMessage(
                moduleName
            );

            return false;

        }

        return true;

    },


    /*****************************************************
     OBTENER SIGUIENTE PASO
    *****************************************************/

    getNextStep() {

        this.updateCurrentStep();

        return this.currentStep;

    },


    /*****************************************************
     OBTENER PASO ANTERIOR
    *****************************************************/

    getPreviousStep() {

        const index =
            this.steps.indexOf(
                this.currentStep
            );

        if (index <= 0) {

            return null;

        }

        return this.steps[index - 1];

    },


    /*****************************************************
     IR AL SIGUIENTE PASO
    *****************************************************/

    goToNextStep() {

        const next =
            this.getNextStep();

        if (!next) {

            return false;

        }

        if (window.ModuleRouter) {

            ModuleRouter.navigate(
                next
            );

        }

    },


    /*****************************************************
     MOSTRAR MENSAJES AL USUARIO
    *****************************************************/

    showWorkflowMessage(moduleName) {

        const messages = {

            assessment:
                "Debe crear un curso antes de configurar la evaluación.",

            questions:
                "Debe configurar la evaluación antes de construir las preguntas.",

            blueprint:
                "Debe construir las preguntas antes de generar el Blueprint.",

            exam:
                "Debe generar el Blueprint antes de construir el examen.",

            export:
                "Debe generar el examen antes de exportarlo."

        };


        const message =
            messages[moduleName] ||
            "No es posible acceder a este módulo.";


        alert(message);

    },


    /*****************************************************
     ESTADO DEL PROYECTO
    *****************************************************/

    getProjectStatus() {

        const project =
            this.getProject();


        return {

            course:
                !!project.course,

            assessment:
                !!project.assessment,

            questions:
                !!project.examDraft,

            blueprint:
                !!project.blueprint,

            exam:
                !!project.finalExam,

            export:
                !!project.finalExam

        };

    },


    /*****************************************************
     VERIFICAR SI EL MVP ESTÁ COMPLETO
    *****************************************************/

    isProjectComplete() {

        const status =
            this.getProjectStatus();


        return (

            status.course &&
            status.assessment &&
            status.questions &&
            status.blueprint &&
            status.exam

        );

    },


    /*****************************************************
     OBTENER EL PROYECTO ACTUAL
    *****************************************************/

    getProject() {

        if (!window.PersistenceManager) {

            return {};

        }

        return (
            PersistenceManager.loadProject()
            || {}
        );

    },


    /*****************************************************
     REINICIAR FLUJO
    *****************************************************/

    resetWorkflow() {

        this.currentStep =
            "dashboard";

    },


    /*****************************************************
     MOSTRAR RESUMEN DEL FLUJO
    *****************************************************/

    debug() {

        console.log(
            "Etapa actual:",
            this.currentStep
        );

        console.table(
            this.getProjectStatus()
        );

    }

};



/*********************************************************
 EXPORTACIÓN GLOBAL
*********************************************************/

window.WorkflowController =
    WorkflowController;
