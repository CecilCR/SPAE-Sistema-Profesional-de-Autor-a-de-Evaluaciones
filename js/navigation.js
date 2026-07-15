/*********************************************************
 SPAE

 Sistema Profesional de Autoría de Evaluaciones

 Archivo:
 js/navigation.js

 Sistema de navegación principal del SPAE.

*********************************************************/

const Navigation = {

    //--------------------------------------------------
    // ESTADO
    //--------------------------------------------------

    currentModule: "dashboard",

    previousModule: null,

    modules: [

        "dashboard",
        "course",
        "question",
        "blueprint",
        "exam",
        "reports",
        "settings"

    ],



    //--------------------------------------------------
    // INICIALIZACIÓN
    //--------------------------------------------------

    init() {

        console.log(
            "Navigation inicializado."
        );

        this.open("dashboard");

    },



    //--------------------------------------------------
    // ABRIR MÓDULO
    //--------------------------------------------------

    open(moduleName) {

        if (!this.modules.includes(moduleName)) {

            console.error(
                "Módulo no reconocido:",
                moduleName
            );

            return;
        }

        this.previousModule = this.currentModule;
        this.currentModule = moduleName;

        this.hideAllModules();
        this.showModule(moduleName);
        this.executeModule(moduleName);

        this.updateNavigation();
    },



    //--------------------------------------------------
    // MOSTRAR MÓDULO
    //--------------------------------------------------

    showModule(moduleName) {

        const element = document.getElementById(

            `${moduleName}-module`

        );

        if (element) {

            element.style.display = "block";

        }

    },



    //--------------------------------------------------
    // OCULTAR TODOS LOS MÓDULOS
    //--------------------------------------------------

    hideAllModules() {

        this.modules.forEach(module => {

            const element = document.getElementById(
                `${module}-module`
            );

            if (element) {

                element.style.display = "none";

            }

        });

    },



    //--------------------------------------------------
    // EJECUTAR MÓDULO
    //--------------------------------------------------

    executeModule(moduleName) {

        switch (moduleName) {

            case "dashboard":

                DashboardView.refresh();
                break;


            case "course":

                CourseWizard.start();
                break;


            case "question":

                QuestionBuilder.start();
                break;


            case "blueprint":

                BlueprintWizard.start();
                break;


            case "exam":

                ExamBuilder.start();
                break;


            case "reports":

                ReportCenter.generateCompleteReport();
                break;


            case "settings":

                Settings.getAll();
                break;

        }

    },



    //--------------------------------------------------
    // VOLVER AL MÓDULO ANTERIOR
    //--------------------------------------------------

    back() {

        if (this.previousModule) {

            this.open(
                this.previousModule
            );

        }

    },



    //--------------------------------------------------
    // DASHBOARD
    //--------------------------------------------------

    openDashboard() {

        this.open("dashboard");

    },



    //--------------------------------------------------
    // COURSE WIZARD
    //--------------------------------------------------

    openCourseWizard() {

        this.open("course");

    },



    //--------------------------------------------------
    // QUESTION BUILDER
    //--------------------------------------------------

    openQuestionBuilder() {

        this.open("question");

    },



    //--------------------------------------------------
    // BLUEPRINT
    //--------------------------------------------------

    openBlueprintWizard() {

        this.open("blueprint");

    },



    //--------------------------------------------------
    // EXAM BUILDER
    //--------------------------------------------------

    openExamBuilder() {

        this.open("exam");

    },



    //--------------------------------------------------
    // REPORTES
    //--------------------------------------------------

    openReports() {

        this.open("reports");

    },



    //--------------------------------------------------
    // SETTINGS
    //--------------------------------------------------

    openSettings() {

        this.open("settings");

    },



    //--------------------------------------------------
    // REFRESCAR DASHBOARD
    //--------------------------------------------------

    refreshDashboard() {

        if (

            window.DashboardView &&
            DashboardView.refresh

        ) {

            DashboardView.refresh();

        }

    },



    //--------------------------------------------------
    // ACTUALIZAR NAVEGACIÓN VISUAL
    //--------------------------------------------------

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



    //--------------------------------------------------
    // MÓDULO ACTIVO
    //--------------------------------------------------

    getCurrentModule() {

        return this.currentModule;

    },



    //--------------------------------------------------
    // VERIFICAR MÓDULO
    //--------------------------------------------------

    isActive(moduleName) {

        return (

            this.currentModule ===
            moduleName

        );

    },



    //--------------------------------------------------
    // LISTAR MÓDULOS
    //--------------------------------------------------

    getModules() {

        return this.modules;

    },



    //--------------------------------------------------
    // RESET
    //--------------------------------------------------

    reset() {

        this.currentModule = "dashboard";
        this.previousModule = null;

        this.open("dashboard");

    },



    //--------------------------------------------------
    // DEBUG
    //--------------------------------------------------

    debug() {

        console.table({

            currentModule:
                this.currentModule,

            previousModule:
                this.previousModule

        });

    }


};



/*********************************************************
 EXPORTACIÓN GLOBAL
*********************************************************/

window.Navigation = Navigation;



/*********************************************************
 INICIALIZACIÓN AUTOMÁTICA
*********************************************************/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        Navigation.init();

    }

);
