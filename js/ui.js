/*==========================================================
 SPAE
 Sistema Profesional de Autoría de Evaluaciones

 ui.js
 Release 1.0

 Framework interno de interfaz.

 Este módulo concentra toda la interacción visual
 del sistema.

 Ningún otro módulo deberá manipular directamente
 el DOM.

==========================================================*/

const SPAEUI = (() => {

"use strict";

/*==========================================================
CONFIGURACIÓN
==========================================================*/

const CONFIG={

appName:"SPAE",

version:"1.0.0",

animation:true,

toastDuration:3500,

loaderDelay:300,

defaultView:"dashboard"

};

/*==========================================================
ESTADO INTERNO
==========================================================*/

const state={

initialized:false,

currentView:null,

loading:false,

modal:null,

toastQueue:[],

listeners:{}

};

/*==========================================================
CACHE DOM
==========================================================*/

const dom={

body:null,

main:null,

sidebar:null,

header:null,

footer:null,

toast:null,

loader:null,

modal:null

};

/*==========================================================
INICIALIZACIÓN
==========================================================*/

function init(){

if(state.initialized){

return;

}

cacheDOM();

bindGlobalEvents();

state.initialized=true;

console.info(

`${CONFIG.appName} UI ${CONFIG.version}`

);

}

/*==========================================================
CACHE
==========================================================*/

function cacheDOM(){

dom.body=document.body;

dom.main=document.querySelector("#app");

dom.header=document.querySelector("#header");

dom.sidebar=document.querySelector("#sidebar");

dom.footer=document.querySelector("#footer");

}

/*==========================================================
SELECTORES
==========================================================*/

function $(selector,parent=document){

return parent.querySelector(selector);

}

function $$(selector,parent=document){

return [...parent.querySelectorAll(selector)];

}

/*==========================================================
CREAR
==========================================================*/

function create(tag,options={}){

const el=document.createElement(tag);

if(options.id){

el.id=options.id;

}

if(options.className){

el.className=options.className;

}

if(options.text){

el.textContent=options.text;

}

if(options.html){

el.innerHTML=options.html;

}

if(options.dataset){

Object.keys(options.dataset)

.forEach(key=>{

el.dataset[key]=options.dataset[key];

});

}

if(options.attributes){

Object.keys(options.attributes)

.forEach(attr=>{

el.setAttribute(

attr,

options.attributes[attr]

);

});

}

return el;

}

/*==========================================================
LIMPIAR
==========================================================*/

function clear(element){

if(!element)return;

element.innerHTML="";

}

/*==========================================================
RENDER
==========================================================*/

function render(target,content){

if(typeof target==="string"){

target=$(target);

}

if(!target)return;

if(typeof content==="string"){

target.innerHTML=content;

return;

}

clear(target);

target.appendChild(content);

}

/*==========================================================
APPEND
==========================================================*/

function append(target,node){

if(typeof target==="string"){

target=$(target);

}

if(target){

target.appendChild(node);

}

}

/*==========================================================
REMOVE
==========================================================*/

function remove(node){

if(node && node.parentNode){

node.parentNode.removeChild(node);

}

}

/*==========================================================
SHOW
==========================================================*/

function show(element){

if(typeof element==="string"){

element=$(element);

}

if(element){

element.hidden=false;

element.style.display="";

}

}

/*==========================================================
HIDE
==========================================================*/

function hide(element){

if(typeof element==="string"){

element=$(element);

}

if(element){

element.hidden=true;

element.style.display="none";

}

}

/*==========================================================
CLASS
==========================================================*/

function addClass(element,className){

if(typeof element==="string"){

element=$(element);

}

element?.classList.add(className);

}

function removeClass(element,className){

if(typeof element==="string"){

element=$(element);

}

element?.classList.remove(className);

}

function toggleClass(element,className){

if(typeof element==="string"){

element=$(element);

}

element?.classList.toggle(className);

}

function hasClass(element,className){

if(typeof element==="string"){

element=$(element);

}

return element?.classList.contains(className);

}

/*==========================================================
ATRIBUTOS
==========================================================*/

function attr(element,name,value){

if(typeof element==="string"){

element=$(element);

}

if(value===undefined){

return element?.getAttribute(name);

}

element?.setAttribute(name,value);

}

/*==========================================================
DATASET
==========================================================*/

function data(element,key,value){

if(typeof element==="string"){

element=$(element);

}

if(value===undefined){

return element?.dataset[key];

}

element.dataset[key]=value;

}

/*==========================================================
EVENTOS
==========================================================*/

function on(event,handler){

if(!state.listeners[event]){

state.listeners[event]=[];

}

state.listeners[event].push(handler);

}

function emit(event,payload){

if(!state.listeners[event]){

return;

}

state.listeners[event]

.forEach(listener=>listener(payload));

}

/*==========================================================
EVENTOS GLOBALES
==========================================================*/

function bindGlobalEvents(){

window.addEventListener(

"resize",

()=>emit("resize")

);

document.addEventListener(

"keydown",

e=>emit("keydown",e)

);

}

/*==========================================================
VISTA
==========================================================*/

function setView(name){

state.currentView=name;

emit("viewchange",name);

}

function getView(){

return state.currentView;

}
  /*==========================================================
 TOAST MANAGER
==========================================================*/

function ensureToastContainer() {

    if (dom.toast) {
        return dom.toast;
    }

    let container = $("#spae-toast-container");

    if (!container) {

        container = create("div", {
            id: "spae-toast-container",
            className: "spae-toast-container"
        });

        document.body.appendChild(container);

    }

    dom.toast = container;

    return container;

}

/*==========================================================
 TOAST
==========================================================*/

function toast(options = {}) {

    const config = {

        type: options.type || "info",

        title: options.title || "",

        message: options.message || "",

        duration: options.duration || CONFIG.toastDuration,

        closable: options.closable !== false

    };

    const container = ensureToastContainer();

    const toast = create("div", {
        className: `spae-toast spae-toast-${config.type}`
    });

    const icon = create("div", {
        className: "spae-toast-icon"
    });

    icon.innerHTML = getToastIcon(config.type);

    const body = create("div", {
        className: "spae-toast-body"
    });

    if (config.title) {

        const title = create("div", {
            className: "spae-toast-title",
            text: config.title
        });

        body.appendChild(title);

    }

    const message = create("div", {
        className: "spae-toast-message",
        text: config.message
    });

    body.appendChild(message);

    toast.appendChild(icon);

    toast.appendChild(body);

    if (config.closable) {

        const close = create("button", {

            className: "spae-toast-close",

            html: "&times;"

        });

        close.addEventListener("click", () => {

            removeToast(toast);

        });

        toast.appendChild(close);

    }

    container.appendChild(toast);

    requestAnimationFrame(() => {

        addClass(toast, "show");

    });

    if (config.duration > 0) {

        setTimeout(() => {

            removeToast(toast);

        }, config.duration);

    }

    return toast;

}

/*==========================================================
 ELIMINAR TOAST
==========================================================*/

function removeToast(toastElement) {

    if (!toastElement) return;

    removeClass(toastElement, "show");

    addClass(toastElement, "hide");

    setTimeout(() => {

        remove(toastElement);

    }, 250);

}

/*==========================================================
 ICONOS
==========================================================*/

function getToastIcon(type) {

    switch (type) {

        case "success":
            return "✓";

        case "warning":
            return "⚠";

        case "error":
            return "✖";

        case "info":
        default:
            return "ℹ";

    }

}

/*==========================================================
 ATAJOS
==========================================================*/

function success(message, title = "Correcto") {

    return toast({

        type: "success",

        title,

        message

    });

}

function error(message, title = "Error") {

    return toast({

        type: "error",

        title,

        message

    });

}

function warning(message, title = "Advertencia") {

    return toast({

        type: "warning",

        title,

        message

    });

}

function info(message, title = "Información") {

    return toast({

        type: "info",

        title,

        message

    });

}

/*==========================================================
 ALERTA SIMPLE
==========================================================*/

function alertDialog({

    title = "Mensaje",

    message = "",

    buttonText = "Aceptar",

    callback = null

} = {}) {

    const overlay = create("div", {

        className: "spae-dialog-overlay"

    });

    const dialog = create("div", {

        className: "spae-dialog"

    });

    dialog.innerHTML = `

        <div class="spae-dialog-header">

            <h3>${title}</h3>

        </div>

        <div class="spae-dialog-body">

            <p>${message}</p>

        </div>

    `;

    const footer = create("div", {

        className: "spae-dialog-footer"

    });

    const accept = create("button", {

        className: "btn btn-primary",

        text: buttonText

    });

    accept.addEventListener("click", () => {

        remove(overlay);

        if (callback) {

            callback();

        }

    });

    footer.appendChild(accept);

    dialog.appendChild(footer);

    overlay.appendChild(dialog);

    document.body.appendChild(overlay);

}
  /*==========================================================
 CONFIRM DIALOG
==========================================================*/

function confirmDialog({

    title = "Confirmar acción",

    message = "¿Desea continuar?",

    acceptText = "Aceptar",

    cancelText = "Cancelar",

    onAccept = null,

    onCancel = null

} = {}) {

    const overlay = create("div", {
        className: "spae-dialog-overlay"
    });

    const dialog = create("div", {
        className: "spae-dialog"
    });

    dialog.innerHTML = `
        <div class="spae-dialog-header">
            <h3>${title}</h3>
        </div>

        <div class="spae-dialog-body">
            <p>${message}</p>
        </div>
    `;

    const footer = create("div", {
        className: "spae-dialog-footer"
    });

    const cancel = create("button", {
        className: "btn btn-secondary",
        text: cancelText
    });

    const accept = create("button", {
        className: "btn btn-primary",
        text: acceptText
    });

    cancel.addEventListener("click", () => {

        remove(overlay);

        if (typeof onCancel === "function") {

            onCancel();

        }

    });

    accept.addEventListener("click", () => {

        remove(overlay);

        if (typeof onAccept === "function") {

            onAccept();

        }

    });

    footer.appendChild(cancel);

    footer.appendChild(accept);

    dialog.appendChild(footer);

    overlay.appendChild(dialog);

    document.body.appendChild(overlay);

}

/*==========================================================
 CENTRO DE NOTIFICACIONES
==========================================================*/

const notificationCenter = {

    queue: [],

    maxVisible: 5,

    visible: 0

};

/*==========================================================
 AGREGAR NOTIFICACIÓN
==========================================================*/

function enqueueNotification(notification) {

    notificationCenter.queue.push(notification);

    processNotificationQueue();

}

/*==========================================================
 PROCESAR COLA
==========================================================*/

function processNotificationQueue() {

    if (notificationCenter.visible >= notificationCenter.maxVisible) {

        return;

    }

    const notification = notificationCenter.queue.shift();

    if (!notification) {

        return;

    }

    notificationCenter.visible++;

    const toastElement = toast({

        type: notification.type,

        title: notification.title,

        message: notification.message,

        duration: notification.duration

    });

    const observer = new MutationObserver(() => {

        if (!document.body.contains(toastElement)) {

            notificationCenter.visible--;

            observer.disconnect();

            processNotificationQueue();

        }

    });

    observer.observe(document.body, {

        childList: true,

        subtree: true

    });

}

/*==========================================================
 LIMPIAR NOTIFICACIONES
==========================================================*/

function clearNotifications() {

    const container = ensureToastContainer();

    container.innerHTML = "";

    notificationCenter.queue = [];

    notificationCenter.visible = 0;

}

/*==========================================================
 NOTIFICACIONES RÁPIDAS
==========================================================*/

function notifySuccess(message) {

    enqueueNotification({

        type: "success",

        title: "Correcto",

        message

    });

}

function notifyError(message) {

    enqueueNotification({

        type: "error",

        title: "Error",

        message

    });

}

function notifyWarning(message) {

    enqueueNotification({

        type: "warning",

        title: "Advertencia",

        message

    });

}

function notifyInfo(message) {

    enqueueNotification({

        type: "info",

        title: "Información",

        message

    });

}

/*==========================================================
 EVENTOS DEL SISTEMA DE NOTIFICACIONES
==========================================================*/

on("viewchange", () => {

    clearNotifications();

});

on("keydown", (event) => {

    if (event.key === "Escape") {

        const overlays = $$(".spae-dialog-overlay");

        overlays.forEach(remove);

    }

});
/*==========================================================
 LOADER
==========================================================*/

function ensureLoader() {

    if (dom.loader) {
        return dom.loader;
    }

    let loader = $("#spae-loader");

    if (!loader) {

        loader = create("div", {
            id: "spae-loader",
            className: "spae-loader hidden"
        });

        loader.innerHTML = `
            <div class="spae-loader-backdrop"></div>
            <div class="spae-loader-content">
                <div class="spae-spinner"></div>
                <div class="spae-loader-text">Procesando...</div>
            </div>
        `;

        document.body.appendChild(loader);

    }

    dom.loader = loader;

    return loader;

}

/*==========================================================
 SHOW LOADER
==========================================================*/

function showLoader(message = "Procesando...") {

    const loader = ensureLoader();

    const text = loader.querySelector(".spae-loader-text");

    if (text) {

        text.textContent = message;

    }

    removeClass(loader, "hidden");

    addClass(loader, "visible");

    state.loading = true;

    emit("loading:start");

}

/*==========================================================
 HIDE LOADER
==========================================================*/

function hideLoader() {

    if (!dom.loader) {

        return;

    }

    removeClass(dom.loader, "visible");

    addClass(dom.loader, "hidden");

    state.loading = false;

    emit("loading:end");

}

/*==========================================================
 BUSY STATE
==========================================================*/

function setBusy(message = "Procesando...") {

    showLoader(message);

}

function setIdle() {

    hideLoader();

}

/*==========================================================
 OVERLAY
==========================================================*/

function createOverlay(id = "spae-overlay") {

    let overlay = document.getElementById(id);

    if (overlay) {

        return overlay;

    }

    overlay = create("div", {

        id,

        className: "spae-overlay"

    });

    document.body.appendChild(overlay);

    return overlay;

}

function removeOverlay(id = "spae-overlay") {

    const overlay = document.getElementById(id);

    if (overlay) {

        remove(overlay);

    }

}

/*==========================================================
 EMPTY STATE
==========================================================*/

function emptyState({

    icon = "📄",

    title = "Sin información",

    description = "",

    action = null

} = {}) {

    const container = create("div", {

        className: "spae-empty-state"

    });

    container.innerHTML = `

        <div class="spae-empty-icon">${icon}</div>

        <h3>${title}</h3>

        <p>${description}</p>

    `;

    if (action) {

        const button = create("button", {

            className: "btn btn-primary",

            text: action.label || "Aceptar"

        });

        button.addEventListener("click", action.onClick);

        container.appendChild(button);

    }

    return container;

}

/*==========================================================
 API PÚBLICA
==========================================================*/

return {

    init,

    render,

    clear,

    append,

    remove,

    show,

    hide,

    addClass,

    removeClass,

    toggleClass,

    hasClass,

    attr,

    data,

    on,

    emit,

    setView,

    getView,

    toast,

    success,

    warning,

    error,

    info,

    alertDialog,

    confirmDialog,

    enqueueNotification,

    clearNotifications,

    notifySuccess,

    notifyWarning,

    notifyError,

    notifyInfo,

    showLoader,

    hideLoader,

    setBusy,

    setIdle,

    createOverlay,

    removeOverlay,

    emptyState,

    create,

    $,

    $$

};

})();

/*==========================================================
 INICIALIZACIÓN
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    SPAEUI.init();

});  
