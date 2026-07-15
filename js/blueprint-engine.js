/*********************************************************
 SPAE

 Sistema Profesional de Autoría de Evaluaciones

 Archivo:
 js/blueprint-engine.js

 Versión:
 2.0 Professional Edition

*********************************************************/


const BlueprintEngine = {

    //--------------------------------------------------
    // ESTADO
    //--------------------------------------------------

    currentBlueprint: null,

    blueprints: [],



    //--------------------------------------------------
    // CONFIGURACIÓN POR DEFECTO
    //--------------------------------------------------

    DEFAULT_DURATION:120,

    DEFAULT_QUESTIONS:40,



    //--------------------------------------------------
    // INICIALIZACIÓN
    //--------------------------------------------------

    init(){

        console.log(

            "Blueprint Engine inicializado."

        );

    },



    //--------------------------------------------------
    // CREAR BLUEPRINT
    //--------------------------------------------------

    createBlueprint(data={}){


        const blueprint = {


            //--------------------------------------------------
            // IDENTIFICACIÓN
            //--------------------------------------------------

            id:Date.now(),

            title:

                data.title ||

                "Nuevo Blueprint",


            type:

                data.type ||

                "Partial",


            //--------------------------------------------------
            // CURSO
            //--------------------------------------------------

            courseID:

                data.courseID ||

                "",


            //--------------------------------------------------
            // EXAMEN
            //--------------------------------------------------

            duration:

                data.duration ||

                this.DEFAULT_DURATION,


            totalQuestions:

                data.totalQuestions ||

                this.DEFAULT_QUESTIONS,


            //--------------------------------------------------
            // COBERTURA CURRICULAR
            //--------------------------------------------------

            units:[],

            competencies:[],

            learningOutcomes:[],



            //--------------------------------------------------
            // BLOOM
            //--------------------------------------------------

            bloomDistribution:{

                remember:0,
                understand:0,
                apply:0,
                analyze:0,
                evaluate:0,
                create:0

            },


            //--------------------------------------------------
            // DIFICULTAD
            //--------------------------------------------------

            difficultyDistribution:{

                easy:30,
                medium:50,
                hard:20

            },


            //--------------------------------------------------
            // TIPOS DE PREGUNTA
            //--------------------------------------------------

            questionTypes:{

                MCQ:0,
                Case:0,
                Essay:0,
                ShortAnswer:0

            },


            //--------------------------------------------------
            // REGLAS PEDAGÓGICAS
            //--------------------------------------------------

            pedagogicalRules:[],



            //--------------------------------------------------
            // RESTRICCIONES
            //--------------------------------------------------

            constraints:{

                allowRepeatedQuestions:false,

                minimumQualityScore:80,

                minimumDistractorScore:70

            },


            //--------------------------------------------------
            // VALIDACIONES
            //--------------------------------------------------

            validations:{

                bloomValidated:false,

                curricularCoverage:false,

                difficultyValidated:false,

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

                    new Date(),

                updatedAt:

                    new Date()

            }

        };


        this.currentBlueprint = blueprint;

        this.blueprints.push(
            blueprint
        );


        return blueprint;

    },



    //--------------------------------------------------
    // BLOOM
    //--------------------------------------------------

    setBloomDistribution(data){

        this.currentBlueprint
            .bloomDistribution = data;

    },



    //--------------------------------------------------
    // DIFICULTAD
    //--------------------------------------------------

    setDifficultyDistribution(data){

        this.currentBlueprint
            .difficultyDistribution = data;

    },



    //--------------------------------------------------
    // TIPOS DE PREGUNTAS
    //--------------------------------------------------

    setQuestionTypes(data){

        this.currentBlueprint
            .questionTypes = data;

    },



    //--------------------------------------------------
    // RESULTADOS DE APRENDIZAJE
    //--------------------------------------------------

    addLearningOutcome(outcome){

        this.currentBlueprint
            .learningOutcomes
            .push(outcome);

    },



    //--------------------------------------------------
    // COMPETENCIAS
    //--------------------------------------------------

    addCompetency(data){

        this.currentBlueprint
            .competencies
            .push(data);

    },



    //--------------------------------------------------
    // UNIDADES
    //--------------------------------------------------

    addUnit(data){

        this.currentBlueprint
            .units
            .push(data);

    },



    //--------------------------------------------------
    // REGLAS PEDAGÓGICAS
    //--------------------------------------------------

    addRule(rule){

        this.currentBlueprint
            .pedagogicalRules
            .push(rule);

    },



    //--------------------------------------------------
    // VALIDACIONES
    //--------------------------------------------------

    validateBloom(){

        const bloom =

            this.currentBlueprint
            .bloomDistribution;


        let total = 0;


        Object.values(bloom)
        .forEach(item=>{

            total += item;

        });


        return total === 100;

    },



    validateDifficulty(){

        const difficulty =

            this.currentBlueprint
            .difficultyDistribution;


        let total = 0;


        Object.values(difficulty)
        .forEach(item=>{

            total += item;

        });


        return total === 100;

    },



    validateTime(){

        return (

            this.currentBlueprint
            .duration > 0

        );

    },



    validateQuestionTypes(){

        let total = 0;


        Object.values(

            this.currentBlueprint
            .questionTypes

        ).forEach(item=>{

            total += item;

        });


        return (

            total ===

            this.currentBlueprint
            .totalQuestions

        );

    },



    //--------------------------------------------------
    // VALIDACIÓN GENERAL
    //--------------------------------------------------

    validateBlueprint(){


        const result = {


            bloom:

                this.validateBloom(),

            difficulty:

                this.validateDifficulty(),

            time:

                this.validateTime(),

            questions:

                this.validateQuestionTypes()

        };


        this.currentBlueprint
        .validations = result;


        return result;

    },



    //--------------------------------------------------
    // ESTADÍSTICAS
    //--------------------------------------------------

    calculateStatistics(){


        const stats = {


            outcomes:

                this.currentBlueprint
                .learningOutcomes.length,

            competencies:

                this.currentBlueprint
                .competencies.length,

            units:

                this.currentBlueprint
                .units.length,

            duration:

                this.currentBlueprint
                .duration,

            questions:

                this.currentBlueprint
                .totalQuestions

        };


        this.currentBlueprint
        .statistics = stats;


        return stats;

    },



    //--------------------------------------------------
    // PERFIL PEDAGÓGICO
    //--------------------------------------------------

    getPedagogicalProfile(){

        return {

            bloom:

                this.currentBlueprint
                .bloomDistribution,

            difficulty:

                this.currentBlueprint
                .difficultyDistribution,

            outcomes:

                this.currentBlueprint
                .learningOutcomes.length,

            competencies:

                this.currentBlueprint
                .competencies.length

        };

    },



    //--------------------------------------------------
    // INTEGRACIÓN CON QUESTION BANK
    //--------------------------------------------------

    getQuestionRequirements(){

        return {

            bloom:

                this.currentBlueprint
                .bloomDistribution,

            difficulty:

                this.currentBlueprint
                .difficultyDistribution,

            types:

                this.currentBlueprint
                .questionTypes,

            quality:

                this.currentBlueprint
                .constraints
                .minimumQualityScore

        };

    },



    //--------------------------------------------------
    // EXPORTACIÓN
    //--------------------------------------------------

    exportBlueprint(){

        Exporter.exportCustom(

            this.currentBlueprint.title,

            this.currentBlueprint

        );

    },



    //--------------------------------------------------
    // IMPORTACIÓN
    //--------------------------------------------------

    importBlueprint(data){

        this.currentBlueprint = data;

        this.blueprints.push(
            data
        );

    },



    //--------------------------------------------------
    // RESUMEN
    //--------------------------------------------------

    getSummary(){

        return {

            title:

                this.currentBlueprint.title,

            questions:

                this.currentBlueprint
                .totalQuestions,

            duration:

                this.currentBlueprint
                .duration

        };

    },



    //--------------------------------------------------
    // DEBUG
    //--------------------------------------------------

    debug(){

        console.table(

            this.currentBlueprint

        );

    }


};


/*********************************************************
EXPORTACIÓN GLOBAL
*********************************************************/

window.BlueprintEngine = BlueprintEngine;



/*********************************************************
INICIALIZACIÓN AUTOMÁTICA
*********************************************************/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        BlueprintEngine.init();

    }

);
