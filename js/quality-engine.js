/*==========================================================
 SPAE
 Sistema Profesional de Autoría de Evaluaciones

 js/quality-engine.js
 Release 1.0

 Motor Integral de Calidad Pedagógica
==========================================================*/

const SPAEQualityEngine = (() => {

"use strict";

/*==========================================================
 CONFIGURACIÓN
==========================================================*/

const CONFIG = {

    version: "1.0.0",

    passingScore: 80,

    excellentScore: 95,

    weights: {

        alignment: 20,

        bloom: 15,

        authenticity: 15,

        stem: 15,

        alternatives: 15,

        distractors: 10,

        language: 5,

        cognitiveLoad: 5

    }

};

/*==========================================================
 ESTADO
==========================================================*/

const state = {

    question: null,

    report: null,

    scores: {},

    strengths: [],

    warnings: [],

    recommendations: []

};

/*==========================================================
 MODELO BASE
==========================================================*/

function createReport() {

    return {

        generatedAt: new Date().toISOString(),

        globalScore: 0,

        qualityLevel: "",

        scores: {},

        strengths: [],

        warnings: [],

        recommendations: [],

        indicators: {}

    };

}

/*==========================================================
 INICIALIZACIÓN
==========================================================*/

function init() {

    reset();

}

function reset() {

    state.question = null;

    state.report = createReport();

    state.scores = {

        alignment: 0,

        bloom: 0,

        authenticity: 0,

        stem: 0,

        alternatives: 0,

        distractors: 0,

        language: 0,

        cognitiveLoad: 0

    };

    state.strengths = [];

    state.warnings = [];

    state.recommendations = [];

}

/*==========================================================
 UTILIDADES
==========================================================*/

function addStrength(text) {

    state.strengths.push(text);

}

function addWarning(text) {

    state.warnings.push(text);

}

function addRecommendation(text) {

    state.recommendations.push(text);

}

function normalize(text = "") {

    return text

        .toLowerCase()

        .normalize("NFD")

        .replace(/[\u0300-\u036f]/g, "")

        .trim();

}

function wordCount(text = "") {

    return text

        .trim()

        .split(/\s+/)

        .filter(Boolean)

        .length;

}

/*==========================================================
 EVALUACIÓN GENERAL
==========================================================*/

function evaluate(question) {

    reset();

    state.question = structuredClone(question);

    evaluateLearningOutcome();

    evaluateBloom();

    evaluateStem();

    evaluateContext();

    evaluateAlternatives();

    evaluateDistractors();

    evaluateLanguage();

    evaluateCognitiveLoad();

    calculateGlobalScore();

    buildReport();

    return getReport();

}

/*==========================================================
 RESULTADO DE APRENDIZAJE
==========================================================*/

function evaluateLearningOutcome() {

    let score = 0;

    if (

        state.question.learningOutcomeId

    ) {

        score = 100;

        addStrength(

            "La pregunta se encuentra alineada con un resultado de aprendizaje."

        );

    } else {

        addWarning(

            "No existe un resultado de aprendizaje asociado."

        );

        addRecommendation(

            "Seleccione el resultado de aprendizaje antes de utilizar la pregunta."

        );

    }

    state.scores.alignment = score;

}

/*==========================================================
 TAXONOMÍA DE BLOOM
==========================================================*/

function evaluateBloom() {

    let score = 0;

    if (

        state.question.bloom

    ) {

        score = 100;

        addStrength(

            "La pregunta posee un nivel cognitivo declarado."

        );

    } else {

        addWarning(

            "No se ha definido el nivel de Bloom."

        );

    }

    state.scores.bloom = score;

}

/*==========================================================
 ENUNCIADO
==========================================================*/

function evaluateStem() {

    let score = 100;

    const stem = state.question.stem || "";

    if (wordCount(stem) < 8) {

        score -= 25;

        addRecommendation(

            "Amplíe el enunciado para mejorar la precisión."

        );

    }

    if (stem.length > 300) {

        score -= 20;

        addRecommendation(

            "El enunciado es demasiado extenso."

        );

    }

    if (

        normalize(stem).includes("excepto")

    ) {

        score -= 10;

        addWarning(

            "Evite preguntas formuladas en negativo."

        );

    }

    state.scores.stem = Math.max(score, 0);

}
/*==========================================================
 EVALUACIÓN DEL CONTEXTO
==========================================================*/

function evaluateContext() {

    let score = 100;

    const context = state.question.context || "";

    if (!context.trim()) {

        score = 0;

        addWarning(
            "La pregunta no presenta un contexto de aplicación."
        );

        addRecommendation(
            "Incorpore una situación organizacional previa al enunciado."
        );

        state.scores.authenticity = score;

        return;

    }

    const words = wordCount(context);

    if (words < 40) {

        score -= 25;

        addRecommendation(
            "Desarrolle un contexto más completo."
        );

    }

    if (words > 250) {

        score -= 15;

        addRecommendation(
            "Reduzca la longitud del contexto."
        );

    }

    const professionalTerms = [

        "empresa",
        "organización",
        "gerente",
        "coordinador",
        "supervisor",
        "equipo",
        "cliente",
        "proveedor",
        "proyecto",
        "proceso",
        "colaborador",
        "departamento",
        "área",
        "dirección",
        "liderazgo",
        "indicador",
        "desempeño",
        "productividad",
        "presupuesto",
        "planificación"

    ];

    const normalized = normalize(context);

    let matches = 0;

    professionalTerms.forEach(term => {

        if (normalized.includes(term)) {

            matches++;

        }

    });

    if (matches < 3) {

        score -= 20;

        addRecommendation(
            "El contexto debería incorporar mayor terminología profesional."
        );

    } else {

        addStrength(
            "El contexto utiliza terminología propia del ámbito organizacional."
        );

    }

    state.scores.authenticity = Math.max(score, 0);

}

/*==========================================================
 EVALUACIÓN DE ALTERNATIVAS
==========================================================*/

function evaluateAlternatives() {

    let score = 100;

    const alternatives =

        state.question.alternatives || [];

    if (alternatives.length < 4) {

        score -= 50;

        addWarning(
            "La pregunta posee menos de cuatro alternativas."
        );

    }

    const correct = alternatives.filter(

        alternative => alternative.correct

    );

    if (correct.length !== 1) {

        score -= 40;

        addWarning(
            "Debe existir exactamente una respuesta correcta."
        );

    }

    const empty = alternatives.filter(

        alternative =>

            !alternative.text.trim()

    );

    if (empty.length > 0) {

        score -= empty.length * 10;

        addRecommendation(
            "Complete todas las alternativas."
        );

    }

    const sizes = alternatives.map(

        alternative =>

            alternative.text.length

    );

    const average =

        sizes.reduce(

            (total, value) => total + value,

            0

        ) / Math.max(sizes.length, 1);

    sizes.forEach(size => {

        if (

            Math.abs(size - average) >

            average * 0.60

        ) {

            score -= 5;

        }

    });

    if (score >= 90) {

        addStrength(
            "Las alternativas presentan una estructura homogénea."
        );

    }

    state.scores.alternatives =

        Math.max(score, 0);

}

/*==========================================================
 EVALUACIÓN DE DISTRACTORES
==========================================================*/

function evaluateDistractors() {

    let score = 100;

    const alternatives =

        state.question.alternatives || [];

    const normalized = alternatives.map(

        alternative =>

            normalize(alternative.text)

    );

    const unique = new Set(normalized);

    if (

        unique.size !== alternatives.length

    ) {

        score -= 35;

        addWarning(
            "Existen distractores duplicados."
        );

    }

    const correct = alternatives.find(

        alternative => alternative.correct

    );

    if (correct) {

        alternatives.forEach(alternative => {

            if (

                alternative.id !== correct.id &&

                normalize(alternative.text) ===

                normalize(correct.text)

            ) {

                score -= 50;

            }

        });

    }

    alternatives.forEach(alternative => {

        const words =

            wordCount(alternative.text);

        if (

            words < 2

        ) {

            score -= 10;

        }

    });

    if (score >= 85) {

        addStrength(
            "Los distractores presentan una adecuada diferenciación."
        );

    } else {

        addRecommendation(
            "Revise la plausibilidad y calidad de los distractores."
        );

    }

    state.scores.distractors =

        Math.max(score, 0);

} 
/*==========================================================
 CALIDAD LINGÜÍSTICA
==========================================================*/

function evaluateLanguage() {

    let score = 100;

    const question = state.question;

    const text = [

        question.context || "",

        question.stem || ""

    ].join(" ");

    const normalized = normalize(text);

    const forbiddenExpressions = [

        "siempre",

        "nunca",

        "todos",

        "ninguno",

        "obviamente",

        "evidentemente",

        "claramente"

    ];

    forbiddenExpressions.forEach(expression => {

        if (normalized.includes(expression)) {

            score -= 8;

            addRecommendation(

                `Evite utilizar expresiones absolutas como "${expression}".`

            );

        }

    });

    if (

        question.stem.trim().endsWith(":")

    ) {

        score -= 5;

    }

    if (

        question.stem.includes("??")

    ) {

        score -= 10;

    }

    if (

        wordCount(question.stem) < 8

    ) {

        score -= 10;

    }

    if (

        score >= 90

    ) {

        addStrength(

            "La redacción presenta buena claridad lingüística."

        );

    }

    state.scores.language =

        Math.max(score, 0);

}

/*==========================================================
 CARGA COGNITIVA
==========================================================*/

function evaluateCognitiveLoad() {

    let score = 100;

    const totalWords =

        wordCount(state.question.context) +

        wordCount(state.question.stem);

    if (

        totalWords > 220

    ) {

        score -= 30;

        addRecommendation(

            "Reduzca la extensión del caso para disminuir la carga cognitiva."

        );

    }

    if (

        totalWords > 160

    ) {

        score -= 15;

    }

    if (

        state.question.alternatives.length > 5

    ) {

        score -= 10;

    }

    state.scores.cognitiveLoad =

        Math.max(score, 0);

}

/*==========================================================
 PUNTAJE GLOBAL
==========================================================*/

function calculateGlobalScore() {

    const weights = CONFIG.weights;

    let weighted = 0;

    let totalWeight = 0;

    Object.keys(weights).forEach(key => {

        weighted +=

            state.scores[key] *

            weights[key];

        totalWeight +=

            weights[key];

    });

    state.report.globalScore =

        Math.round(

            weighted / totalWeight

        );

}

/*==========================================================
 NIVEL DE CALIDAD
==========================================================*/

function determineQualityLevel() {

    const score =

        state.report.globalScore;

    if (

        score >= CONFIG.excellentScore

    ) {

        return "Excelente";

    }

    if (

        score >= CONFIG.passingScore

    ) {

        return "Adecuada";

    }

    if (

        score >= 60

    ) {

        return "Aceptable con mejoras";

    }

    return "Requiere rediseño";

}

/*==========================================================
 CONSTRUCCIÓN DEL INFORME
==========================================================*/

function buildReport() {

    state.report.generatedAt =

        new Date().toISOString();

    state.report.qualityLevel =

        determineQualityLevel();

    state.report.scores =

        structuredClone(

            state.scores

        );

    state.report.strengths =

        [...state.strengths];

    state.report.warnings =

        [...state.warnings];

    state.report.recommendations =

        [...state.recommendations];

    state.report.indicators = {

        totalStrengths:

            state.strengths.length,

        totalWarnings:

            state.warnings.length,

        totalRecommendations:

            state.recommendations.length,

        readyForExam:

            state.report.globalScore >=

            CONFIG.passingScore

    };

}

/*==========================================================
 INFORME
==========================================================*/

function getReport() {

    return structuredClone(

        state.report

    );

} 
/*==========================================================
 ANÁLISIS COMPARATIVO
==========================================================*/

function compare(questionA, questionB) {

    const reportA = evaluate(questionA);

    const reportB = evaluate(questionB);

    return {

        first: reportA,

        second: reportB,

        difference:

            reportA.globalScore -

            reportB.globalScore,

        better:

            reportA.globalScore >= reportB.globalScore

                ? "first"

                : "second"

    };

}

/*==========================================================
 RESUMEN EJECUTIVO
==========================================================*/

function executiveSummary() {

    return {

        score:

            state.report.globalScore,

        quality:

            state.report.qualityLevel,

        ready:

            state.report.indicators.readyForExam,

        strengths:

            state.strengths.length,

        warnings:

            state.warnings.length,

        recommendations:

            state.recommendations.length

    };

}

/*==========================================================
 EXPORTACIÓN
==========================================================*/

function exportReport() {

    return structuredClone(

        state.report

    );

}

function exportJSON() {

    return JSON.stringify(

        state.report,

        null,

        2

    );

}

/*==========================================================
 API PÚBLICA
==========================================================*/

return {

    init,

    reset,

    evaluate,

    getReport,

    exportReport,

    exportJSON,

    executiveSummary,

    compare,

    evaluateLearningOutcome,

    evaluateBloom,

    evaluateStem,

    evaluateContext,

    evaluateAlternatives,

    evaluateDistractors,

    evaluateLanguage,

    evaluateCognitiveLoad,

    calculateGlobalScore

};

})();

/*==========================================================
 INICIALIZACIÓN
==========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        SPAEQualityEngine.init();

    }

);  
