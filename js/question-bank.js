/*********************************************************
 SPAE

 Sistema Profesional de Autoría de Evaluaciones

 Archivo:
 js/question-bank.js

 Versión:
 2.0 Professional Edition

*********************************************************/


const QuestionBank = {


    //--------------------------------------------------
    // ESTADO
    //--------------------------------------------------

    questions: [],

    currentQuestion: null,



    //--------------------------------------------------
    // INICIALIZACIÓN
    //--------------------------------------------------

    init() {

        this.loadQuestions();

        console.log(
            "QuestionBank inicializado."
        );

    },



    //--------------------------------------------------
    // CREAR PREGUNTA
    //--------------------------------------------------

    createQuestion(data = {}) {

        const question = {

            //--------------------------------------------------
            // IDENTIFICACIÓN
            //--------------------------------------------------

            id: Date.now(),

            code:
                this.generateCode(),


            //--------------------------------------------------
            // CURSO
            //--------------------------------------------------

            courseID:
                data.courseID || "",

            unitID:
                data.unitID || "",

            author:
                data.author || "",


            //--------------------------------------------------
            // PEDAGÓGICO
            //--------------------------------------------------

            learningOutcome:
                data.learningOutcome || "",

            competency:
                data.competency || "",

            bloomLevel:
                data.bloomLevel || "",

            difficulty:
                data.difficulty || "Medium",

            estimatedTime:
                data.estimatedTime || 90,

            type:
                data.type || "MCQ",


            //--------------------------------------------------
            // CONTENIDO
            //--------------------------------------------------

            stem:
                data.stem || "",

            options:
                data.options || [],

            correctAnswer:
                data.correctAnswer || "",

            justification:
                data.justification || "",

            feedback:
                data.feedback || "",


            //--------------------------------------------------
            // ETIQUETAS
            //--------------------------------------------------

            tags:
                data.tags || [],


            //--------------------------------------------------
            // CALIDAD
            //--------------------------------------------------

            quality: {

                qualityScore: 0,

                distractorScore: 0,

                bloomValidation: false,

                pedagogicalValidation: false

            },


            //--------------------------------------------------
            // HISTÓRICO
            //--------------------------------------------------

            usage: {

                timesUsed: 0,

                exams: [],

                lastUsed: null

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


        StorageManager.saveQuestion(
            question
        );


        this.questions.push(
            question
        );


        return question;

    },



    //--------------------------------------------------
    // CARGAR PREGUNTAS
    //--------------------------------------------------

    loadQuestions() {

        this.questions =

            StorageManager.getQuestions()

            || [];

    },



    //--------------------------------------------------
    // OBTENER TODAS
    //--------------------------------------------------

    getQuestions() {

        return this.questions;

    },



    //--------------------------------------------------
    // BUSCAR
    //--------------------------------------------------

    findQuestion(id) {

        return this.questions.find(

            question =>

            question.id === id

        );

    },



    //--------------------------------------------------
    // ELIMINAR
    //--------------------------------------------------

    deleteQuestion(id) {

        StorageManager.deleteQuestion(
            id
        );


        this.questions =

            this.questions.filter(

                question =>

                question.id !== id

            );

    },



    //--------------------------------------------------
    // DUPLICAR
    //--------------------------------------------------

    duplicateQuestion(id) {

        const question =

            this.findQuestion(id);


        if(!question) return;


        const copy = {

            ...question,

            id: Date.now(),

            code:
                this.generateCode()

        };


        this.createQuestion(copy);

    },



    //--------------------------------------------------
    // FILTROS
    //--------------------------------------------------

    filterByBloom(level){

        return this.questions.filter(

            q => q.bloomLevel === level

        );

    },


    filterByDifficulty(level){

        return this.questions.filter(

            q => q.difficulty === level

        );

    },


    filterByCourse(id){

        return this.questions.filter(

            q => q.courseID === id

        );

    },


    filterByType(type){

        return this.questions.filter(

            q => q.type === type

        );

    },


    filterByOutcome(outcome){

        return this.questions.filter(

            q =>

            q.learningOutcome === outcome

        );

    },


    //--------------------------------------------------
    // ANALÍTICAS
    //--------------------------------------------------

    getBloomDistribution(){

        const report = {};


        this.questions.forEach(question=>{

            const level =

                question.bloomLevel;

            report[level] =

                (report[level] || 0) + 1;

        });

        return report;

    },



    getDifficultyDistribution(){

        const report = {};


        this.questions.forEach(question=>{

            const level =

                question.difficulty;

            report[level] =

                (report[level] || 0) +1;

        });

        return report;

    },



    getStatistics(){

        return {

            totalQuestions:

                this.questions.length,

            MCQ:

                this.filterByType("MCQ").length,

            Essay:

                this.filterByType("Essay").length,

            Cases:

                this.filterByType("Case").length

        };

    },



    //--------------------------------------------------
    // VALIDACIÓN PEDAGÓGICA
    //--------------------------------------------------

    validateQuestion(question){

        if(!question.stem){

            return false;

        }


        if(!question.learningOutcome){

            return false;

        }


        if(!question.bloomLevel){

            return false;

        }


        return true;

    },



    //--------------------------------------------------
    // QUALITY SCORE
    //--------------------------------------------------

    calculateQualityScore(question){

        let score = 0;


        if(question.stem.length > 50)
            score += 25;

        if(question.justification)
            score += 25;

        if(question.feedback)
            score += 25;

        if(question.learningOutcome)
            score += 25;


        return score;

    },



    //--------------------------------------------------
    // HISTÓRICO
    //--------------------------------------------------

    registerUsage(id,examID){

        const question =

            this.findQuestion(id);


        if(!question){

            return;

        }


        question.usage.timesUsed++;

        question.usage.exams.push(
            examID
        );

        question.usage.lastUsed =
            new Date();

    },



    //--------------------------------------------------
    // EXPORTACIÓN
    //--------------------------------------------------

    exportQuestion(id){

        const question =

            this.findQuestion(id);


        if(!question){

            return;

        }


        Exporter.exportCustom(

            question.code,

            question

        );

    },



    //--------------------------------------------------
    // IMPORTACIÓN
    //--------------------------------------------------

    importQuestion(question){

        this.createQuestion(
            question
        );

    },



    //--------------------------------------------------
    // CÓDIGO AUTOMÁTICO
    //--------------------------------------------------

    generateCode(){

        return (

            "Q-"

            +

            Math.floor(

                Math.random()*100000

            )

        );

    },



    //--------------------------------------------------
    // RESUMEN
    //--------------------------------------------------

    getSummary(){

        return {

            total:

                this.questions.length,

            bloom:

                this.getBloomDistribution(),

            difficulty:

                this.getDifficultyDistribution()

        };

    },



    //--------------------------------------------------
    // DEBUG
    //--------------------------------------------------

    debug(){

        console.table(

            this.questions

        );

    }


};



/*********************************************************
EXPORTACIÓN GLOBAL
*********************************************************/

window.QuestionBank = QuestionBank;



/*********************************************************
INICIALIZACIÓN AUTOMÁTICA
*********************************************************/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        QuestionBank.init();

    }

);
