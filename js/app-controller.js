/*********************************************************
 SPAE

 Sistema Profesional de Autoría de Evaluaciones

 Archivo:
 js/app-controller.js

 Controlador principal del sistema.

*********************************************************/

const AppController = {

    /*****************************************************
     CONFIGURACIÓN DEL SISTEMA
    *****************************************************/

    systemName:
        "SPAE",

    version:
        "MVP Operativa 1.0",


    requiredModules = [

    "PersistenceManager",
    "ModuleRouter",
    "WorkflowController",

    "Dashboard",

    "CourseModule",
    "AssessmentModule",
    "QuestionModule",
    "BlueprintModule",
    "ExamModule",
    "Export"

];


    initialized: false,


    /*****************************************************
     INICIALIZACIÓN GENERAL
    *****************************************************/

    init() {

        console.clear();

        console.log(
            "================================="
        );

        console.log(
            `${this.systemName} - ${this.version}`
        );

        console.log(
            "Inicializando sistema..."
        );


        // Verificación de módulos

        if (!this.verifyModules()) {

            this.showStartupError(
                "Existen módulos obligatorios que no fueron cargados."
            );

            return false;

        }


        // Inicializar componentes

        this.initializePersistence();
        this.initializeWorkflow();
        this.initializeRouter();


        // Marcar sistema operativo

        this.initialized = true;


        // Cargar Dashboard

        this.loadDashboard();


        console.log(
            "SPAE inicializado correctamente."
        );

        console.log(
            "================================="
        );


        return true;

    },


    /*****************************************************
     VERIFICACIÓN DE MÓDULOS
    *****************************************************/

    verifyModules() {

        let everythingOK = true;


        this.requiredModules.forEach(

            moduleName => {

                if (!window[moduleName]) {

                    console.error(
                        `Módulo faltante: ${moduleName}`
                    );

                    everythingOK = false;

                }

            }

        );


        return everythingOK;

    },


    /*****************************************************
     PERSISTENCIA
    *****************************************************/

    initializePersistence() {

        if (

            window.PersistenceManager &&
            typeof PersistenceManager.init ===
            "function"

        ) {

            PersistenceManager.init();

        }

    },


    /*****************************************************
     WORKFLOW
    *****************************************************/

    initializeWorkflow() {

        if (

            window.WorkflowController &&
            typeof WorkflowController.init ===
            "function"

        ) {

            WorkflowController.init();

        }

    },


    /*****************************************************
     ROUTER
    *****************************************************/

    initializeRouter() {

        if (

            window.ModuleRouter &&
            typeof ModuleRouter.init ===
            "function"

        ) {

            ModuleRouter.init();

        }

    },


    /*****************************************************
     DASHBOARD INICIAL
    *****************************************************/

    loadDashboard() {

        if (!window.ModuleRouter) {

            return;
        }

        ModuleRouter.navigate(
            "dashboard"
        );

    },


    /*****************************************************
     OBTENER ESTADO DEL SISTEMA
    *****************************************************/

    getSystemStatus() {

        return {

            initialized:
                this.initialized,

            version:
                this.version,

            workflowStep:

                window.WorkflowController ?

                WorkflowController.currentStep :

                "No disponible"

        };

    },


    /*****************************************************
     DIAGNÓSTICO COMPLETO
    *****************************************************/

    diagnostics() {

        console.group(
            "Diagnóstico SPAE"
        );


        console.table(

            this.getSystemStatus()

        );


        if (window.WorkflowController) {

            console.table(

                WorkflowController
                    .getProjectStatus()

            );

        }


        console.groupEnd();

    },


    /*****************************************************
     MENSAJE DE ERROR DE ARRANQUE
    *****************************************************/

    showStartupError(message) {

        console.error(message);


        const workspace =
            document.getElementById(
                "workspace"
            );


        if (!workspace) return;


        workspace.innerHTML = `

        <div class="spae-error">

            <h2>
                Error de inicialización
            </h2>

            <p>

                ${message}

            </p>

            <p>

                Revise que todos los archivos
                JavaScript hayan sido incluidos
                correctamente en index.html.

            </p>

        </div>

        `;

    },


    /*****************************************************
     REINICIAR SISTEMA
    *****************************************************/

    restart() {

        this.initialized = false;

        this.init();

    },


    /*****************************************************
     DEBUG
    *****************************************************/

    debug() {

        console.table(
            this.getSystemStatus()
        );

    }

};



/*********************************************************
 EXPORTACIÓN GLOBAL
*********************************************************/

window.AppController =
    AppController;


/*********************************************************
 ARRANQUE AUTOMÁTICO DEL SISTEMA

 Se ejecuta cuando el DOM está listo.
*********************************************************/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        AppController.init();

    }

);
