/*********************************************************
 SPAE

 Sistema Profesional de Autoría de Evaluaciones

 Archivo:
 js/module-renderer.js

 Renderizador centralizado de módulos.

*********************************************************/

const ModuleRenderer = {

    //--------------------------------------------------
    // ESTADO
    //--------------------------------------------------

    currentModule: null,

    moduleTitles: {

        dashboard: "Dashboard",

        course: "Crear Curso",

        question: "Banco de Preguntas",

        blueprint: "Blueprint",

        exam: "Construcción del Examen",

        reports: "Centro de Reportes",

        settings: "Configuración"

    },


    moduleSubtitles: {

        dashboard:
            "Centro de control académico.",

        course:
            "Diseño curricular del curso.",

        question:
            "Constructor profesional de preguntas.",

        blueprint:
            "Diseño pedagógico del examen.",

        exam:
            "Generador automático de instrumentos.",

        reports:
            "Analítica pedagógica y curricular.",

        settings:
            "Configuración institucional del sistema."

    },


    //--------------------------------------------------
    // INICIALIZACIÓN
    //--------------------------------------------------

    init() {

        console.log(
            "Module Renderer inicializado."
        );

    },


    //--------------------------------------------------
    // RENDER PRINCIPAL
    //--------------------------------------------------

    render(moduleName) {

        try {

            WorkspaceManager.showLoading(
                "Cargando módulo..."
            );


            this.currentModule =
                moduleName;


            this.updateHeader(
                moduleName
            );


            switch (moduleName) {

                case "dashboard":

                    this.renderDashboard();
                    break;


                case "course":

                    this.renderCourseWizard();
                    break;


                case "question":

                    this.renderQuestionBuilder();
                    break;


                case "blueprint":

                    this.renderBlueprintWizard();
                    break;


                case "exam":

                    this.renderExamBuilder();
                    break;


                case "reports":

                    this.renderReportCenter();
                    break;


                case "settings":

                    this.renderSettings();
                    break;


                default:

                    this.renderNotFound();

            }

        }

        catch (error) {

            console.error(error);

            WorkspaceManager.showError(

                "No fue posible cargar el módulo."

            );

        }

    },


    //--------------------------------------------------
    // ACTUALIZAR CABECERA
    //--------------------------------------------------

    updateHeader(moduleName) {

        WorkspaceManager.setTitle(

            this.moduleTitles[moduleName]

            ||

            "SPAE"

        );


        WorkspaceManager.setSubtitle(

            this.moduleSubtitles[moduleName]

            ||

            ""

        );

    },


    //--------------------------------------------------
    // DASHBOARD
    //--------------------------------------------------

    renderDashboard() {

        WorkspaceManager.setCurrentModule(
            "dashboard"
        );


        if (window.DashboardView) {

            DashboardView.refresh();

        }


        WorkspaceManager.render(`

            <div class="dashboard-container">

                <h2>Dashboard SPAE</h2>

                <p>
                El Dashboard se encuentra
                operativo.
                </p>

            </div>

        `);

    },


    //--------------------------------------------------
    // COURSE WIZARD
    //--------------------------------------------------

    renderCourseWizard() {

        WorkspaceManager.setCurrentModule(
            "course"
        );


        if (

            window.CourseWizard &&
            CourseWizard.start

        ) {

            CourseWizard.start();

        }


        WorkspaceManager.render(`

            <div class="module-container">

                <h2>Crear Curso</h2>

                <p>
                Course Wizard cargado.
                </p>

            </div>

        `);

    },


    //--------------------------------------------------
    // QUESTION BUILDER
    //--------------------------------------------------

    renderQuestionBuilder() {

        WorkspaceManager.setCurrentModule(
            "question"
        );


        if (

            window.QuestionBuilder &&
            QuestionBuilder.start

        ) {

            QuestionBuilder.start();

        }


        WorkspaceManager.render(`

            <div class="module-container">

                <h2>Banco de Preguntas</h2>

                <p>
                Question Builder cargado.
                </p>

            </div>

        `);

    },


    //--------------------------------------------------
    // BLUEPRINT WIZARD
    //--------------------------------------------------

    renderBlueprintWizard() {

        WorkspaceManager.setCurrentModule(
            "blueprint"
        );


        if (

            window.BlueprintWizard &&
            BlueprintWizard.start

        ) {

            BlueprintWizard.start();

        }


        WorkspaceManager.render(`

            <div class="module-container">

                <h2>Blueprint</h2>

                <p>
                Blueprint Wizard cargado.
                </p>

            </div>

        `);

    },


    //--------------------------------------------------
    // EXAM BUILDER
    //--------------------------------------------------

    renderExamBuilder() {

        WorkspaceManager.setCurrentModule(
            "exam"
        );


        if (

            window.ExamBuilder &&
            ExamBuilder.start

        ) {

            ExamBuilder.start();

        }


        WorkspaceManager.render(`

            <div class="module-container">

                <h2>Construcción del Examen</h2>

                <p>
                Exam Builder cargado.
                </p>

            </div>

        `);

    },


    //--------------------------------------------------
    // REPORT CENTER
    //--------------------------------------------------

    renderReportCenter() {

        WorkspaceManager.setCurrentModule(
            "reports"
        );


        if (

            window.ReportCenter &&
            ReportCenter.generateCompleteReport

        ) {

            ReportCenter.generateCompleteReport();

        }


        WorkspaceManager.render(`

            <div class="module-container">

                <h2>Centro de Reportes</h2>

                <p>
                Report Center cargado.
                </p>

            </div>

        `);

    },


    //--------------------------------------------------
    // SETTINGS
    //--------------------------------------------------

    renderSettings() {

        WorkspaceManager.setCurrentModule(
            "settings"
        );


        if (

            window.Settings &&
            Settings.getAll

        ) {

            Settings.getAll();

        }


        WorkspaceManager.render(`

            <div class="module-container">

                <h2>Configuración</h2>

                <p>
                Settings cargado.
                </p>

            </div>

        `);

    },


    //--------------------------------------------------
    // MÓDULO NO ENCONTRADO
    //--------------------------------------------------

    renderNotFound() {

        WorkspaceManager.showEmptyState(

            "Módulo no encontrado",

            "El módulo solicitado no existe."

        );

    },


    //--------------------------------------------------
    // RECARGAR MÓDULO
    //--------------------------------------------------

    reload() {

        if (this.currentModule) {

            this.render(
                this.currentModule
            );

        }

    },


    //--------------------------------------------------
    // OBTENER MÓDULO ACTIVO
    //--------------------------------------------------

    getCurrentModule() {

        return this.currentModule;

    },


    //--------------------------------------------------
    // VERIFICAR MÓDULO ACTIVO
    //--------------------------------------------------

    isActive(moduleName) {

        return (

            this.currentModule ===
            moduleName

        );

    },


    //--------------------------------------------------
    // LIMPIAR
    //--------------------------------------------------

    clear() {

        this.currentModule = null;

        WorkspaceManager.clear();

    },


    //--------------------------------------------------
    // RESET
    //--------------------------------------------------

    reset() {

        this.currentModule = null;

        WorkspaceManager.reset();

    },


    //--------------------------------------------------
    // DEBUG
    //--------------------------------------------------

    debug() {

        console.table({

            currentModule:
                this.currentModule

        });

    }

};


/*********************************************************
 EXPORTACIÓN GLOBAL
*********************************************************/

window.ModuleRenderer = ModuleRenderer;


/*********************************************************
 INICIALIZACIÓN AUTOMÁTICA
*********************************************************/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        ModuleRenderer.init();

    }

);
