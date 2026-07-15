/*********************************************************
 SPAE

 Sistema Profesional de Autoría de Evaluaciones

 Archivo:
 js/workspace-manager.js

 Administrador del área principal de trabajo.

*********************************************************/

const WorkspaceManager = {

    //--------------------------------------------------
    // ESTADO
    //--------------------------------------------------

    workspaceID: "workspace",

    titleID: "workspace-title",

    subtitleID: "workspace-subtitle",

    currentModule: null,



    //--------------------------------------------------
    // INICIALIZACIÓN
    //--------------------------------------------------

    init() {

        console.log(
            "Workspace Manager inicializado."
        );

        this.createWorkspace();

    },



    //--------------------------------------------------
    // CREAR WORKSPACE
    //--------------------------------------------------

    createWorkspace() {

        const workspace = document.getElementById(
            this.workspaceID
        );

        if (!workspace) {

            console.warn(
                "No existe el contenedor #workspace."
            );

        }

    },



    //--------------------------------------------------
    // LIMPIAR WORKSPACE
    //--------------------------------------------------

    clear() {

        const workspace = document.getElementById(
            this.workspaceID
        );

        if (workspace) {

            workspace.innerHTML = "";

        }

    },



    //--------------------------------------------------
    // RENDERIZAR HTML
    //--------------------------------------------------

    render(html) {

        const workspace = document.getElementById(
            this.workspaceID
        );

        if (!workspace) {

            return;

        }

        workspace.innerHTML = html;

    },



    //--------------------------------------------------
    // AGREGAR HTML
    //--------------------------------------------------

    append(html) {

        const workspace = document.getElementById(
            this.workspaceID
        );

        if (!workspace) {

            return;

        }

        workspace.innerHTML += html;

    },



    //--------------------------------------------------
    // DEFINIR TÍTULO
    //--------------------------------------------------

    setTitle(title) {

        const element = document.getElementById(
            this.titleID
        );

        if (element) {

            element.textContent = title;

        }

    },



    //--------------------------------------------------
    // DEFINIR SUBTÍTULO
    //--------------------------------------------------

    setSubtitle(subtitle) {

        const element = document.getElementById(
            this.subtitleID
        );

        if (element) {

            element.textContent = subtitle;

        }

    },



    //--------------------------------------------------
    // DEFINIR MÓDULO ACTIVO
    //--------------------------------------------------

    setCurrentModule(moduleName) {

        this.currentModule = moduleName;

    },



    //--------------------------------------------------
    // OBTENER MÓDULO ACTIVO
    //--------------------------------------------------

    getCurrentModule() {

        return this.currentModule;

    },



    //--------------------------------------------------
    // MENSAJE DEL SISTEMA
    //--------------------------------------------------

    showMessage(message) {

        this.render(`

            <div class="system-message">

                <h3>${message}</h3>

            </div>

        `);

    },



    //--------------------------------------------------
    // CARGANDO
    //--------------------------------------------------

    showLoading(message = "Cargando módulo...") {

        this.render(`

            <div class="loading-screen">

                <h3>${message}</h3>

            </div>

        `);

    },



    //--------------------------------------------------
    // ERROR
    //--------------------------------------------------

    showError(message) {

        this.render(`

            <div class="error-screen">

                <h3>Error</h3>

                <p>${message}</p>

            </div>

        `);

    },



    //--------------------------------------------------
    // PANTALLA VACÍA
    //--------------------------------------------------

    showEmptyState(title, description) {

        this.render(`

            <div class="empty-state">

                <h2>${title}</h2>

                <p>${description}</p>

            </div>

        `);

    },



    //--------------------------------------------------
    // DASHBOARD
    //--------------------------------------------------

    showDashboard() {

        this.setTitle(
            "Dashboard"
        );

        this.setSubtitle(
            "Centro de control académico."
        );

        this.setCurrentModule(
            "dashboard"
        );

    },



    //--------------------------------------------------
    // CURSOS
    //--------------------------------------------------

    showCourseWizard() {

        this.setTitle(
            "Crear Curso"
        );

        this.setSubtitle(
            "Diseño curricular del curso."
        );

        this.setCurrentModule(
            "course"
        );

    },



    //--------------------------------------------------
    // PREGUNTAS
    //--------------------------------------------------

    showQuestionBuilder() {

        this.setTitle(
            "Banco de Preguntas"
        );

        this.setSubtitle(
            "Constructor profesional de ítems."
        );

        this.setCurrentModule(
            "question"
        );

    },



    //--------------------------------------------------
    // BLUEPRINT
    //--------------------------------------------------

    showBlueprintWizard() {

        this.setTitle(
            "Blueprint"
        );

        this.setSubtitle(
            "Diseño pedagógico del examen."
        );

        this.setCurrentModule(
            "blueprint"
        );

    },



    //--------------------------------------------------
    // EXÁMENES
    //--------------------------------------------------

    showExamBuilder() {

        this.setTitle(
            "Construcción del Examen"
        );

        this.setSubtitle(
            "Generación automática del instrumento."
        );

        this.setCurrentModule(
            "exam"
        );

    },



    //--------------------------------------------------
    // REPORTES
    //--------------------------------------------------

    showReports() {

        this.setTitle(
            "Reportes"
        );

        this.setSubtitle(
            "Analítica pedagógica y curricular."
        );

        this.setCurrentModule(
            "reports"
        );

    },



    //--------------------------------------------------
    // CONFIGURACIÓN
    //--------------------------------------------------

    showSettings() {

        this.setTitle(
            "Configuración"
        );

        this.setSubtitle(
            "Parámetros institucionales."
        );

        this.setCurrentModule(
            "settings"
        );

    },



    //--------------------------------------------------
    // MODALES (FUTURO)
    //--------------------------------------------------

    openModal() {

        console.log(
            "Modal disponible para futuras versiones."
        );

    },



    //--------------------------------------------------
    // REFRESCAR
    //--------------------------------------------------

    refresh() {

        console.log(
            "Workspace actualizado."
        );

    },



    //--------------------------------------------------
    // RESET
    //--------------------------------------------------

    reset() {

        this.clear();

        this.currentModule = null;

    },



    //--------------------------------------------------
    // DEBUG
    //--------------------------------------------------

    debug() {

        console.table({

            currentModule:
                this.currentModule,

            workspace:
                this.workspaceID

        });

    }

};



/*********************************************************
 EXPORTACIÓN GLOBAL
*********************************************************/

window.WorkspaceManager = WorkspaceManager;



/*********************************************************
 INICIALIZACIÓN AUTOMÁTICA
*********************************************************/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        WorkspaceManager.init();

    }

);
