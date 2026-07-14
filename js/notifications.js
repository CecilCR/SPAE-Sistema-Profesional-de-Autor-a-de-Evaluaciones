/*********************************************************
 SPAE
 Sistema Profesional de Autoría de Evaluaciones

 Archivo : js/notifications.js
 Versión : 1.0

 Sistema centralizado de notificaciones.

*********************************************************/


const Notifications = {


    //--------------------------------------------------
    // CONFIGURACIÓN
    //--------------------------------------------------

    DEFAULT_DURATION: 5000,

    CONTAINER_ID: "spae-notifications",


    //--------------------------------------------------
    // INICIALIZACIÓN
    //--------------------------------------------------

    init() {

        this.verifyContainer();

        console.log(
            "Notifications inicializado."
        );

    },


    //--------------------------------------------------
    // VERIFICAR CONTENEDOR
    //--------------------------------------------------

    verifyContainer() {

        let container = document.getElementById(
            this.CONTAINER_ID
        );

        if (!container) {

            container = document.createElement(
                "div"
            );

            container.id = this.CONTAINER_ID;

            container.className =
                "spae-notifications";

            document.body.appendChild(
                container
            );

        }

    },


    //--------------------------------------------------
    // MÉTODO PRINCIPAL
    //--------------------------------------------------

    show(

        type = "info",
        message = "",
        title = "",
        duration = this.DEFAULT_DURATION

    ) {

        const notification = this.createNotification(

            type,
            title,
            message,
            duration

        );

        this.renderNotification(
            notification
        );

    },


    //--------------------------------------------------
    // CREAR NOTIFICACIÓN
    //--------------------------------------------------

    createNotification(

        type,
        title,
        message,
        duration

    ) {

        const wrapper = document.createElement(
            "div"
        );

        wrapper.className =

            `notification notification-${type}`;


        wrapper.innerHTML = `

            <div class="notification-icon">

                ${this.getIcon(type)}

            </div>

            <div class="notification-content">

                <div class="notification-title">

                    ${title || this.getDefaultTitle(type)}

                </div>

                <div class="notification-message">

                    ${message}

                </div>

            </div>

            <button
                class="notification-close">

                ×

            </button>

            <div class="notification-progress">

                <div class="notification-progress-bar">

                </div>

            </div>

        `;


        wrapper.dataset.duration = duration;

        return wrapper;

    },


    //--------------------------------------------------
    // RENDERIZAR
    //--------------------------------------------------

    renderNotification(notification) {

        const container = document.getElementById(

            this.CONTAINER_ID

        );

        container.prepend(
            notification
        );

        this.bindCloseButton(
            notification
        );

        this.scheduleRemoval(
            notification
        );

    },


    //--------------------------------------------------
    // BOTÓN CERRAR
    //--------------------------------------------------

    bindCloseButton(notification) {

        const button = notification.querySelector(

            ".notification-close"

        );

        button.addEventListener(

            "click",

            () => {

                this.removeNotification(
                    notification
                );

            }

        );

    },


    //--------------------------------------------------
    // ELIMINAR AUTOMÁTICAMENTE
    //--------------------------------------------------

    scheduleRemoval(notification) {

        const duration = parseInt(

            notification.dataset.duration

        );

        setTimeout(() => {

            this.removeNotification(
                notification
            );

        }, duration);

    },


    //--------------------------------------------------
    // ELIMINAR
    //--------------------------------------------------

    removeNotification(notification) {

        if (!notification) {

            return;

        }

        notification.classList.add(
            "notification-hide"
        );

        setTimeout(() => {

            notification.remove();

        }, 250);

    },


    //--------------------------------------------------
    // ICONOS
    //--------------------------------------------------

    getIcon(type) {

        switch(type){

            case "success":
                return "✓";

            case "warning":
                return "⚠";

            case "danger":
                return "✖";

            case "info":
                return "ℹ";

            case "loading":
                return `
                <div class="notification-spinner"></div>
                `;

            default:
                return "ℹ";

        }

    },


    //--------------------------------------------------
    // TÍTULOS POR DEFECTO
    //--------------------------------------------------

    getDefaultTitle(type) {

        switch(type){

            case "success":
                return "Operación exitosa";

            case "warning":
                return "Advertencia";

            case "danger":
                return "Error";

            case "info":
                return "Información";

            case "loading":
                return "Procesando";

            default:
                return "SPAE";

        }

    },


    //--------------------------------------------------
    // MÉTODOS RÁPIDOS
    //--------------------------------------------------

    success(message, duration = 4000) {

        this.show(

            "success",
            message,
            "",
            duration

        );

    },


    warning(message, duration = 5000) {

        this.show(

            "warning",
            message,
            "",
            duration

        );

    },


    danger(message, duration = 6000) {

        this.show(

            "danger",
            message,
            "",
            duration

        );

    },


    info(message, duration = 4000) {

        this.show(

            "info",
            message,
            "",
            duration

        );

    },


    loading(message) {

        this.show(

            "loading",
            message,
            "Procesando...",
            10000

        );

    },


    //--------------------------------------------------
    // LIMPIAR TODAS
    //--------------------------------------------------

    clear() {

        const container = document.getElementById(

            this.CONTAINER_ID

        );

        if (!container) {

            return;

        }

        container.innerHTML = "";

    },


    //--------------------------------------------------
    // DEBUG
    //--------------------------------------------------

    debug(message) {

        this.info(
            message
        );

    }


};



/*********************************************************
EXPORTACIÓN GLOBAL
*********************************************************/

window.Notifications = Notifications;



/*********************************************************
INICIALIZACIÓN AUTOMÁTICA
*********************************************************/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        Notifications.init();

    }

);
