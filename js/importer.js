/*********************************************************
 SPAE
 Sistema Profesional de Autoría de Evaluaciones

 Archivo : js/importer.js
 Versión : 1.0

 Administrador de importaciones del sistema.

*********************************************************/


const Importer = {


    //--------------------------------------------------
    // CONFIGURACIÓN
    //--------------------------------------------------

    ACCEPTED_TYPES: [

        "application/json",
        "text/plain"

    ],


    //--------------------------------------------------
    // INICIALIZACIÓN
    //--------------------------------------------------

    init() {

        this.bindImportButtons();

        console.log(
            "Importer inicializado."
        );

    },


    //--------------------------------------------------
    // BOTONES DE IMPORTACIÓN
    //--------------------------------------------------

    bindImportButtons() {

        const inputs = document.querySelectorAll(

            ".import-file"

        );


        inputs.forEach(input => {

            input.addEventListener(

                "change",

                (event) => {

                    this.importFile(

                        event.target.files[0]

                    );

                }

            );

        });

    },


    //--------------------------------------------------
    // IMPORTAR ARCHIVO
    //--------------------------------------------------

    importFile(file) {

        if (!file) {

            return;

        }

        if (!this.validateFile(file)) {

            this.showError();

            return;

        }

        const reader = new FileReader();

        reader.onload = (event) => {

            this.processFile(

                event.target.result

            );

        };

        reader.readAsText(file);

    },


    //--------------------------------------------------
    // VALIDACIÓN
    //--------------------------------------------------

    validateFile(file) {

        return (

            this.ACCEPTED_TYPES.includes(

                file.type

            )

            ||

            file.name.endsWith(".json")

        );

    },


    //--------------------------------------------------
    // PROCESAR CONTENIDO
    //--------------------------------------------------

    processFile(content) {

        try {

            const data = JSON.parse(content);

            this.importData(data);

        }

        catch(error){

            console.error(error);

            Notifications.danger(

                "El archivo no posee un formato válido."

            );

        }

    },


    //--------------------------------------------------
    // IMPORTAR DATOS
    //--------------------------------------------------

    importData(data) {

        if (!data) {

            return;

        }


        if (

            window.StorageManager

        ) {

            StorageManager.importDatabase(
                data
            );

        }


        Notifications.success(

            "Importación completada correctamente."

        );


        if (

            window.DashboardModule

        ) {

            DashboardModule.refresh();

        }

    },


    //--------------------------------------------------
    // IMPORTAR CURSO
    //--------------------------------------------------

    importCourse(course) {

        StorageManager.saveCourse(
            course
        );

        Notifications.success(

            "Curso importado."

        );

    },


    //--------------------------------------------------
    // IMPORTAR EXAMEN
    //--------------------------------------------------

    importExam(exam) {

        StorageManager.saveExam(
            exam
        );

        Notifications.success(

            "Examen importado."

        );

    },


    //--------------------------------------------------
    // IMPORTAR PREGUNTA
    //--------------------------------------------------

    importQuestion(question) {

        StorageManager.saveQuestion(
            question
        );

        Notifications.success(

            "Pregunta importada."

        );

    },


    //--------------------------------------------------
    // IMPORTAR RESULTADO DE APRENDIZAJE
    //--------------------------------------------------

    importLearningOutcome(outcome) {

        StorageManager.saveLearningOutcome(

            outcome

        );

        Notifications.success(

            "Resultado de aprendizaje importado."

        );

    },


    //--------------------------------------------------
    // IMPORTAR BACKUP
    //--------------------------------------------------

    importBackup(backup) {

        StorageManager.importDatabase(

            backup

        );

        Notifications.success(

            "Backup restaurado correctamente."

        );

    },


    //--------------------------------------------------
    // IMPORTAR TEXTO PLANO
    //--------------------------------------------------

    importPlainText(text) {

        return {

            rawText: text,

            importedAt:

                new Date()

        };

    },


    //--------------------------------------------------
    // IMPORTACIÓN MASIVA
    //--------------------------------------------------

    bulkImport(collection) {

        if (!Array.isArray(collection)) {

            return false;

        }

        collection.forEach(item => {

            if (item.type === "course") {

                this.importCourse(item);

            }

            else if (item.type === "exam") {

                this.importExam(item);

            }

            else if (item.type === "question") {

                this.importQuestion(item);

            }

        });

        return true;

    },


    //--------------------------------------------------
    // UTILIDADES
    //--------------------------------------------------

    openFileSelector(id) {

        const element = document.getElementById(
            id
        );

        if (element) {

            element.click();

        }

    },


    //--------------------------------------------------
    // INFORMACIÓN DEL ARCHIVO
    //--------------------------------------------------

    getFileInformation(file) {

        return {

            name: file.name,

            size: file.size,

            type: file.type,

            lastModified:

                file.lastModified

        };

    },


    //--------------------------------------------------
    // MENSAJES
    //--------------------------------------------------

    showError() {

        Notifications.danger(

            "Tipo de archivo no permitido."

        );

    },


    //--------------------------------------------------
    // DEBUG
    //--------------------------------------------------

    debug(data) {

        console.log(
            data
        );

    }


};



/*********************************************************
EXPORTACIÓN GLOBAL
*********************************************************/

window.Importer = Importer;



/*********************************************************
INICIALIZACIÓN AUTOMÁTICA
*********************************************************/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        Importer.init();

    }

);
