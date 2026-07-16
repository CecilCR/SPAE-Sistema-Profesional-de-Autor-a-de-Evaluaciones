/*********************************************************
 SPAE

 Sistema Profesional de Autoría de Evaluaciones

 Archivo:
 js/persistence-manager.js

 Gestión centralizada de persistencia del sistema.

 Versión MVP:
 - localStorage

 Preparado para:
 - IndexedDB
 - Firebase
 - Supabase
 - LMS institucional

*********************************************************/


const PersistenceManager = {


    /*****************************************************
     CONFIGURACIÓN
    *****************************************************/

    STORAGE_KEY: "SPAE_PROJECT",

    AUTO_SAVE: true,



    /*****************************************************
     ESTRUCTURA DEL PROYECTO
    *****************************************************/

    createEmptyProject() {

        return {

            metadata: {

                version: "1.0",

                createdAt: new Date(),

                updatedAt: new Date()

            },


            course: {},

            questions: [],

            blueprint: {},

            exam: {},

            reports: {},

            analytics: {},

            settings: {}

        };

    },



    /*****************************************************
     INICIALIZACIÓN
    *****************************************************/

    init() {

        if (!this.exists()) {

            this.saveProject(
                this.createEmptyProject()
            );

        }

        console.log(
            "Persistence Manager inicializado."
        );

    },



    /*****************************************************
     EXISTE PROYECTO
    *****************************************************/

    exists() {

        return (

            localStorage.getItem(
                this.STORAGE_KEY
            ) !== null

        );

    },



    /*****************************************************
     GUARDAR PROYECTO COMPLETO
    *****************************************************/

    saveProject(project) {

        project.metadata.updatedAt =
            new Date();

        localStorage.setItem(

            this.STORAGE_KEY,

            JSON.stringify(project)

        );

        this.updateSaveTime();

    },



    /*****************************************************
     CARGAR PROYECTO
    *****************************************************/

    loadProject() {

        const project = localStorage.getItem(
            this.STORAGE_KEY
        );


        if (!project) {

            return this.createEmptyProject();

        }


        return JSON.parse(project);

    },



    /*****************************************************
     ELIMINAR PROYECTO
    *****************************************************/

    deleteProject() {

        localStorage.removeItem(
            this.STORAGE_KEY
        );

    },



    /*****************************************************
     RESET
    *****************************************************/

    resetProject() {

        this.saveProject(
            this.createEmptyProject()
        );

    },



    /*****************************************************
     CURSO
    *****************************************************/

    saveCourse(course) {

        const project =
            this.loadProject();

        project.course = course;

        this.saveProject(project);

    },


    getCourse() {

        return this.loadProject().course;

    },



    /*****************************************************
     PREGUNTAS
    *****************************************************/

    saveQuestions(questions) {

        const project =
            this.loadProject();

        project.questions =
            questions;

        this.saveProject(project);

    },


    addQuestion(question) {

        const project =
            this.loadProject();

        project.questions.push(
            question
        );

        this.saveProject(project);

    },


    getQuestions() {

        return this.loadProject()
            .questions;

    },


    deleteQuestion(index) {

        const project =
            this.loadProject();

        project.questions.splice(
            index,
            1
        );

        this.saveProject(project);

    },



    /*****************************************************
     BLUEPRINT
    *****************************************************/

    saveBlueprint(blueprint) {

        const project =
            this.loadProject();

        project.blueprint =
            blueprint;

        this.saveProject(project);

    },


    getBlueprint() {

        return this.loadProject()
            .blueprint;

    },



    /*****************************************************
     EXAMEN
    *****************************************************/

    saveExam(exam) {

        const project =
            this.loadProject();

        project.exam = exam;

        this.saveProject(project);

    },


    getExam() {

        return this.loadProject()
            .exam;

    },



    /*****************************************************
     REPORTES
    *****************************************************/

    saveReports(reports) {

        const project =
            this.loadProject();

        project.reports =
            reports;

        this.saveProject(project);

    },


    getReports() {

        return this.loadProject()
            .reports;

    },



    /*****************************************************
     ANALYTICS
    *****************************************************/

    saveAnalytics(data) {

        const project =
            this.loadProject();

        project.analytics =
            data;

        this.saveProject(project);

    },


    getAnalytics() {

        return this.loadProject()
            .analytics;

    },



    /*****************************************************
     SETTINGS
    *****************************************************/

    saveSettings(settings) {

        const project =
            this.loadProject();

        project.settings =
            settings;

        this.saveProject(project);

    },


    getSettings() {

        return this.loadProject()
            .settings;

    },



    /*****************************************************
     AUTOGUARDADO
    *****************************************************/

    autoSave() {

        if (!this.AUTO_SAVE) {

            return;

        }

        const project =
            this.loadProject();

        this.saveProject(project);

    },



    /*****************************************************
     BACKUP JSON
    *****************************************************/

    exportProject() {

        return JSON.stringify(

            this.loadProject(),

            null,

            4

        );

    },



    /*****************************************************
     IMPORTAR PROYECTO
    *****************************************************/

    importProject(json) {

        try {

            const project =
                JSON.parse(json);

            this.saveProject(
                project
            );

            return true;

        }

        catch {

            return false;

        }

    },



    /*****************************************************
     ESTADÍSTICAS DEL PROYECTO
    *****************************************************/

    getStatistics() {

        const project =
            this.loadProject();


        return {

            questions:

                project.questions.length,


            hasCourse:

                Object.keys(
                    project.course
                ).length > 0,


            hasBlueprint:

                Object.keys(
                    project.blueprint
                ).length > 0,


            hasExam:

                Object.keys(
                    project.exam
                ).length > 0

        };

    },



    /*****************************************************
     ÚLTIMO GUARDADO
    *****************************************************/

    updateSaveTime() {

        const element = document.getElementById(
            "last-save-time"
        );


        if (!element) {

            return;

        }


        const now = new Date();

        element.textContent =

            now.toLocaleString();

    },



    /*****************************************************
     LIMPIAR LOCAL STORAGE
    *****************************************************/

    clearStorage() {

        localStorage.clear();

    },



    /*****************************************************
     DEBUG
    *****************************************************/

    debug() {

        console.table(

            this.getStatistics()

        );

        console.log(

            this.loadProject()

        );

    }


};



/*********************************************************
 EXPORTACIÓN GLOBAL
*********************************************************/

window.PersistenceManager =
    PersistenceManager;



/*********************************************************
 INICIALIZACIÓN AUTOMÁTICA
*********************************************************/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        PersistenceManager.init();

    }

);
