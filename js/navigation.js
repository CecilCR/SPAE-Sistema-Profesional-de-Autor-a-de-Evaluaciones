/*********************************************************
 SPAE

 Sistema Profesional de Autoría de Evaluaciones

 Archivo:
 js/navigation.js

 VERSIÓN MVP 2.0

 RESPONSABILIDAD ÚNICA:

 - Gestionar la navegación del sistema.
 - Mantener el estado del módulo activo.
 - Actualizar la navegación visual.
 - Solicitar al ModuleRenderer renderizar el módulo.

 NO HACE:

 - Inicialización automática.
 - Renderizado de módulos.
 - Gestión del workspace.
 - Gestión de vistas.
 - Ejecución de módulos.
 - Manipulación directa del DOM del workspace.

*********************************************************/


const Navigation = {


    /*****************************************************
     ESTADO DEL SISTEMA
    *****************************************************/

    currentModule: "dashboard",

    previousModule: null,



    /*****************************************************
     MÓDULOS DISPONIBLES DEL MVP
    *****************************************************/

    modules: [

        "dashboard",
        "course",
        "assessment",
        "question",
        "blueprint",
        "exam",
        "export",
        "reports",
        "settings"

    ],



    /*****************************************************
     INICIALIZACIÓN
    *****************************************************/

    init() {

        console.log(

            "Navigation MVP inicializado."

        );

    },



    /*****************************************************
     ABRIR MÓDULO
    *****************************************************/

    open(moduleName) {

        if (!this.modules.includes(moduleName)) {

            console.error(

                `Módulo no registrado: ${moduleName}`

            );

            return;

        }


        this.previousModule = this.currentModule;

        this.currentModule = moduleName;



        console.log(

            `Abriendo módulo: ${moduleName}`

        );



        /*
        ----------------------------------------------
        Actualizar menú visual.
        ----------------------------------------------
        */

        this.updateNavigation();



        /*
        ----------------------------------------------
        Delegar renderizado.
        ----------------------------------------------
        */

        if (

            window.ModuleRenderer &&
            typeof ModuleRenderer.render === "function"

        ) {

            ModuleRenderer.render(

                moduleName

            );

        }


    },



    /*****************************************************
     VOLVER AL MÓDULO ANTERIOR
    *****************************************************/

    back() {

        if (this.previousModule) {

            this.open(

                this.previousModule

            );

        }

    },



    /*****************************************************
     ACTUALIZAR MENÚ VISUAL
    *****************************************************/

    updateNavigation() {


        const buttons = document.querySelectorAll(

            ".nav-button"

        );


        buttons.forEach(button => {

            button.classList.remove(

                "active"

            );

        });



        const activeButton = document.getElementById(

            `btn-${this.currentModule}`

        );


        if (activeButton) {

            activeButton.classList.add(

                "active"

            );

        }


    },



    /*****************************************************
     OBTENER MÓDULO ACTUAL
    *****************************************************/

    getCurrentModule() {

        return this.currentModule;

    },



    /*****************************************************
     OBTENER MÓDULO ANTERIOR
    *****************************************************/

    getPreviousModule() {

        return this.previousModule;

    },



    /*****************************************************
     LISTAR MÓDULOS DISPONIBLES
    *****************************************************/

    getModules() {

        return this.modules;

    },



    /*****************************************************
     VERIFICAR SI EL MÓDULO ESTÁ ACTIVO
    *****************************************************/

    isActive(moduleName) {

        return (

            this.currentModule === moduleName

        );

    },



    /*****************************************************
     REINICIAR NAVEGACIÓN
    *****************************************************/

    reset() {

        this.currentModule = "dashboard";

        this.previousModule = null;


        this.updateNavigation();


        console.log(

            "Navigation reiniciado."

        );

    },



    /*****************************************************
     DEPURACIÓN
    *****************************************************/

    debug() {

        console.table({

            moduloActual:

                this.currentModule,

            moduloAnterior:

                this.previousModule,

            totalModulos:

                this.modules.length

        });

    }


};



/*********************************************************
 EXPORTACIÓN GLOBAL
*********************************************************/

window.Navigation = Navigation;
