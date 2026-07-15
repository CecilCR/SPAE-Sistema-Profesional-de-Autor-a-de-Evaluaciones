/*********************************************************
 SPAE
 Sistema Profesional de Autoría de Evaluaciones

 Archivo : js/exporter.js
 Versión : 1.0

 Administrador de exportaciones del sistema.

*********************************************************/


const Exporter = {


    //--------------------------------------------------
    // CONFIGURACIÓN
    //--------------------------------------------------

    VERSION: "1.0.0",

    FILE_PREFIX: "SPAE_",



    //--------------------------------------------------
    // INICIALIZACIÓN
    //--------------------------------------------------

    init() {

        console.log(
            "Exporter inicializado."
        );

    },



    //--------------------------------------------------
    // EXPORTACIÓN COMPLETA
    //--------------------------------------------------

    exportProject() {

        const data = {

            version: this.VERSION,

            exportedAt: new Date(),

            database:

                StorageManager.exportDatabase()

        };


        this.downloadJSON(

            data,

            "PROYECTO_COMPLETO"

        );

    },



    //--------------------------------------------------
    // EXPORTAR CURSOS
    //--------------------------------------------------

    exportCourses() {

        const data = {

            version: this.VERSION,

            courses:

                StorageManager.getCourses()

        };


        this.downloadJSON(

            data,

            "CURSOS"

        );

    },



    //--------------------------------------------------
    // EXPORTAR PREGUNTAS
    //--------------------------------------------------

    exportQuestions() {

        const data = {

            version: this.VERSION,

            questions:

                StorageManager.getQuestions()

        };


        this.downloadJSON(

            data,

            "BANCO_PREGUNTAS"

        );

    },



    //--------------------------------------------------
    // EXPORTAR EXÁMENES
    //--------------------------------------------------

    exportExams() {

        const data = {

            version: this.VERSION,

            exams:

                StorageManager.getExams()

        };


        this.downloadJSON(

            data,

            "EXAMENES"

        );

    },



    //--------------------------------------------------
    // EXPORTAR RESULTADOS DE APRENDIZAJE
    //--------------------------------------------------

    exportLearningOutcomes() {

        const data = {

            version: this.VERSION,

            outcomes:

                StorageManager.getLearningOutcomes()

        };


        this.downloadJSON(

            data,

            "RESULTADOS_APRENDIZAJE"

        );

    },



    //--------------------------------------------------
    // EXPORTAR REPORTES
    //--------------------------------------------------

    exportReports() {

        const data = {

            version: this.VERSION,

            reports:

                StorageManager.getReports()

        };


        this.downloadJSON(

            data,

            "REPORTES"

        );

    },



    //--------------------------------------------------
    // EXPORTAR BACKUP
    //--------------------------------------------------

    exportBackup() {

        const backup =

            StorageManager.createBackup();


        this.downloadJSON(

            backup,

            "BACKUP"

        );

    },



    //--------------------------------------------------
    // EXPORTACIÓN HTML
    //--------------------------------------------------

    exportHTML(html, filename) {

        const blob = new Blob(

            [html],

            {

                type: "text/html"

            }

        );


        this.downloadBlob(

            blob,

            filename + ".html"

        );

    },



    //--------------------------------------------------
    // EXPORTAR TEXTO
    //--------------------------------------------------

    exportText(text, filename) {

        const blob = new Blob(

            [text],

            {

                type: "text/plain"

            }

        );


        this.downloadBlob(

            blob,

            filename + ".txt"

        );

    },



    //--------------------------------------------------
    // EXPORTACIÓN JSON
    //--------------------------------------------------

    downloadJSON(data, filename) {

        const json = JSON.stringify(

            data,
            null,
            4

        );


        const blob = new Blob(

            [json],

            {

                type:

                "application/json"

            }

        );


        this.downloadBlob(

            blob,

            `${this.FILE_PREFIX}${filename}.json`

        );

    },



    //--------------------------------------------------
    // DESCARGAR BLOB
    //--------------------------------------------------

    downloadBlob(blob, filename) {

        const url =

            URL.createObjectURL(blob);


        const link =

            document.createElement("a");


        link.href = url;

        link.download = filename;


        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);


        URL.revokeObjectURL(url);


        if (window.Notifications) {

            Notifications.success(

                "Archivo exportado correctamente."

            );

        }

    },



    //--------------------------------------------------
    // EXPORTACIÓN PEDAGÓGICA
    //--------------------------------------------------

    exportPedagogicalReport(report) {

        const data = {

            version: this.VERSION,

            report

        };


        this.downloadJSON(

            data,

            "REPORTE_PEDAGOGICO"

        );

    },



    //--------------------------------------------------
    // EXPORTAR EXAMEN IMPRIMIBLE
    //--------------------------------------------------

    exportPrintableExam(exam) {

        const html = `

        <html>

        <head>

            <title>

                ${exam.title}

            </title>

        </head>

        <body>

            <h1>

                ${exam.title}

            </h1>

            <hr>

            <pre>

${JSON.stringify(exam,null,2)}

            </pre>

        </body>

        </html>

        `;


        this.exportHTML(

            html,

            exam.title

        );

    },



    //--------------------------------------------------
    // EXPORTAR DATOS PERSONALIZADOS
    //--------------------------------------------------

    exportCustom(filename, data) {

        this.downloadJSON(

            data,

            filename

        );

    },



    //--------------------------------------------------
    // OBTENER TAMAÑO DEL ARCHIVO
    //--------------------------------------------------

    getSize(data) {

        return JSON.stringify(

            data

        ).length;

    },



    //--------------------------------------------------
    // VALIDAR EXPORTACIÓN
    //--------------------------------------------------

    validate(data) {

        return data !== null &&
               data !== undefined;

    },



    //--------------------------------------------------
    // DEBUG
    //--------------------------------------------------

    debug(data) {

        console.log(data);

    }


};



/*********************************************************
EXPORTACIÓN GLOBAL
*********************************************************/

window.Exporter = Exporter;



/*********************************************************
INICIALIZACIÓN AUTOMÁTICA
*********************************************************/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        Exporter.init();

    }

);
