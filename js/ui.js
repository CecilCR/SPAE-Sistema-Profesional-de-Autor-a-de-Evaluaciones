/*********************************************************
 SPAE

 Archivo : js/ui.js
 Versión : 1.0

 Controlador de la interfaz gráfica del sistema.

*********************************************************/


const SPAEUI = {


    //--------------------------------------------------
    // INICIALIZACIÓN
    //--------------------------------------------------

    init() {

        this.initializeSidebar();

        this.initializeViews();

        this.initializeWorkspace();

        this.initializeStatus();

        console.log(
            "UI inicializada correctamente."
        );

    },


    //--------------------------------------------------
    // MENÚ LATERAL
    //--------------------------------------------------

    initializeSidebar() {

        const buttons = document.querySelectorAll(
            ".menu-button"
        );

        buttons.forEach(button => {

            button.addEventListener(

                "click",

                () => {

                    this.setActiveButton(
                        button
                    );

                }

            );

        });

    },


    setActiveButton(activeButton) {

        const buttons = document.querySelectorAll(
            ".menu-button"
        );

        buttons.forEach(button => {

            button.classList.remove(
                "active"
            );

        });

        activeButton.classList.add(
            "active"
        );

    },


    //--------------------------------------------------
    // VISTAS
    //--------------------------------------------------

    initializeViews() {

        this.hideAllViews();

        const dashboard = document.getElementById(
            "view-dashboard"
        );

        if (dashboard) {

            dashboard.classList.remove(
                "hidden-view"
            );

            dashboard.classList.add(
                "active-view"
            );

        }

    },


    showView(viewID) {

        this.hideAllViews();

        const view = document.getElementById(
            viewID
        );

        if (!view) {

            console.warn(
                "Vista inexistente:",
                viewID
            );

            return;

        }

        view.classList.remove(
            "hidden-view"
        );

        view.classList.add(
            "active-view"
        );

    },


    hideAllViews() {

        const views = document.querySelectorAll(
            ".app-view"
        );

        views.forEach(view => {

            view.classList.remove(
                "active-view"
            );

            view.classList.add(
                "hidden-view"
            );

        });

    },


    //--------------------------------------------------
    // WORKSPACE
    //--------------------------------------------------

    initializeWorkspace() {

        const workspace = document.getElementById(
            "workspace"
        );

        if (!workspace) {

            return;

        }

    },


    clearWorkspace() {

        const workspace = document.getElementById(
            "workspace"
        );

        if (workspace) {

            workspace.innerHTML = "";

        }

    },


    setWorkspace(htmlContent) {

        const workspace = document.getElementById(
            "workspace"
        );

        if (!workspace) {

            return;

        }

        workspace.innerHTML = htmlContent;

    },


    //--------------------------------------------------
    // LOADER GENERAL
    //--------------------------------------------------

    showLoader(message = "Cargando...") {

        const overlay = document.getElementById(
            "appOverlay"
        );

        if (!overlay) {

            return;

        }

        const title = overlay.querySelector(
            "h3"
        );

        if (title) {

            title.textContent = message;

        }

        overlay.classList.remove(
            "hidden"
        );

    },


    hideLoader() {

        const overlay = document.getElementById(
            "appOverlay"
        );

        if (overlay) {

            overlay.classList.add(
                "hidden"
            );

        }

    },


    //--------------------------------------------------
    // LOADER SECUNDARIO
    //--------------------------------------------------

    showSecondaryLoader() {

        const loader = document.getElementById(
            "secondaryLoader"
        );

        if (loader) {

            loader.classList.remove(
                "hidden"
            );

        }

    },


    hideSecondaryLoader() {

        const loader = document.getElementById(
            "secondaryLoader"
        );

        if (loader) {

            loader.classList.add(
                "hidden"
            );

        }

    },


    //--------------------------------------------------
    // ESTADOS DEL SISTEMA
    //--------------------------------------------------

    initializeStatus() {

        this.updateApplicationStatus(
            "Operativo"
        );

        this.updateStorageStatus(
            "Disponible"
        );

    },


    updateApplicationStatus(status) {

        const element = document.getElementById(
            "statusApplication"
        );

        if (element) {

            element.textContent = status;

        }

    },


    updateStorageStatus(status) {

        const element = document.getElementById(
            "statusStorage"
        );

        if (element) {

            element.textContent = status;

        }

    },


    updateCourseStatus(courseName) {

        const element = document.getElementById(
            "statusCourse"
        );

        if (element) {

            element.textContent = courseName;

        }

    },


    updateSessionStatus(status) {

        const element = document.getElementById(
            "statusSession"
        );

        if (element) {

            element.textContent = status;

        }

    },


    //--------------------------------------------------
    // EMPTY STATES
    //--------------------------------------------------

    createEmptyState(
        title,
        description
    ) {

        return `

        <div class="empty-card">

            <h2>
                ${title}
            </h2>

            <p>
                ${description}
            </p>

        </div>

        `;

    },


    //--------------------------------------------------
    // LOADING STATE
    //--------------------------------------------------

    createLoadingState(
        message = "Cargando..."
    ) {

        return `

        <div class="loading-state">

            <div class="loader-spinner">

            </div>

            <p>

                ${message}

            </p>

        </div>

        `;

    },


    //--------------------------------------------------
    // ERROR STATE
    //--------------------------------------------------

    createErrorState(
        message = "Se produjo un error."
    ) {

        return `

        <div class="error-state">

            <h3>

                Error

            </h3>

            <p>

                ${message}

            </p>

        </div>

        `;

    },


    //--------------------------------------------------
    // UTILIDADES
    //--------------------------------------------------

    scrollTop() {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    },


    //--------------------------------------------------
    // PANEL DE DEBUG
    //--------------------------------------------------

    log(message) {

        const debugConsole = document.getElementById(
            "debugConsole"
        );

        if (!debugConsole) {

            console.log(message);

            return;

        }

        debugConsole.innerHTML += `

        <div>

            ${message}

        </div>

        `;

    },


    clearLog() {

        const debugConsole = document.getElementById(
            "debugConsole"
        );

        if (debugConsole) {

            debugConsole.innerHTML = "";

        }

    }


};




/*********************************************************
EXPORTACIÓN GLOBAL
*********************************************************/

window.SPAEUI = SPAEUI;




/*********************************************************
INICIALIZACIÓN AUTOMÁTICA
*********************************************************/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        SPAEUI.init();

    }

);
