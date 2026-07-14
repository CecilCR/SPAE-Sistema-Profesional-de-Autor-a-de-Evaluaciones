/*==========================================================
 SPAE
 Sistema Profesional de Autoría de Evaluaciones

 js/distractor-engine.js
 Release 1.0

 Motor de generación y evaluación de distractores
==========================================================*/

const SPAEDistractorEngine = (() => {

"use strict";

/*==========================================================
 CONFIGURACIÓN
==========================================================*/

const CONFIG = {

    version: "1.0.0",

    minimumDistractors: 3,

    maximumDistractors: 4,

    minimumSimilarity: 0.35,

    maximumSimilarity: 0.85

};

/*==========================================================
 ESTADO
==========================================================*/

const state = {

    question: null,

    correctAnswer: "",

    distractors: [],

    analysis: null

};

/*==========================================================
 INICIALIZACIÓN
==========================================================*/

function init() {

    reset();

}

function reset() {

    state.question = null;

    state.correctAnswer = "";

    state.distractors = [];

    state.analysis = null;

}

/*==========================================================
 CONFIGURACIÓN
==========================================================*/

function setQuestion(question) {

    state.question = structuredClone(question);

    const correct =

        question.alternatives?.find(

            alternative => alternative.correct

        );

    state.correctAnswer =

        correct

            ? correct.text

            : "";

}

function currentQuestion() {

    return structuredClone(

        state.question

    );

}

function currentDistractors() {

    return structuredClone(

        state.distractors

    );

}

/*==========================================================
 UTILIDADES
==========================================================*/

function normalize(text = "") {

    return text

        .toLowerCase()

        .normalize("NFD")

        .replace(/[\u0300-\u036f]/g, "")

        .trim();

}

function tokenize(text = "") {

    return normalize(text)

        .split(/\s+/)

        .filter(Boolean);

}

function similarity(textA, textB) {

    const wordsA = new Set(

        tokenize(textA)

    );

    const wordsB = new Set(

        tokenize(textB)

    );

    let common = 0;

    wordsA.forEach(word => {

        if (wordsB.has(word)) {

            common++;

        }

    });

    const total =

        new Set([

            ...wordsA,

            ...wordsB

        ]).size;

    return total === 0

        ? 0

        : common / total;

}

/*==========================================================
 CREACIÓN
==========================================================*/

function addDistractor(text) {

    text = text.trim();

    if (!text) {

        return false;

    }

    state.distractors.push({

        id: crypto.randomUUID(),

        text,

        similarity:

            similarity(

                state.correctAnswer,

                text

            )

    });

    return true;

}

function removeDistractor(id) {

    state.distractors =

        state.distractors.filter(

            distractor =>

                distractor.id !== id

        );

}

function clearDistractors() {

    state.distractors = [];

}
/*==========================================================
 ANÁLISIS DE PLAUSIBILIDAD
==========================================================*/

function evaluateDistractor(distractor) {

    const result = {

        id: distractor.id,

        score: 100,

        observations: []

    };

    const similarityIndex = similarity(

        state.correctAnswer,

        distractor.text

    );

    if (

        similarityIndex <

        CONFIG.minimumSimilarity

    ) {

        result.score -= 25;

        result.observations.push(

            "El distractor es poco plausible respecto de la respuesta correcta."

        );

    }

    if (

        similarityIndex >

        CONFIG.maximumSimilarity

    ) {

        result.score -= 20;

        result.observations.push(

            "El distractor es excesivamente similar a la respuesta correcta."

        );

    }

    if (

        distractor.text.length < 8

    ) {

        result.score -= 15;

        result.observations.push(

            "La alternativa es demasiado breve."

        );

    }

    if (

        normalize(distractor.text) ===

        normalize(state.correctAnswer)

    ) {

        result.score = 0;

        result.observations.push(

            "El distractor coincide con la respuesta correcta."

        );

    }

    return result;

}

/*==========================================================
 EVALUACIÓN GLOBAL
==========================================================*/

function analyzeDistractors() {

    const analysis = {

        generatedAt:

            new Date().toISOString(),

        averageScore: 0,

        distractors: [],

        strengths: [],

        warnings: [],

        recommendations: []

    };

    let total = 0;

    state.distractors.forEach(

        distractor => {

            const evaluation =

                evaluateDistractor(

                    distractor

                );

            total += evaluation.score;

            analysis.distractors.push(

                evaluation

            );

        }

    );

    analysis.averageScore =

        state.distractors.length

            ? Math.round(

                total /

                state.distractors.length

            )

            : 0;

    if (

        analysis.averageScore >= 90

    ) {

        analysis.strengths.push(

            "Los distractores presentan una alta plausibilidad."

        );

    }

    if (

        analysis.averageScore < 80

    ) {

        analysis.warnings.push(

            "Se recomienda revisar la calidad de los distractores."

        );

    }

    state.analysis = analysis;

    return analysis;

}

/*==========================================================
 DETECCIÓN DE PISTAS
==========================================================*/

function detectClues() {

    if (

        !state.question ||

        !state.question.alternatives

    ) {

        return [];

    }

    const clues = [];

    const lengths =

        state.question.alternatives.map(

            alternative =>

                alternative.text.length

        );

    const longest =

        Math.max(...lengths);

    const shortest =

        Math.min(...lengths);

    if (

        longest >

        shortest * 2

    ) {

        clues.push(

            "Existe una diferencia importante de longitud entre alternativas."

        );

    }

    const correct =

        state.question.alternatives.find(

            alternative => alternative.correct

        );

    if (correct) {

        if (

            correct.text.length ===

            longest

        ) {

            clues.push(

                "La respuesta correcta es la alternativa más extensa."

            );

        }

    }

    return clues;

}

/*==========================================================
 GENERACIÓN AUTOMÁTICA BÁSICA
==========================================================*/

function generateFromKeywords() {

    if (

        !state.correctAnswer

    ) {

        return [];

    }

    clearDistractors();

    const words =

        tokenize(state.correctAnswer);

    words.forEach((word, index) => {

        if (

            index <

            CONFIG.minimumDistractors

        ) {

            addDistractor(

                `Aplicar ${word} sin considerar el contexto organizacional.`

            );

        }

    });

    return currentDistractors();

} 
/*==========================================================
 GENERACIÓN AVANZADA DE DISTRACTORES
==========================================================*/

function generatePedagogicalDistractors() {

    if (!state.question) {

        return [];

    }

    clearDistractors();

    const correct = state.correctAnswer;

    const bloom = state.question.bloom || "";

    const templates = [

        "Seleccionar una alternativa basada únicamente en la intuición, sin analizar la información disponible.",

        "Aplicar correctamente el concepto, pero en un contexto organizacional diferente al planteado.",

        "Confundir el procedimiento con el objetivo estratégico de la organización.",

        "Priorizar una acción técnicamente posible, pero inconsistente con el caso presentado.",

        "Elegir una decisión válida en otro escenario, aunque no resuelve el problema descrito."

    ];

    templates.forEach(template => {

        if (

            state.distractors.length <

            CONFIG.maximumDistractors

        ) {

            addDistractor(template);

        }

    });

    if (

        bloom.toLowerCase() === "recordar"

    ) {

        addDistractor(

            "Seleccionar un concepto relacionado, pero perteneciente a otra teoría."

        );

    }

    return currentDistractors();

}

/*==========================================================
 ESTADÍSTICAS
==========================================================*/

function statistics() {

    const analysis =

        state.analysis ||

        analyzeDistractors();

    return {

        totalDistractors:

            state.distractors.length,

        averageScore:

            analysis.averageScore,

        clues:

            detectClues().length,

        ready:

            analysis.averageScore >= 80

    };

}

/*==========================================================
 EXPORTACIÓN
==========================================================*/

function exportAnalysis() {

    return structuredClone(

        state.analysis ||

        analyzeDistractors()

    );

}

function exportJSON() {

    return JSON.stringify(

        exportAnalysis(),

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

    setQuestion,

    currentQuestion,

    currentDistractors,

    addDistractor,

    removeDistractor,

    clearDistractors,

    evaluateDistractor,

    analyzeDistractors,

    detectClues,

    generateFromKeywords,

    generatePedagogicalDistractors,

    statistics,

    exportAnalysis,

    exportJSON

};

})();

/*==========================================================
 INICIALIZACIÓN
==========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        SPAEDistractorEngine.init();

    }

);  
