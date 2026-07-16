/*********************************************************
 SPAE

 Sistema Profesional de Autoría de Evaluaciones

 Archivo:
 js/module-router.js

 Router oficial del sistema.

*********************************************************/

const ModuleRouter = {

    /*****************************************************
     REGISTRO DE MÓDULOS
    *****************************************************/

    modules: {

        dashboard: "DashboardView",

        course: "CourseModule",

        assessment: "AssessmentModule",

        questions: "QuestionModule",

        blueprint: "BlueprintModule",

        exam: "ExamModule",

        export: "ExportModule",

        settings: "SettingsModule",

        reports: "ReportCenter"

    },


    currentModule: null,


    /*****************************************************
     INICIALIZACIÓN
    *****************************************************/

    init() {

        console.log(
            "ModuleRouter inicializado."
        );

    },


    /*****************************************************
     NAVEGACIÓN PRINCIPAL
    *****************************************************/

    navigate(moduleName) {

        if (!this.moduleExists(moduleName)) {

            this.showError(

                `El módulo '${moduleName}' no existe.`

            );

            return false;

        }


        this.currentModule =
            moduleName;


        this.renderModule(
            moduleName
        );


        return true;

    },


    /*****************************************************
     VALIDAR MÓDULO
    *****************************************************/

    moduleExists(moduleName) {

        return !!this.modules[moduleName];

    },


    /*****************************************************
     OBTENER EL MÓDULO
    *****************************************************/

    getModule(moduleName) {

        const globalName =
            this.modules[moduleName];

        return window[globalName];

    },


    /*****************************************************
     RENDERIZAR MÓDULO
    *****************************************************/

    renderModule(moduleName) {

        const module =
            this.getModule(moduleName);


        if (!module) {

            this.showError(

                `No fue posible cargar el módulo '${moduleName}'.`

            );

            return;

        }


        if (

            typeof module.render !==
            "function"

        ) {

            this.showError(

                `El módulo '${moduleName}' no posee el método render().`

            );

            return;

        }


        try {

            module.render();

        }

        catch (error) {

            console.error(error);

            this.showError(

                `Se produjo un error al renderizar '${moduleName}'.`

            );

        }

    },


    /*****************************************************
     LISTAR MÓDULOS
    *****************************************************/

    getRegisteredModules() {

        return Object.keys(
            this.modules
        );

    },


    /*****************************************************
     MOSTRAR ERRORES
    *****************************************************/

    showError(message) {

        console.error(message);


        const workspace =
            document.getElementById(
                "workspace"
            );


        if (!workspace) return;


        workspace.innerHTML = `

            <div class="spae-error">

                <h2>
                    Error del sistema
                </h2>

                <p>
                    ${message}
                </p>

            </div>

        `;

    },


    /*****************************************************
     DEBUG
    *****************************************************/

    debug() {

        console.table(
            this.modules
        );

        console.log(
            "Módulo actual:",
            this.currentModule
        );

    }

};



/*********************************************************
 EXPORTACIÓN GLOBAL
*********************************************************/

window.ModuleRouter =
    ModuleRouter;
