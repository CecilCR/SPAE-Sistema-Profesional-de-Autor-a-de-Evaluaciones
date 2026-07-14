/*==========================================================
 SPAE
 Sistema Profesional de Autoría de Evaluaciones

 js/notifications.js
 Release 1.0
==========================================================*/

const SPAENotifications = (() => {

"use strict";

/*==========================================================
 CONFIGURACIÓN
==========================================================*/

const CONFIG = {

    duration: 4000,

    position: "top-right",

    maxVisible: 5

};

/*==========================================================
 ESTADO
==========================================================*/

const state = {

    container: null,

    queue: []

};

/*==========================================================
 INICIALIZACIÓN
==========================================================*/

function init() {

    createContainer();

}

/*==========================================================
 CONTENEDOR
==========================================================*/

function createContainer() {

    if (

        document.getElementById(

            "spae-notifications"

        )

    ) {

        state.container =

            document.getElementById(

                "spae-notifications"

            );

        return;

    }

    state.container =

        document.createElement("div");

    state.container.id =

        "spae-notifications";

    state.container.className =

        `spae-notifications ${CONFIG.position}`;

    document.body.appendChild(

        state.container

    );

}

/*==========================================================
 CREAR TOAST
==========================================================*/

function create(message, type) {

    if (

        state.queue.length >=

        CONFIG.maxVisible

    ) {

        remove(

            state.queue[0]

        );

    }

    const toast =

        document.createElement("div");

    toast.className =

        `spae-toast ${type}`;

    toast.innerHTML = `

        <div class="toast-icon">

            ${icon(type)}

        </div>

        <div class="toast-content">

            ${escape(message)}

        </div>

        <button
            class="toast-close">

            ×

        </button>

    `;

    toast

        .querySelector(

            ".toast-close"

        )

        .addEventListener(

            "click",

            () => remove(toast)

        );

    state.container.appendChild(

        toast

    );

    state.queue.push(toast);

    requestAnimationFrame(() => {

        toast.classList.add(

            "show"

        );

    });

    setTimeout(

        () => remove(toast),

        CONFIG.duration

    );

}

/*==========================================================
 ELIMINAR
==========================================================*/

function remove(toast) {

    if (!toast) return;

    toast.classList.remove(

        "show"

    );

    toast.classList.add(

        "hide"

    );

    setTimeout(() => {

        toast.remove();

        state.queue =

            state.queue.filter(

                item => item !== toast

            );

    }, 300);

}

/*==========================================================
 ICONOS
==========================================================*/

function icon(type) {

    switch(type){

        case "success":

            return "✓";

        case "warning":

            return "⚠";

        case "error":

            return "✖";

        default:

            return "ℹ";

    }

}

/*==========================================================
 UTILIDAD
==========================================================*/

function escape(text=""){

    return String(text)

        .replaceAll("&","&amp;")

        .replaceAll("<","&lt;")

        .replaceAll(">","&gt;")

        .replaceAll('"',"&quot;")

        .replaceAll("'","&#39;");

}

/*==========================================================
 MÉTODOS PÚBLICOS
==========================================================*/

function success(message){

    create(

        message,

        "success"

    );

}

function info(message){

    create(

        message,

        "info"

    );

}

function warning(message){

    create(

        message,

        "warning"

    );

}

function error(message){

    create(

        message,

        "error"

    );

}

/*==========================================================
 LIMPIAR
==========================================================*/

function clear(){

    state.queue.forEach(

        toast => toast.remove()

    );

    state.queue=[];

}

/*==========================================================
 API
==========================================================*/

return{

    init,

    success,

    info,

    warning,

    error,

    clear

};

})();

/*==========================================================
 INICIALIZACIÓN
==========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        SPAENotifications.init();

    }

);
