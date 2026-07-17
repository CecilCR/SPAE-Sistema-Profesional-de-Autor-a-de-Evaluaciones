/*********************************************************
 SPAE

 Sistema Profesional de Autoría de Evaluaciones

 Archivo:
 js/app.js

 VERSIÓN MVP 2.0

 RESPONSABILIDAD:

 - Inicializar el sistema.
 - Inicializar los componentes del núcleo.
 - Abrir el Dashboard.
 - Gestionar el arranque del SPAE.

*********************************************************/


const App = {


    /*****************************************************
     CONFIGURACIÓN DEL MVP
    *****************************************************/

    version: "MVP Operativa 2.0",



    /*****************************************************
     INICIALIZAR SISTEMA
    *****************************************************/

    init() {

        console.log("======================================");
        console.log("SPAE - Sistema Profesional de Autoría");
        console.log("Versión:", this.version);
        console.log("======================================");


        this.initializeCore();

        this.initializeDashboard();

        this.updateSystemStatus();


        console.log(
            "SPAE iniciado correctamente."
        );

    },



    /*****************************************************
     INICIALIZAR NÚCLEO DEL SISTEMA
    *****************************************************/

    initializeCore() {


        if (window.Navigation) {

            Navigation.init();

        }


        if (window.ModuleRenderer) {

            ModuleRenderer.init();

        }


        if (window.WorkspaceManager) {

            WorkspaceManager.init();

        }


    },



    /*****************************************************
     CARGAR DASHBOARD
    *****************************************************/

    initializeDashboard() {

        Navigation.open("dashboard");

    },



    /*****************************************************
     ACTUALIZAR ESTADO DEL SISTEMA
    *****************************************************/

    updateSystemStatus() {

        WorkspaceManager.updateProjectStatus(

            "Proyecto listo para comenzar."

        );


        WorkspaceManager.updateCourseName(

            "Ningún curso creado."

        );


        WorkspaceManager.updateQuestionCounter(

            0

        );


        WorkspaceManager.updateBlueprintStatus(

            "Pendiente."

        );


        WorkspaceManager.updateExamStatus(

            "No generado."

        );

    },



    /*****************************************************
     REINICIAR SISTEMA
    *****************************************************/

    reset() {

        Navigation.reset();

        this.updateSystemStatus();

    },



    /*****************************************************
     INFORMACIÓN DEL SISTEMA
    *****************************************************/

    getVersion() {

        return this.version;

    },



    /*****************************************************
     DEBUG
    *****************************************************/

    debug() {

        console.table({

            version: this.version,

            currentModule:

                Navigation.getCurrentModule(),

            availableModules:

                Navigation.getModules().length

        });

    }


};



/*********************************************************
 EXPORTACIÓN GLOBAL
*********************************************************/

window.App = App;



/*********************************************************
 PUNTO ÚNICO DE INICIALIZACIÓN DEL SISTEMA
*********************************************************/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        App.init();

    }

);
