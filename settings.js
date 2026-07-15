/*********************************************************
 SPAE

 Sistema Profesional de Autoría de Evaluaciones

 Archivo:
 js/settings.js

 Configuración institucional, curricular y pedagógica.

*********************************************************/

const Settings = {


    //--------------------------------------------------
    // CONFIGURACIÓN POR DEFECTO
    //--------------------------------------------------

    config: {

        institution: {

            name: "",

            faculty: "",

            program: "",

            academicLevel: "",

            modality: ""

        },



        curricular: {

            defaultCredits: 0,

            defaultUnits: 0,

            defaultLearningOutcomes: 0,

            defaultCompetencies: 0

        },



        pedagogical: {

            taxonomy: "Bloom",

            minimumQualityScore: 80,

            minimumDistractorScore: 80,

            allowAutomaticValidation: true

        },



        evaluation: {

            defaultDuration: 120,

            defaultQuestions: 40,

            allowMultipleVersions: true,

            randomizeQuestions: true

        },



        questionBank: {

            allowDuplicates: false,

            requireJustification: true,

            requireFeedback: true

        },



        blueprint: {

            validateBloomDistribution: true,

            validateDifficultyDistribution: true,

            requireLearningOutcomes: true

        },



        exam: {

            requireCurricularValidation: true,

            requirePedagogicalValidation: true,

            minimumQualityScore: 80

        },



        reports: {

            generateAnalytics: true,

            generateInstitutionalReport: true

        },



        export: {

            enableJSON: true,

            enableCSV: true,

            enablePDF: false,

            enableDOCX: false

        },



        system: {

            autosave: true,

            darkMode: false,

            debugMode: false

        }

    },



    //--------------------------------------------------
    // INICIALIZACIÓN
    //--------------------------------------------------

    init() {

        console.log(

            "Settings inicializado."

        );

        this.load();

    },



    //--------------------------------------------------
    // OBTENER CONFIGURACIÓN COMPLETA
    //--------------------------------------------------

    getAll() {

        return this.config;

    },



    //--------------------------------------------------
    // INSTITUCIÓN
    //--------------------------------------------------

    getInstitution() {

        return this.config.institution;

    },


    setInstitution(data) {

        Object.assign(

            this.config.institution,
            data

        );

    },



    //--------------------------------------------------
    // CONFIGURACIÓN CURRICULAR
    //--------------------------------------------------

    getCurricular() {

        return this.config.curricular;

    },


    setCurricular(data) {

        Object.assign(

            this.config.curricular,
            data

        );

    },



    //--------------------------------------------------
    // CONFIGURACIÓN PEDAGÓGICA
    //--------------------------------------------------

    getPedagogical() {

        return this.config.pedagogical;

    },


    setPedagogical(data) {

        Object.assign(

            this.config.pedagogical,
            data

        );

    },



    //--------------------------------------------------
    // CONFIGURACIÓN DE EVALUACIÓN
    //--------------------------------------------------

    getEvaluation() {

        return this.config.evaluation;

    },


    setEvaluation(data) {

        Object.assign(

            this.config.evaluation,
            data

        );

    },



    //--------------------------------------------------
    // BANCO DE PREGUNTAS
    //--------------------------------------------------

    getQuestionBankSettings() {

        return this.config.questionBank;

    },


    setQuestionBankSettings(data) {

        Object.assign(

            this.config.questionBank,
            data

        );

    },



    //--------------------------------------------------
    // BLUEPRINT
    //--------------------------------------------------

    getBlueprintSettings() {

        return this.config.blueprint;

    },


    setBlueprintSettings(data) {

        Object.assign(

            this.config.blueprint,
            data

        );

    },



    //--------------------------------------------------
    // EXAMEN
    //--------------------------------------------------

    getExamSettings() {

        return this.config.exam;

    },


    setExamSettings(data) {

        Object.assign(

            this.config.exam,
            data

        );

    },



    //--------------------------------------------------
    // REPORTES
    //--------------------------------------------------

    getReportSettings() {

        return this.config.reports;

    },


    setReportSettings(data) {

        Object.assign(

            this.config.reports,
            data

        );

    },



    //--------------------------------------------------
    // EXPORTACIÓN
    //--------------------------------------------------

    getExportSettings() {

        return this.config.export;

    },


    setExportSettings(data) {

        Object.assign(

            this.config.export,
            data

        );

    },



    //--------------------------------------------------
    // SISTEMA
    //--------------------------------------------------

    getSystemSettings() {

        return this.config.system;

    },


    setSystemSettings(data) {

        Object.assign(

            this.config.system,
            data

        );

    },



    //--------------------------------------------------
    // GUARDAR
    //--------------------------------------------------

    save() {

        localStorage.setItem(

            "SPAE_SETTINGS",

            JSON.stringify(
                this.config
            )

        );

    },



    //--------------------------------------------------
    // CARGAR
    //--------------------------------------------------

    load() {

        const data =

            localStorage.getItem(
                "SPAE_SETTINGS"
            );


        if (data) {

            this.config =

                JSON.parse(data);

        }

    },



    //--------------------------------------------------
    // RESTABLECER
    //--------------------------------------------------

    reset() {

        localStorage.removeItem(
            "SPAE_SETTINGS"
        );

        location.reload();

    },



    //--------------------------------------------------
    // EXPORTAR CONFIGURACIÓN
    //--------------------------------------------------

    exportSettings() {

        Exporter.exportCustom(

            "SPAE Settings",

            this.config

        );

    },



    //--------------------------------------------------
    // IMPORTAR CONFIGURACIÓN
    //--------------------------------------------------

    importSettings(data) {

        this.config = data;

        this.save();

    },



    //--------------------------------------------------
    // AUTOGUARDADO
    //--------------------------------------------------

    autoSave() {

        if (

            this.config.system.autosave

        ) {

            this.save();

        }

    },



    //--------------------------------------------------
    // VALIDACIONES
    //--------------------------------------------------

    validate() {

        return true;

    },



    //--------------------------------------------------
    // RESUMEN
    //--------------------------------------------------

    getSummary() {

        return {

            institution:

                this.config.institution.name,

            program:

                this.config.institution.program,

            taxonomy:

                this.config.pedagogical.taxonomy,

            duration:

                this.config.evaluation.defaultDuration

        };

    },



    //--------------------------------------------------
    // DEBUG
    //--------------------------------------------------

    debug() {

        console.table(

            this.config

        );

    }


};



/*********************************************************
 EXPORTACIÓN GLOBAL
*********************************************************/

window.Settings = Settings;



/*********************************************************
 INICIALIZACIÓN AUTOMÁTICA
*********************************************************/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        Settings.init();

    }

);
