/*********************************************************
 SPAE
 Sistema Profesional de Autoría de Evaluaciones

 Archivo : js/router.js
 Versión : 1.0

 Administrador de navegación interna del sistema.

*********************************************************/


const Router = {

    //--------------------------------------------------
    // CONFIGURACIÓN
    //--------------------------------------------------

    currentView: "dashboard",

    routes: {

        dashboard: "view-dashboard",
        courses: "view-courses",
        questionBank: "view-question-bank",
        examBuilder: "view-exam-builder",
        reports: "view-reports",
        settings: "view-settings"

    },


    //--------------------------------------------------
    // INICIALIZACIÓN
    //--------------------------------------------------

    init() {

        this.bindNavigation();

        console.log(
            "Router inicializado."
        );

    },


    //--------------------------------------------------
    // EVENTOS DE NAVEGACIÓN
    //--------------------------------------------------

    bindNavigation() {

        const elements = document.querySelectorAll(

            "[data-route]"

        );

        elements.forEach(element => {

            element.addEventListener(

                "click",

                () => {

                    const route = element.dataset.route;

                    this.navigate(route);

                }

            );

        });

    },


    //--------------------------------------------------
    // NAVEGAR
    //--------------------------------------------------

    navigate(route) {

        if (!this.routeExists(route)) {

            console.warn(

                "Ruta no registrada:",
                route

            );

            return;

        }

        this.currentView = route;

        this.loadView(route);

        this.updateMenu(route);

        this.updateTitle(route);

    },


    //--------------------------------------------------
    // CARGAR VISTA
    //--------------------------------------------------

    loadView(route) {

        const viewID = this.routes[route];

        if (

            window.SPAEUI &&
            SPAEUI.showView

        ) {

            SPAEUI.showView(viewID);

        }

    },


    //--------------------------------------------------
    // ACTUALIZAR MENÚ
    //--------------------------------------------------

    updateMenu(route) {

        const buttons = document.querySelectorAll(

            "[data-route]"

        );


        buttons.forEach(button => {

            button.classList.remove(
                "active"
            );

        });


        const activeButton = document.querySelector(

            `[data-route="${route}"]`

        );

        if (activeButton) {

            activeButton.classList.add(
                "active"
            );

        }

    },


    //--------------------------------------------------
    // ACTUALIZAR TÍTULO DE LA PÁGINA
    //--------------------------------------------------

    updateTitle(route) {

        const titles = {

            dashboard: "Dashboard",
            courses: "Cursos",
            questionBank: "Banco de Preguntas",
            examBuilder: "Constructor de Exámenes",
            reports: "Reportes Pedagógicos",
            settings: "Configuración"

        };


        const pageTitle = document.getElementById(
            "page-title"
        );

        if (pageTitle) {

            pageTitle.textContent =
                titles[route] || "SPAE";

        }

    },


    //--------------------------------------------------
    // VERIFICAR RUTA
    //--------------------------------------------------

    routeExists(route) {

        return this.routes.hasOwnProperty(
            route
        );

    },


    //--------------------------------------------------
    // REGISTRAR NUEVA RUTA
    //--------------------------------------------------

    registerRoute(route, viewID) {

        this.routes[route] = viewID;

    },


    //--------------------------------------------------
    // ELIMINAR RUTA
    //--------------------------------------------------

    removeRoute(route) {

        delete this.routes[route];

    },


    //--------------------------------------------------
    // OBTENER RUTA ACTUAL
    //--------------------------------------------------

    getCurrentRoute() {

        return this.currentView;

    },


    //--------------------------------------------------
    // RECARGAR VISTA ACTUAL
    //--------------------------------------------------

    refresh() {

        this.navigate(
            this.currentView
        );

    },


    //--------------------------------------------------
    // NAVEGAR AL DASHBOARD
    //--------------------------------------------------

    goHome() {

        this.navigate(
            "dashboard"
        );

    },


    //--------------------------------------------------
    // UTILIDADES
    //--------------------------------------------------

    listRoutes() {

        return this.routes;

    },


    //--------------------------------------------------
    // DEBUG
    //--------------------------------------------------

    debug() {

        console.table(
            this.routes
        );

        console.log(
            "Vista actual:",
            this.currentView
        );

    }

};



/*********************************************************
EXPORTACIÓN GLOBAL
*********************************************************/

window.Router = Router;



/*********************************************************
INICIALIZACIÓN AUTOMÁTICA
*********************************************************/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        Router.init();

    }

);
