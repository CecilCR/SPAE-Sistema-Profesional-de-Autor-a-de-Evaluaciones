/* ==========================================================
   SPAE
   Sistema Profesional de Autoría de Evaluaciones
   util.js
   Release R0.1

   Funciones utilitarias reutilizables.
==========================================================*/

const SPAEUtil = (() => {

    "use strict";

    /*=========================================================
        UUID
    =========================================================*/

    function generarUUID(){

        if(window.crypto?.randomUUID){

            return crypto.randomUUID();

        }

        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){

            const r=Math.random()*16|0;

            const v=c==="x"?r:(r&0x3|0x8);

            return v.toString(16);

        });

    }

    /*=========================================================
        FECHA
    =========================================================*/

    function fechaActual(){

        return new Date().toISOString();

    }

    function fechaLegible(fecha){

        return new Date(fecha).toLocaleDateString("es-PE",{

            year:"numeric",

            month:"long",

            day:"numeric"

        });

    }

    /*=========================================================
        VALIDACIONES
    =========================================================*/

    function esTextoVacio(valor){

        return !valor || valor.trim()==="";

    }

    function longitudCorrecta(texto,min,max){

        const n=texto.trim().length;

        return n>=min && n<=max;

    }

    function rango(valor,min,max){

        return valor>=min && valor<=max;

    }

    /*=========================================================
        NOTIFICACIONES
    =========================================================*/

    function mensaje(texto){

        alert(texto);

    }

    function confirmar(texto){

        return confirm(texto);

    }

    /*=========================================================
        DESCARGAR JSON
    =========================================================*/

    function descargarJSON(nombre,datos){

        const blob=new Blob(

            [JSON.stringify(datos,null,2)],

            {type:"application/json"}

        );

        const url=URL.createObjectURL(blob);

        const a=document.createElement("a");

        a.href=url;

        a.download=nombre;

        a.click();

        URL.revokeObjectURL(url);

    }

    /*=========================================================
        LEER JSON
    =========================================================*/

    function leerArchivoJSON(archivo){

        return new Promise((resolve,reject)=>{

            const lector=new FileReader();

            lector.onload=e=>{

                try{

                    resolve(JSON.parse(e.target.result));

                }

                catch(error){

                    reject(error);

                }

            };

            lector.onerror=reject;

            lector.readAsText(archivo);

        });

    }

    /*=========================================================
        COPIA PROFUNDA
    =========================================================*/

    function clonar(obj){

        return structuredClone

            ? structuredClone(obj)

            : JSON.parse(JSON.stringify(obj));

    }

    /*=========================================================
        DEBOUNCE
    =========================================================*/

    function debounce(fn,espera=300){

        let tiempo;

        return (...args)=>{

            clearTimeout(tiempo);

            tiempo=setTimeout(()=>fn(...args),espera);

        };

    }

    /*=========================================================
        BÚSQUEDA
    =========================================================*/

    function buscar(lista,texto,campo){

        texto=texto.toLowerCase();

        return lista.filter(item=>

            String(item[campo]||"")

            .toLowerCase()

            .includes(texto)

        );

    }

    /*=========================================================
        ORDENAR
    =========================================================*/

    function ordenar(lista,campo){

        return [...lista].sort((a,b)=>

            String(a[campo])

            .localeCompare(

                String(b[campo]),

                "es"

            )

        );

    }

    /*=========================================================
        AGRUPAR
    =========================================================*/

    function agrupar(lista,campo){

        return lista.reduce((grupo,item)=>{

            const clave=item[campo];

            if(!grupo[clave])

                grupo[clave]=[];

            grupo[clave].push(item);

            return grupo;

        },{});

    }

    /*=========================================================
        CONTAR
    =========================================================*/

    function contar(lista,campo){

        return lista.reduce((r,item)=>{

            r[item[campo]]=(r[item[campo]]||0)+1;

            return r;

        },{});

    }

    /*=========================================================
        HTML
    =========================================================*/

    function escaparHTML(texto){

        return texto

        .replaceAll("&","&amp;")

        .replaceAll("<","&lt;")

        .replaceAll(">","&gt;")

        .replaceAll('"',"&quot;")

        .replaceAll("'","&#039;");

    }

    /*=========================================================
        EXPORTAR
    =========================================================*/

    return{

        generarUUID,

        fechaActual,

        fechaLegible,

        esTextoVacio,

        longitudCorrecta,

        rango,

        mensaje,

        confirmar,

        descargarJSON,

        leerArchivoJSON,

        clonar,

        debounce,

        buscar,

        ordenar,

        agrupar,

        contar,

        escaparHTML

    };

})();
