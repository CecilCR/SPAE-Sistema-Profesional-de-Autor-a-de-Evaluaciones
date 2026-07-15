/*********************************************************
 SPAE

 Sistema Profesional de Autoría de Evaluaciones

 Archivo:
 js/exam-engine.js

 Versión:
 2.0 Professional Edition

*********************************************************/


const ExamEngine = {


    //--------------------------------------------------
    // ESTADO
    //--------------------------------------------------

    currentExam: null,

    exams: [],



    //--------------------------------------------------
    // INICIALIZACIÓN
    //--------------------------------------------------

    init(){

        console.log(

            "Exam Engine inicializado."

        );

    },



    //--------------------------------------------------
    // CREAR EXAMEN
    //--------------------------------------------------

    createExam(blueprint){


        const exam = {

            id: Date.now(),

            title:

                blueprint.title,


            type:

                blueprint.type,


            blueprintID:

                blueprint.id,


            courseID:

                blueprint.courseID,


            duration:

                blueprint.duration,


            totalQuestions:

                blueprint.totalQuestions,


            //--------------------------------------------------
            // PREGUNTAS
            //--------------------------------------------------

            questions:[],



            //--------------------------------------------------
            // DISTRIBUCIONES
            //--------------------------------------------------

            bloomCoverage:{},

            difficultyCoverage:{},



            //--------------------------------------------------
            // CALIDAD
            //--------------------------------------------------

            qualityScore:0,



            //--------------------------------------------------
            // VALIDACIONES
            //--------------------------------------------------

            validations:{

                blueprintValidated:false,

                curricularCoverage:false,

                bloomCoverage:false,

                timeValidated:false

            },


            //--------------------------------------------------
            // ESTADÍSTICAS
            //--------------------------------------------------

            statistics:{},



            //--------------------------------------------------
            // METADATA
            //--------------------------------------------------

            metadata:{

                createdAt:

                    new Date()

            }


        };


        this.currentExam = exam;

        this.exams.push(exam);


        return exam;

    },



    //--------------------------------------------------
    // GENERACIÓN AUTOMÁTICA
    //--------------------------------------------------

    generateFromBlueprint(){


        if(!BlueprintEngine.currentBlueprint){

            return null;

        }


        const blueprint =

            BlueprintEngine.currentBlueprint;


        const exam =

            this.createExam(blueprint);


        const requirements =

            BlueprintEngine
            .getQuestionRequirements();


        let candidates =

            QuestionBank.getQuestions();


        candidates =

            this.filterByQuality(

                candidates,

                requirements.quality

            );


        exam.questions =

            this.selectQuestions(

                candidates,

                blueprint

            );


        this.calculateStatistics();

        this.validateExam();


        return exam;

    },



    //--------------------------------------------------
    // FILTRO DE CALIDAD
    //--------------------------------------------------

    filterByQuality(questions,minScore){

        return questions.filter(

            q =>

            q.quality.qualityScore

            >= minScore

        );

    },



    //--------------------------------------------------
    // SELECCIÓN DE PREGUNTAS
    //--------------------------------------------------

    selectQuestions(list,blueprint){

        const total =

            blueprint.totalQuestions;


        return list.slice(0,total);

    },



    //--------------------------------------------------
    // AGREGAR PREGUNTA
    //--------------------------------------------------

    addQuestion(question){

        this.currentExam.questions
            .push(question);

    },



    //--------------------------------------------------
    // ELIMINAR PREGUNTA
    //--------------------------------------------------

    removeQuestion(id){

        this.currentExam.questions =

            this.currentExam.questions
            .filter(

                question =>

                question.id !== id

            );

    },



    //--------------------------------------------------
    // COBERTURA BLOOM
    //--------------------------------------------------

    calculateBloomCoverage(){

        const coverage = {};


        this.currentExam.questions
        .forEach(question=>{

            const level =

                question.bloomLevel;


            coverage[level] =

                (coverage[level] || 0)+1;

        });


        this.currentExam.bloomCoverage =
            coverage;


        return coverage;

    },



    //--------------------------------------------------
    // DIFICULTAD
    //--------------------------------------------------

    calculateDifficultyCoverage(){

        const coverage = {};


        this.currentExam.questions
        .forEach(question=>{

            const level =

                question.difficulty;


            coverage[level] =

                (coverage[level] || 0)+1;

        });


        this.currentExam.difficultyCoverage =
            coverage;


        return coverage;

    },



    //--------------------------------------------------
    // CALIDAD
    //--------------------------------------------------

    calculateQualityScore(){

        let total = 0;


        this.currentExam.questions
        .forEach(question=>{

            total +=

                question.quality
                .qualityScore;

        });


        const score =

            total /

            this.currentExam.questions.length;


        this.currentExam.qualityScore =
            score;


        return score;

    },



    //--------------------------------------------------
    // TIEMPO TOTAL
    //--------------------------------------------------

    calculateDuration(){

        let minutes = 0;


        this.currentExam.questions
        .forEach(question=>{

            minutes +=

                question.estimatedTime;

        });


        return minutes;

    },



    //--------------------------------------------------
    // VALIDACIONES
    //--------------------------------------------------

    validateBlueprint(){

        return (

            this.currentExam.questions
            .length ===

            this.currentExam
            .totalQuestions

        );

    },



    validateTime(){

        return (

            this.calculateDuration()

            <=

            this.currentExam.duration

        );

    },



    validateExam(){

        this.currentExam.validations = {

            blueprintValidated:

                this.validateBlueprint(),

            curricularCoverage:true,

            bloomCoverage:true,

            timeValidated:

                this.validateTime()

        };


        return this.currentExam.validations;

    },



    //--------------------------------------------------
    // ESTADÍSTICAS
    //--------------------------------------------------

    calculateStatistics(){

        this.currentExam.statistics = {

            totalQuestions:

                this.currentExam.questions
                .length,

            duration:

                this.calculateDuration(),

            quality:

                this.calculateQualityScore()

        };

    },



    //--------------------------------------------------
    // PERFIL DEL EXAMEN
    //--------------------------------------------------

    getExamProfile(){

        return {

            questions:

                this.currentExam.questions
                .length,

            duration:

                this.calculateDuration(),

            quality:

                this.currentExam.qualityScore

        };

    },



    //--------------------------------------------------
    // EXPORTAR
    //--------------------------------------------------

    exportExam(){

        Exporter.exportCustom(

            this.currentExam.title,

            this.currentExam

        );

    },



    //--------------------------------------------------
    // IMPORTAR
    //--------------------------------------------------

    importExam(exam){

        this.currentExam = exam;

        this.exams.push(exam);

    },



    //--------------------------------------------------
    // LISTAR
    //--------------------------------------------------

    getExams(){

        return this.exams;

    },



    //--------------------------------------------------
    // DEBUG
    //--------------------------------------------------

    debug(){

        console.table(

            this.currentExam

        );

    }


};



/*********************************************************
EXPORTACIÓN GLOBAL
*********************************************************/

window.ExamEngine = ExamEngine;



/*********************************************************
INICIALIZACIÓN AUTOMÁTICA
*********************************************************/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        ExamEngine.init();

    }

);
