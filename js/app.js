/* ==========================================================
   SPAE
   Sistema Profesional de Autoría de Evaluaciones
   app.js
   Release R0.5

   Núcleo de la aplicación.

   Responsabilidades:
   - Inicializar el sistema.
   - Cargar configuración.
   - Coordinar módulos.
   - Gestionar el estado global.
   - Iniciar la interfaz.
==========================================================*/

const SPAE = (() => {

    "use strict";

    /*=========================================================
        ESTADO GLOBAL
    =========================================================*/

    const estado = {

        version : "0.5.0",

        curso : null,

        examen : null,

        pregunta : null,

        vista : "dashboard",

        configuracion : {},

        iniciado : false

    };



    /*=========================================================
        CONFIGURACIÓN
    =========================================================*/

    function cargarConfiguracion(){

        estado.configuracion =

            SPAEStorage.obtenerConfiguracion() || {};

    }



    /*=========================================================
        INICIALIZACIÓN
    =========================================================*/

    function iniciar(){

        if(estado.iniciado){

            return;

        }

        console.log(

            "%cSPAE",

            "font-size:18px;font-weight:bold;color:#005BAC"

        );

        console.log(

            "Sistema Profesional de Autoría de Evaluaciones"

        );

        console.log(

            "Versión",

            estado.version

        );

        cargarConfiguracion();

        registrarRutas();

        registrarEventos();

        SPAERouter.iniciar("dashboard");

        estado.iniciado = true;

    }



    /*=========================================================
        EVENTOS GLOBALES
    =========================================================*/

    function registrarEventos(){

        document.addEventListener(

            "click",

            manejarClick

        );

    }



    function manejarClick(event){

        const boton = event.target.closest("[data-route]");

        if(!boton) return;

        event.preventDefault();

        const ruta = boton.dataset.route;

        SPAERouter.navegar(ruta);

    }



    /*=========================================================
        REGISTRO DE RUTAS
    =========================================================*/

    function registrarRutas(){

        SPAERouter.registrarRutasBase();

    }



    /*=========================================================
        ESTADO
    =========================================================*/

    function obtenerEstado(){

        return structuredClone(estado);

    }



    function establecerCurso(curso){

        estado.curso = curso;

    }



    function establecerPregunta(pregunta){

        estado.pregunta = pregunta;

    }



    function establecerExamen(examen){

        estado.examen = examen;

    }



    function establecerVista(vista){

        estado.vista = vista;

    }



    /*=========================================================
        API
    =========================================================*/

    return{

        iniciar,

        obtenerEstado,

        establecerCurso,

        establecerPregunta,

        establecerExamen,

        establecerVista

    };

})();



/*=========================================================
    ARRANQUE
==========================================================*/

window.addEventListener(

    "DOMContentLoaded",

    () => {

        SPAE.iniciar();

    }

);
