/*==========================================================
 SPAE
 Sistema Profesional de Autoría de Evaluaciones

 js/advisor-engine.js
 Release 1.0

 Motor Central de Asesoría Pedagógica
==========================================================*/

const SPAEAdvisorEngine = (() => {

"use strict";

/*==========================================================
 CONFIGURACIÓN
==========================================================*/

const CONFIG = {

    version: "1.0.0",

    minimumApproval: 80,

    excellent: 95

};

/*==========================================================
 ESTADO
==========================================================*/

const state = {

    question: null,

    course: null,

    learningOutcome: null,

    reports: {},

    finalReport: null

};

/*==========================================================
 INICIALIZACIÓN
==========================================================*/

function init(){

    reset();

}

function reset(){

    state.question = null;

    state.course = null;

    state.learningOutcome = null;

    state.reports = {};

    state.finalReport = null;

}

/*==========================================================
 CONFIGURACIÓN
==========================================================*/

function setQuestion(question){

    state.question = structuredClone(question);

}

function setCourse(course){

    state.course = structuredClone(course);

}

function setLearningOutcome(outcome){

    state.learningOutcome = structuredClone(outcome);

}

function currentQuestion(){

    return structuredClone(state.question);

}

/*==========================================================
 EJECUTAR MOTORES
==========================================================*/

function runBloomEngine(){

    SPAEBloomEngine.reset();

    SPAEBloomEngine.setQuestion(

        state.question

    );

    if(state.learningOutcome){

        SPAEBloomEngine.setLearningOutcome(

            state.learningOutcome

        );

    }

    state.reports.bloom =

        SPAEBloomEngine.evaluate();

}

function runQualityEngine(){

    state.reports.quality =

        SPAEQualityEngine.evaluate(

            state.question

        );

}

function runPedagogicalEngine(){

    state.reports.pedagogical =

        SPAEPedagogicalAdvisor.evaluate(

            state.question

        );

}

function runDistractorEngine(){

    SPAEDistractorEngine.reset();

    SPAEDistractorEngine.setQuestion(

        state.question

    );

    state.reports.distractors =

        SPAEDistractorEngine

            .analyzeDistractors();

}
/*==========================================================
 INTEGRACIÓN DE INFORMES
==========================================================*/

function consolidateReports() {

    const report = {

        generatedAt:

            new Date().toISOString(),

        modules: {},

        strengths: [],

        warnings: [],

        recommendations: []

    };

    /*------------------------------------------
      Calidad
    ------------------------------------------*/

    if (state.reports.quality) {

        report.modules.quality =

            structuredClone(

                state.reports.quality

            );

        report.strengths.push(

            ...(state.reports.quality.strengths || [])

        );

        report.warnings.push(

            ...(state.reports.quality.warnings || [])

        );

        report.recommendations.push(

            ...(state.reports.quality.recommendations || [])

        );

    }

    /*------------------------------------------
      Bloom
    ------------------------------------------*/

    if (state.reports.bloom) {

        report.modules.bloom =

            structuredClone(

                state.reports.bloom

            );

        report.recommendations.push(

            ...(state.reports.bloom.recommendations || [])

        );

    }

    /*------------------------------------------
      Pedagógico
    ------------------------------------------*/

    if (state.reports.pedagogical) {

        report.modules.pedagogical =

            structuredClone(

                state.reports.pedagogical

            );

        report.strengths.push(

            ...(state.reports.pedagogical.strengths || [])

        );

        report.warnings.push(

            ...(state.reports.pedagogical.warnings || [])

        );

        report.recommendations.push(

            ...(state.reports.pedagogical.recommendations || [])

        );

    }

    /*------------------------------------------
      Distractores
    ------------------------------------------*/

    if (state.reports.distractors) {

        report.modules.distractors =

            structuredClone(

                state.reports.distractors

            );

        report.strengths.push(

            ...(state.reports.distractors.strengths || [])

        );

        report.warnings.push(

            ...(state.reports.distractors.warnings || [])

        );

        report.recommendations.push(

            ...(state.reports.distractors.recommendations || [])

        );

    }

    report.strengths =

        [...new Set(report.strengths)];

    report.warnings =

        [...new Set(report.warnings)];

    report.recommendations =

        [...new Set(report.recommendations)];

    return report;

}

/*==========================================================
 ÍNDICE PEDAGÓGICO GLOBAL
==========================================================*/

function calculateGlobalIndex() {

    const scores = [];

    if (

        state.reports.quality?.globalScore !== undefined

    ) {

        scores.push(

            state.reports.quality.globalScore

        );

    }

    if (

        state.reports.bloom?.alignmentIndex !== undefined

    ) {

        scores.push(

            state.reports.bloom.alignmentIndex

        );

    }

    if (

        state.reports.pedagogical?.scores?.overall !== undefined

    ) {

        scores.push(

            state.reports.pedagogical.scores.overall

        );

    }

    if (

        state.reports.distractors?.averageScore !== undefined

    ) {

        scores.push(

            state.reports.distractors.averageScore

        );

    }

    if (!scores.length) {

        return 0;

    }

    return Math.round(

        scores.reduce(

            (sum, value) => sum + value,

            0

        ) / scores.length

    );

}

/*==========================================================
 NIVEL GLOBAL
==========================================================*/

function qualityLevel(score) {

    if (

        score >= CONFIG.excellent

    ) {

        return "Excelente";

    }

    if (

        score >= CONFIG.minimumApproval

    ) {

        return "Adecuado";

    }

    if (

        score >= 60

    ) {

        return "Requiere mejoras";

    }

    return "Rediseño recomendado";

}

/*==========================================================
 OBSERVACIONES GENERALES
==========================================================*/

function generateGeneralObservations() {

    const observations = [];

    const score = calculateGlobalIndex();

    if (

        score >= CONFIG.excellent

    ) {

        observations.push(

            "La pregunta presenta una calidad pedagógica sobresaliente."

        );

    } else if (

        score >= CONFIG.minimumApproval

    ) {

        observations.push(

            "La pregunta es adecuada para su utilización con ajustes menores."

        );

    } else {

        observations.push(

            "Se recomienda revisar la pregunta antes de incorporarla al examen."

        );

    }

    return observations;

}  
