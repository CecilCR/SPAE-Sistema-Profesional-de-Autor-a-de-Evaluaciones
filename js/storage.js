/*********************************************************
 SPAE
 Sistema Profesional de Autoría de Evaluaciones

 Archivo : js/storage.js
 Versión : 1.0

 Administrador de almacenamiento local.

*********************************************************/


const StorageManager = {


    //--------------------------------------------------
    // CONFIGURACIÓN
    //--------------------------------------------------

    PREFIX: "SPAE_",


    KEYS: {

        courses: "COURSES",
        questions: "QUESTIONS",
        exams: "EXAMS",
        outcomes: "LEARNING_OUTCOMES",
        reports: "REPORTS",
        settings: "SETTINGS",
        backups: "BACKUPS"

    },


    //--------------------------------------------------
    // INICIALIZACIÓN
    //--------------------------------------------------

    init() {

        this.initializeCollections();

        console.log(
            "StorageManager inicializado."
        );

    },


    //--------------------------------------------------
    // CREACIÓN DE ESTRUCTURAS
    //--------------------------------------------------

    initializeCollections() {

        Object.values(this.KEYS).forEach(key => {

            if (

                localStorage.getItem(
                    this.PREFIX + key
                ) === null

            ) {

                localStorage.setItem(

                    this.PREFIX + key,

                    JSON.stringify([])

                );

            }

        });

    },


    //--------------------------------------------------
    // MÉTODOS GENÉRICOS
    //--------------------------------------------------

    save(key, data) {

        localStorage.setItem(

            this.PREFIX + key,

            JSON.stringify(data)

        );

    },


    load(key) {

        const data = localStorage.getItem(

            this.PREFIX + key

        );

        if (!data) {

            return null;

        }

        return JSON.parse(data);

    },


    remove(key) {

        localStorage.removeItem(

            this.PREFIX + key

        );

    },


    clearAll() {

        Object.values(this.KEYS).forEach(key => {

            this.remove(key);

        });

        this.initializeCollections();

    },


    //--------------------------------------------------
    // CURSOS
    //--------------------------------------------------

    getCourses() {

        return this.load(
            this.KEYS.courses
        );

    },


    saveCourse(course) {

        const courses = this.getCourses();

        course.id = Date.now();

        courses.push(course);

        this.save(

            this.KEYS.courses,
            courses

        );

        return course;

    },


    deleteCourse(id) {

        const data = this.getCourses().filter(

            course => course.id !== id

        );

        this.save(

            this.KEYS.courses,
            data

        );

    },


    //--------------------------------------------------
    // PREGUNTAS
    //--------------------------------------------------

    getQuestions() {

        return this.load(
            this.KEYS.questions
        );

    },


    saveQuestion(question) {

        const questions = this.getQuestions();

        question.id = Date.now();

        questions.push(question);

        this.save(

            this.KEYS.questions,
            questions

        );

        return question;

    },


    deleteQuestion(id) {

        const data = this.getQuestions().filter(

            item => item.id !== id

        );

        this.save(

            this.KEYS.questions,
            data

        );

    },


    //--------------------------------------------------
    // EXÁMENES
    //--------------------------------------------------

    getExams() {

        return this.load(
            this.KEYS.exams
        );

    },


    saveExam(exam) {

        const exams = this.getExams();

        exam.id = Date.now();

        exams.push(exam);

        this.save(

            this.KEYS.exams,
            exams

        );

        return exam;

    },


    deleteExam(id) {

        const data = this.getExams().filter(

            exam => exam.id !== id

        );

        this.save(

            this.KEYS.exams,
            data

        );

    },


    //--------------------------------------------------
    // RESULTADOS DE APRENDIZAJE
    //--------------------------------------------------

    getLearningOutcomes() {

        return this.load(
            this.KEYS.outcomes
        );

    },


    saveLearningOutcome(outcome) {

        const outcomes = this.getLearningOutcomes();

        outcome.id = Date.now();

        outcomes.push(outcome);

        this.save(

            this.KEYS.outcomes,
            outcomes

        );

    },


    //--------------------------------------------------
    // CONFIGURACIÓN
    //--------------------------------------------------

    getSettings() {

        const settings = this.load(

            this.KEYS.settings

        );

        return Array.isArray(settings)
            ? {}
            : settings;

    },


    saveSettings(settings) {

        this.save(

            this.KEYS.settings,
            settings

        );

    },


    //--------------------------------------------------
    // REPORTES
    //--------------------------------------------------

    saveReport(report) {

        const reports = this.load(
            this.KEYS.reports
        );

        report.id = Date.now();

        reports.push(report);

        this.save(

            this.KEYS.reports,
            reports

        );

    },


    getReports() {

        return this.load(
            this.KEYS.reports
        );

    },


    //--------------------------------------------------
    // BACKUPS
    //--------------------------------------------------

    createBackup() {

        const backup = {

            date: new Date(),

            courses:
                this.getCourses(),

            questions:
                this.getQuestions(),

            exams:
                this.getExams(),

            outcomes:
                this.getLearningOutcomes(),

            settings:
                this.getSettings(),

            reports:
                this.getReports()

        };

        const backups = this.load(
            this.KEYS.backups
        );

        backups.push(backup);

        this.save(

            this.KEYS.backups,
            backups

        );

        return backup;

    },


    getBackups() {

        return this.load(
            this.KEYS.backups
        );

    },


    //--------------------------------------------------
    // EXPORTACIÓN COMPLETA
    //--------------------------------------------------

    exportDatabase() {

        return {

            courses:
                this.getCourses(),

            questions:
                this.getQuestions(),

            exams:
                this.getExams(),

            outcomes:
                this.getLearningOutcomes(),

            settings:
                this.getSettings(),

            reports:
                this.getReports()

        };

    },


    //--------------------------------------------------
    // IMPORTACIÓN COMPLETA
    //--------------------------------------------------

    importDatabase(data) {

        if (!data) {

            return false;

        }

        Object.keys(data).forEach(key => {

            const upperKey =
                key.toUpperCase();

            if (

                this.KEYS[key]

            ) {

                this.save(

                    this.KEYS[key],

                    data[key]

                );

            }

        });

        return true;

    },


    //--------------------------------------------------
    // UTILIDADES
    //--------------------------------------------------

    getDatabaseSize() {

        return JSON.stringify(

            this.exportDatabase()

        ).length;

    },


    isStorageAvailable() {

        try {

            localStorage.setItem(
                "__test__",
                "1"
            );

            localStorage.removeItem(
                "__test__"
            );

            return true;

        } catch {

            return false;

        }

    },


    //--------------------------------------------------
    // DEBUG
    //--------------------------------------------------

    debug() {

        console.log(

            this.exportDatabase()

        );

    }

};



/*********************************************************
EXPORTACIÓN GLOBAL
*********************************************************/

window.StorageManager = StorageManager;



/*********************************************************
INICIALIZACIÓN AUTOMÁTICA
*********************************************************/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        StorageManager.init();

    }

);
