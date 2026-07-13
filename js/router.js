/* ==========================================================
   SPAE
   Sistema Profesional de Autoría de Evaluaciones
   storage.js
   Release R0.1

   Gestión centralizada del almacenamiento local.

   Filosofía:
   - Todo acceso a LocalStorage pasa por este módulo.
   - El resto del sistema nunca usa localStorage directamente.
   - Facilita futuras migraciones a IndexedDB o API REST.
==========================================================*/

const SPAEStorage = (() => {

    "use strict";

    /*=========================================================
        CLAVES DEL SISTEMA
    =========================================================*/

    const KEYS = {

        CONFIGURACION : "spae.configuracion",

        CURSOS : "spae.cursos",

        PREGUNTAS : "spae.preguntas",

        EXAMENES : "spae.examenes",

        PERFIL_DOCENTE : "spae.perfilDocente",

        VERSION : "spae.version"

    };



    /*=========================================================
        MÉTODOS PRIVADOS
    =========================================================*/

    function existeStorage(){

        try{

            const test = "__spae__";

            localStorage.setItem(test,test);

            localStorage.removeItem(test);

            return true;

        }

        catch(e){

            console.error("LocalStorage no disponible.",e);

            return false;

        }

    }



    function leer(clave,valorDefecto=null){

        if(!existeStorage()) return valorDefecto;

        const dato = localStorage.getItem(clave);

        if(dato===null) return valorDefecto;

        try{

            return JSON.parse(dato);

        }

        catch{

            return dato;

        }

    }



    function guardar(clave,valor){

        if(!existeStorage()) return false;

        localStorage.setItem(

            clave,

            JSON.stringify(valor)

        );

        return true;

    }



    function eliminar(clave){

        if(!existeStorage()) return;

        localStorage.removeItem(clave);

    }



    /*=========================================================
        CONFIGURACIÓN
    =========================================================*/

    function obtenerConfiguracion(){

        return leer(KEYS.CONFIGURACION,{});

    }



    function guardarConfiguracion(config){

        guardar(KEYS.CONFIGURACION,config);

    }



    /*=========================================================
        CURSOS
    =========================================================*/

    function obtenerCursos(){

        return leer(KEYS.CURSOS,[]);

    }



    function guardarCursos(lista){

        guardar(KEYS.CURSOS,lista);

    }



    function agregarCurso(curso){

        const cursos = obtenerCursos();

        cursos.push(curso);

        guardarCursos(cursos);

    }



    function eliminarCurso(id){

        let cursos = obtenerCursos();

        cursos = cursos.filter(c=>c.id!==id);

        guardarCursos(cursos);

    }



    function actualizarCurso(curso){

        const cursos = obtenerCursos();

        const indice = cursos.findIndex(c=>c.id===curso.id);

        if(indice>=0){

            cursos[indice]=curso;

            guardarCursos(cursos);

        }

    }



    /*=========================================================
        PREGUNTAS
    =========================================================*/

    function obtenerPreguntas(){

        return leer(KEYS.PREGUNTAS,[]);

    }



    function guardarPreguntas(lista){

        guardar(KEYS.PREGUNTAS,lista);

    }



    function agregarPregunta(pregunta){

        const preguntas = obtenerPreguntas();

        preguntas.push(pregunta);

        guardarPreguntas(preguntas);

    }



    function actualizarPregunta(pregunta){

        const preguntas = obtenerPreguntas();

        const indice = preguntas.findIndex(

            p=>p.id===pregunta.id

        );

        if(indice>=0){

            preguntas[indice]=pregunta;

            guardarPreguntas(preguntas);

        }

    }



    function eliminarPregunta(id){

        let preguntas = obtenerPreguntas();

        preguntas = preguntas.filter(

            p=>p.id!==id

        );

        guardarPreguntas(preguntas);

    }



    /*=========================================================
        EXÁMENES
    =========================================================*/

    function obtenerExamenes(){

        return leer(KEYS.EXAMENES,[]);

    }



    function guardarExamenes(lista){

        guardar(KEYS.EXAMENES,lista);

    }



    function agregarExamen(examen){

        const examenes = obtenerExamenes();

        examenes.push(examen);

        guardarExamenes(examenes);

    }



    function actualizarExamen(examen){

        const examenes = obtenerExamenes();

        const indice = examenes.findIndex(

            e=>e.id===examen.id

        );

        if(indice>=0){

            examenes[indice]=examen;

            guardarExamenes(examenes);

        }

    }



    function eliminarExamen(id){

        let examenes = obtenerExamenes();

        examenes = examenes.filter(

            e=>e.id!==id

        );

        guardarExamenes(examenes);

    }



    /*=========================================================
        PERFIL DEL DOCENTE
    =========================================================*/

    function obtenerPerfil(){

        return leer(KEYS.PERFIL_DOCENTE,{});

    }



    function guardarPerfil(perfil){

        guardar(KEYS.PERFIL_DOCENTE,perfil);

    }



    /*=========================================================
        UTILIDADES
    =========================================================*/

    function limpiarTodo(){

        Object.values(KEYS).forEach(

            clave=>eliminar(clave)

        );

    }



    function exportarDatos(){

        return {

            configuracion : obtenerConfiguracion(),

            cursos : obtenerCursos(),

            preguntas : obtenerPreguntas(),

            examenes : obtenerExamenes(),

            perfil : obtenerPerfil(),

            fechaExportacion : new Date().toISOString()

        };

    }



    function importarDatos(datos){

        if(datos.configuracion)

            guardarConfiguracion(datos.configuracion);

        if(datos.cursos)

            guardarCursos(datos.cursos);

        if(datos.preguntas)

            guardarPreguntas(datos.preguntas);

        if(datos.examenes)

            guardarExamenes(datos.examenes);

        if(datos.perfil)

            guardarPerfil(datos.perfil);

    }



    /*=========================================================
        API PÚBLICA
    =========================================================*/

    return{

        KEYS,

        obtenerConfiguracion,

        guardarConfiguracion,

        obtenerCursos,

        guardarCursos,

        agregarCurso,

        actualizarCurso,

        eliminarCurso,

        obtenerPreguntas,

        guardarPreguntas,

        agregarPregunta,

        actualizarPregunta,

        eliminarPregunta,

        obtenerExamenes,

        guardarExamenes,

        agregarExamen,

        actualizarExamen,

        eliminarExamen,

        obtenerPerfil,

        guardarPerfil,

        exportarDatos,

        importarDatos,

        limpiarTodo

    };

})();
