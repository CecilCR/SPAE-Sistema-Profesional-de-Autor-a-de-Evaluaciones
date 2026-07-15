/*********************************************************
 SPAE
 Sistema Profesional de Autoría de Evaluaciones

 Archivo : js/course-manager.js
 Versión : 2.0 Professional Edition

 Núcleo curricular y pedagógico del sistema.

*********************************************************/


const CourseManager = {


    //--------------------------------------------------
    // ESTADO DEL SISTEMA
    //--------------------------------------------------

    currentCourse: null,



    //--------------------------------------------------
    // CONFIGURACIÓN POR DEFECTO
    //--------------------------------------------------

    DEFAULT_BLOOM = {

        remember: 0,
        understand: 0,
        apply: 0,
        analyze: 0,
        evaluate: 0,
        create: 0

    },


    DEFAULT_DIFFICULTY = {

        easy: 30,
        medium: 50,
        hard: 20

    },


    DEFAULT_QUESTION_TYPES = [

        "MCQ",
        "Case",
        "Essay",
        "Short Answer",
        "Matching",
        "True/False"

    ],



    //--------------------------------------------------
    // INICIALIZACIÓN
    //--------------------------------------------------

    init() {

        console.log(

            "CourseManager v2.0 inicializado."

        );

    },



    //--------------------------------------------------
    // CREAR CURSO
    //--------------------------------------------------

    createCourse(data = {}) {

        const course = {

            id: Date.now(),

            //--------------------------------------------------
            // INFORMACIÓN GENERAL
            //--------------------------------------------------

            name: data.name || "",
            code: data.code || "",
            program: data.program || "",
            level: data.level || "",
            semester: data.semester || "",
            modality: data.modality || "",
            credits: data.credits || 0,
            hours: data.hours || 0,
            period: data.period || "",
            teacher: data.teacher || "",
            description: data.description || "",


            //--------------------------------------------------
            // COMPONENTES CURRICULARES
            //--------------------------------------------------

            units: [],

            competencies: [],

            learningOutcomes: [],

            assessmentMatrix: [],


            //--------------------------------------------------
            // CONFIGURACIÓN PEDAGÓGICA
            //--------------------------------------------------

            pedagogicalConfiguration: {

                bloomDistribution:

                    structuredClone(
                        this.DEFAULT_BLOOM
                    ),

                difficultyDistribution:

                    structuredClone(
                        this.DEFAULT_DIFFICULTY
                    ),

                questionTypes:

                    [...this.DEFAULT_QUESTION_TYPES],

                estimatedTime: 120,

                minimumQuestions: 10,

                maximumQuestions: 60

            },


            //--------------------------------------------------
            // INTEGRACIONES
            //--------------------------------------------------

            questionBank: [],

            exams: [],


            //--------------------------------------------------
            // ANALÍTICAS
            //--------------------------------------------------

            statistics: {

                totalUnits: 0,
                totalOutcomes: 0,
                totalCompetencies: 0,
                totalQuestions: 0,
                totalExams: 0

            },


            //--------------------------------------------------
            // METADATA
            //--------------------------------------------------

            metadata: {

                createdAt:

                    new Date(),

                updatedAt:

                    new Date()

            }

        };


        StorageManager.saveCourse(course);

        Notifications.success(

            "Curso creado correctamente."

        );

        return course;

    },



    //--------------------------------------------------
    // CURSO ACTUAL
    //--------------------------------------------------

    setCurrentCourse(course){

        this.currentCourse = course;

    },


    getCurrentCourse(){

        return this.currentCourse;

    },


    clearCurrentCourse(){

        this.currentCourse = null;

    },



    //--------------------------------------------------
    // UNIDADES DE APRENDIZAJE
    //--------------------------------------------------

    addUnit(data){

        if(!this.currentCourse) return;

        this.currentCourse.units.push({

            id: Date.now(),

            title:
                data.title || "",

            description:
                data.description || "",

            topics:
                data.topics || []

        });

        this.updateStatistics();

    },


    getUnits(){

        return this.currentCourse?.units || [];

    },



    //--------------------------------------------------
    // RESULTADOS DE APRENDIZAJE
    //--------------------------------------------------

    addLearningOutcome(data){

        if(!this.currentCourse) return;


        this.currentCourse.learningOutcomes.push({

            id: Date.now(),

            code:
                data.code || "",

            description:
                data.description || "",

            bloomLevel:
                data.bloomLevel || "",

            weight:
                data.weight || 0

        });

        this.updateStatistics();

    },


    getLearningOutcomes(){

        return this.currentCourse?.learningOutcomes || [];

    },



    //--------------------------------------------------
    // COMPETENCIAS
    //--------------------------------------------------

    addCompetency(data){

        if(!this.currentCourse) return;


        this.currentCourse.competencies.push({

            id: Date.now(),

            type:
                data.type || "General",

            description:
                data.description || ""

        });

        this.updateStatistics();

    },


    getCompetencies(){

        return this.currentCourse?.competencies || [];

    },



    //--------------------------------------------------
    // MATRIZ DE EVALUACIÓN
    //--------------------------------------------------

    addAssessment(data){

        if(!this.currentCourse) return;


        this.currentCourse.assessmentMatrix.push({

            id: Date.now(),

            type:
                data.type,

            outcomes:
                data.outcomes || [],

            competencies:
                data.competencies || [],

            percentage:
                data.percentage || 0

        });

    },


    getAssessmentMatrix(){

        return this.currentCourse?.assessmentMatrix || [];

    },



    //--------------------------------------------------
    // CONFIGURACIÓN PEDAGÓGICA
    //--------------------------------------------------

    setBloomDistribution(data){

        if(!this.currentCourse) return;

        this.currentCourse
            .pedagogicalConfiguration
            .bloomDistribution = data;

    },


    setDifficultyDistribution(data){

        if(!this.currentCourse) return;

        this.currentCourse
            .pedagogicalConfiguration
            .difficultyDistribution = data;

    },


    setEstimatedTime(minutes){

        if(!this.currentCourse) return;

        this.currentCourse
            .pedagogicalConfiguration
            .estimatedTime = minutes;

    },


    addQuestionType(type){

        if(!this.currentCourse) return;

        this.currentCourse
            .pedagogicalConfiguration
            .questionTypes.push(type);

    },



    //--------------------------------------------------
    // BANCO DE PREGUNTAS
    //--------------------------------------------------

    linkQuestion(questionID){

        if(!this.currentCourse) return;

        this.currentCourse.questionBank.push(
            questionID
        );

    },



    //--------------------------------------------------
    // EXÁMENES
    //--------------------------------------------------

    linkExam(examID){

        if(!this.currentCourse) return;

        this.currentCourse.exams.push(
            examID
        );

    },



    //--------------------------------------------------
    // ANALÍTICAS
    //--------------------------------------------------

    updateStatistics(){

        if(!this.currentCourse) return;


        this.currentCourse.statistics = {

            totalUnits:

                this.currentCourse.units.length,

            totalOutcomes:

                this.currentCourse.learningOutcomes.length,

            totalCompetencies:

                this.currentCourse.competencies.length,

            totalQuestions:

                this.currentCourse.questionBank.length,

            totalExams:

                this.currentCourse.exams.length

        };

    },


    getStatistics(){

        return this.currentCourse?.statistics;

    },



    //--------------------------------------------------
    // COBERTURA BLOOM
    //--------------------------------------------------

    getBloomCoverage(){

        if(!this.currentCourse) return null;


        const coverage = {

            remember:0,
            understand:0,
            apply:0,
            analyze:0,
            evaluate:0,
            create:0

        };


        this.currentCourse.learningOutcomes
        .forEach(item=>{

            const level =
                item.bloomLevel.toLowerCase();

            if(coverage[level] !== undefined){

                coverage[level]++;

            }

        });


        return coverage;

    },



    //--------------------------------------------------
    // PERFIL PEDAGÓGICO
    //--------------------------------------------------

    getPedagogicalProfile(){

        if(!this.currentCourse) return null;


        return {

            bloom:

                this.currentCourse
                .pedagogicalConfiguration
                .bloomDistribution,

            difficulty:

                this.currentCourse
                .pedagogicalConfiguration
                .difficultyDistribution,

            outcomes:

                this.currentCourse
                .learningOutcomes.length,

            competencies:

                this.currentCourse
                .competencies.length,

            units:

                this.currentCourse
                .units.length

        };

    },



    //--------------------------------------------------
    // EXPORTACIÓN
    //--------------------------------------------------

    exportCurrentCourse(){

        if(!this.currentCourse) return;

        Exporter.exportCustom(

            this.currentCourse.name,

            this.currentCourse

        );

    },



    //--------------------------------------------------
    // VALIDACIONES PEDAGÓGICAS
    //--------------------------------------------------

    validateCourse(){

        if(!this.currentCourse){

            return false;

        }

        return (

            this.currentCourse.name !== "" &&
            this.currentCourse.code !== "" &&
            this.currentCourse.learningOutcomes.length > 0

        );

    },



    //--------------------------------------------------
    // RESUMEN CURRICULAR
    //--------------------------------------------------

    getCurricularSummary(){

        if(!this.currentCourse) return null;


        return {

            name:

                this.currentCourse.name,

            program:

                this.currentCourse.program,

            credits:

                this.currentCourse.credits,

            outcomes:

                this.currentCourse.learningOutcomes.length,

            competencies:

                this.currentCourse.competencies.length,

            units:

                this.currentCourse.units.length,

            exams:

                this.currentCourse.exams.length

        };

    },



    //--------------------------------------------------
    // DEBUG
    //--------------------------------------------------

    debug(){

        console.table(

            this.currentCourse

        );

    }


};


/*********************************************************
EXPORTACIÓN GLOBAL
*********************************************************/

window.CourseManager = CourseManager;



/*********************************************************
INICIALIZACIÓN AUTOMÁTICA
*********************************************************/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        CourseManager.init();

    }

);
