/*********************************************************
 SPAE

 Sistema Profesional de Autoría de Evaluaciones

 Archivo:
 js/module-renderer.js

 VERSIÓN MVP 2.0

 RESPONSABILIDAD ÚNICA:

 - Renderizar el módulo solicitado.
 - Actualizar el título del workspace.
 - Actualizar el subtítulo.
 - Insertar el contenido HTML del módulo.

 NO HACE:

 - Navegación.
 - Inicialización del sistema.
 - Gestión de estados.
 - Guardado.
 - Lógica pedagógica.

*********************************************************/


const ModuleRenderer = {


    /*****************************************************
     CONFIGURACIÓN DE LOS MÓDULOS
    *****************************************************/

    modules: {


        dashboard: {

            title:

                "Dashboard",

            subtitle:

                "Bienvenido al SPAE.",

            object:

                "DashboardModule"

        },


        course: {

            title:

                "Crear Curso",

            subtitle:

                "Configure la información general del curso.",

            object:

                "CourseModule"

        },


        assessment: {

            title:

                "Configurar Evaluación",

            subtitle:

                "Configure el instrumento evaluativo.",

            object:

                "AssessmentModule"

        },


        question: {

            title:

                "Banco de Preguntas",

            subtitle:

                "Diseñe las preguntas del instrumento.",

            object:

                "QuestionModule"

        },


        blueprint: {

            title:

                "Blueprint",

            subtitle:

                "Organice la estructura del examen.",

            object:

                "BlueprintModule"

        },


        exam: {

            title:

                "Generador de Examen",

            subtitle:

                "Construya el examen completo.",

            object:

                "ExamModule"

        },


        export: {

            title:

                "Exportación",

            subtitle:

                "Exporte el instrumento evaluativo.",

            object:

                "ExportModule"

        },


        reports: {

            title:

                "Reportes",

            subtitle:

                "Visualice la información del proyecto.",

            object:

                "ReportModule"

        },


        settings: {

            title:

                "Configuración",

            subtitle:

                "Personalice el sistema.",

            object:

                "SettingsModule"

        }


    },



    /*****************************************************
     INICIALIZACIÓN
    *****************************************************/

    init() {

        console.log(

            "ModuleRenderer MVP inicializado."

        );

    },



    /*****************************************************
     RENDERIZAR MÓDULO
    *****************************************************/

    render(moduleName) {


        const moduleConfig =

            this.modules[moduleName];


        if (!moduleConfig) {

            console.error(

                `No existe configuración para: ${moduleName}`

            );

            return;

        }


        /*
        ----------------------------------------------
        Actualizar encabezados.
        ----------------------------------------------
        */

        this.updateWorkspaceHeader(

            moduleConfig.title,
            moduleConfig.subtitle

        );


        /*
        ----------------------------------------------
        Obtener módulo.
        ----------------------------------------------
        */

        const moduleObject =

            window[moduleConfig.object];


        /*
        ----------------------------------------------
        Si no existe el módulo.
        ----------------------------------------------
        */

        if (!moduleObject) {

            this.showModuleUnavailable(

                moduleName

            );

            return;

        }


        /*
        ----------------------------------------------
        Prioridad 1

        render()
        ----------------------------------------------
        */

        if (

            typeof moduleObject.render ===
            "function"

        ) {

            moduleObject.render();

            return;

        }


        /*
        ----------------------------------------------
        Prioridad 2

        init()
        ----------------------------------------------
        */

        if (

            typeof moduleObject.init ===
            "function"

        ) {

            moduleObject.init();

            return;

        }


        /*
        ----------------------------------------------
        Prioridad 3

        start()
        ----------------------------------------------
        */

        if (

            typeof moduleObject.start ===
            "function"

        ) {

            moduleObject.start();

            return;

        }


        /*
        ----------------------------------------------
        Error.
        ----------------------------------------------
        */

        this.showModuleUnavailable(

            moduleName

        );

    },



    /*****************************************************
     ACTUALIZAR ENCABEZADOS
    *****************************************************/

    updateWorkspaceHeader(

        title,
        subtitle

    ) {

        const workspaceTitle =

            document.getElementById(

                "workspace-title"

            );


        const workspaceSubtitle =

            document.getElementById(

                "workspace-subtitle"

            );


        if (workspaceTitle) {

            workspaceTitle.textContent = title;

        }


        if (workspaceSubtitle) {

            workspaceSubtitle.textContent = subtitle;

        }

    },



    /*****************************************************
     MÓDULO NO DISPONIBLE
    *****************************************************/

    showModuleUnavailable(

        moduleName

    ) {

        const workspace =

            document.getElementById(

                "workspace"

            );


        if (!workspace) {

            return;

        }


        workspace.innerHTML = `

            <div class="empty-state">

                <h2>

                    Módulo no disponible

                </h2>

                <p>

                    El módulo "${moduleName}"
                    aún no se encuentra operativo.

                </p>

            </div>

        `;


        console.warn(

            `El módulo "${moduleName}" no está operativo.`

        );

    },



    /*****************************************************
     OBTENER CONFIGURACIÓN
    *****************************************************/

    getModule(moduleName) {

        return this.modules[moduleName];

    },



    /*****************************************************
     LISTAR MÓDULOS
    *****************************************************/

    getModules() {

        return Object.keys(

            this.modules

        );

    },



    /*****************************************************
     DEPURACIÓN
    *****************************************************/

    debug() {

        console.table(

            this.modules

        );

    }


};



/*********************************************************
 EXPORTACIÓN GLOBAL
*********************************************************/

window.ModuleRenderer = ModuleRenderer;
