/*==========================================================
 SPAE
 Sistema Profesional de Autoría de Evaluaciones

 js/bloom-engine.js
 Release 1.0

 Motor de Alineación Cognitiva
==========================================================*/

const SPAEBloomEngine = (() => {

"use strict";

/*==========================================================
 CONFIGURACIÓN
==========================================================*/

const CONFIG = {

    version: "1.0.0",

    minimumAlignment: 75,

    excellentAlignment: 90

};

/*==========================================================
 ESTADO
==========================================================*/

const state = {

    question: null,

    learningOutcome: null,

    report: null,

    scores: {

        bloom: 0,

        verb: 0,

        complexity: 0,

        alignment: 0

    }

};

/*==========================================================
 TAXONOMÍA DE BLOOM
==========================================================*/

const BLOOM = {

    recordar: {

        level: 1,

        color: "#4CAF50",

        verbs: [

            "definir",
            "identificar",
            "enumerar",
            "nombrar",
            "listar",
            "reconocer",
            "recordar",
            "describir",
            "indicar",
            "mencionar"

        ],

        expectedDifficulty: "baja"

    },

    comprender: {

        level: 2,

        color: "#8BC34A",

        verbs: [

            "explicar",
            "interpretar",
            "clasificar",
            "comparar",
            "resumir",
            "parafrasear",
            "relacionar",
            "distinguir",
            "discutir",
            "ilustrar"

        ],

        expectedDifficulty: "baja-media"

    },

    aplicar: {

        level: 3,

        color: "#FFC107",

        verbs: [

            "aplicar",
            "utilizar",
            "resolver",
            "implementar",
            "ejecutar",
            "demostrar",
            "emplear",
            "desarrollar",
            "operar",
            "calcular"

        ],

        expectedDifficulty: "media"

    },

    analizar: {

        level: 4,

        color: "#FF9800",

        verbs: [

            "analizar",
            "examinar",
            "diferenciar",
            "diagnosticar",
            "inferir",
            "contrastar",
            "categorizar",
            "determinar",
            "investigar",
            "descomponer"

        ],

        expectedDifficulty: "media-alta"

    },

    evaluar: {

        level: 5,

        color: "#F44336",

        verbs: [

            "evaluar",
            "justificar",
            "argumentar",
            "priorizar",
            "criticar",
            "seleccionar",
            "recomendar",
            "valorar",
            "defender",
            "decidir"

        ],

        expectedDifficulty: "alta"

    },

    crear: {

        level: 6,

        color: "#673AB7",

        verbs: [

            "diseñar",
            "formular",
            "proponer",
            "crear",
            "desarrollar",
            "construir",
            "planificar",
            "innovar",
            "elaborar",
            "proyectar"

        ],

        expectedDifficulty: "muy alta"

    }

};

/*==========================================================
 INICIALIZACIÓN
==========================================================*/

function init() {

    reset();

}

function reset() {

    state.question = null;

    state.learningOutcome = null;

    state.report = null;

    state.scores = {

        bloom: 0,

        verb: 0,

        complexity: 0,

        alignment: 0

    };

}

/*==========================================================
 CONFIGURACIÓN
==========================================================*/

function setQuestion(question) {

    state.question = structuredClone(question);

}

function setLearningOutcome(outcome) {

    state.learningOutcome = structuredClone(outcome);

}

function currentQuestion() {

    return structuredClone(state.question);

}

function currentLearningOutcome() {

    return structuredClone(state.learningOutcome);

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

function detectVerb(text = "") {

    const words = tokenize(text);

    for (const [level, data] of Object.entries(BLOOM)) {

        for (const verb of data.verbs) {

            if (words.includes(verb)) {

                return {

                    bloom: level,

                    verb,

                    levelNumber: data.level

                };

            }

        }

    }

    return null;

}
/*==========================================================
 DETECCIÓN DEL NIVEL DE BLOOM
==========================================================*/

function detectBloomLevel() {

    if (!state.question) {

        return null;

    }

    const text = [

        state.question.context || "",

        state.question.stem || ""

    ].join(" ");

    const detected = detectVerb(text);

    if (!detected) {

        return {

            declared:

                state.question.bloom || "",

            detected: "",

            confidence: 0

        };

    }

    return {

        declared:

            state.question.bloom || "",

        detected:

            detected.bloom,

        verb:

            detected.verb,

        confidence: 100

    };

}

/*==========================================================
 EVALUACIÓN DEL VERBO
==========================================================*/

function evaluateVerb() {

    const result = detectBloomLevel();

    let score = 0;

    const observations = [];

    if (!result.detected) {

        observations.push(

            "No fue posible identificar un verbo asociado a la Taxonomía de Bloom."

        );

    } else {

        score = 100;

        observations.push(

            `Se identificó el verbo "${result.verb}".`

        );

    }

    state.scores.verb = score;

    return {

        score,

        observations,

        detected: result

    };

}

/*==========================================================
 COHERENCIA BLOOM
==========================================================*/

function evaluateBloomAlignment() {

    const detected = detectBloomLevel();

    let score = 0;

    const observations = [];

    if (!state.question.bloom) {

        observations.push(

            "La pregunta no declara un nivel de Bloom."

        );

    } else if (

        detected.detected ===

        normalize(state.question.bloom)

    ) {

        score = 100;

        observations.push(

            "Existe coherencia entre el nivel declarado y el detectado."

        );

    } else {

        score = 40;

        observations.push(

            `El nivel declarado (${state.question.bloom}) no coincide con el verbo detectado (${detected.detected || "No identificado"}).`

        );

    }

    state.scores.bloom = score;

    return {

        score,

        observations

    };

}

/*==========================================================
 COMPLEJIDAD COGNITIVA
==========================================================*/

function evaluateComplexity() {

    if (!state.question) {

        return null;

    }

    let score = 100;

    const observations = [];

    const contextWords =

        tokenize(

            state.question.context || ""

        ).length;

    const stemWords =

        tokenize(

            state.question.stem || ""

        ).length;

    const totalWords =

        contextWords + stemWords;

    if (totalWords < 25) {

        score -= 30;

        observations.push(

            "La situación presenta una complejidad cognitiva baja."

        );

    }

    if (totalWords > 180) {

        score -= 15;

        observations.push(

            "La carga cognitiva podría ser elevada."

        );

    }

    if (

        state.question.alternatives?.length > 5

    ) {

        score -= 10;

    }

    state.scores.complexity =

        Math.max(score, 0);

    return {

        score:

            state.scores.complexity,

        observations

    };

}

/*==========================================================
 DIFICULTAD ESPERADA
==========================================================*/

function expectedDifficulty() {

    if (

        !state.question ||

        !state.question.bloom

    ) {

        return null;

    }

    const level = normalize(

        state.question.bloom

    );

    if (!BLOOM[level]) {

        return null;

    }

    return BLOOM[level]

        .expectedDifficulty;

}  
/*==========================================================
 COHERENCIA CON RESULTADO DE APRENDIZAJE
==========================================================*/

function evaluateLearningOutcomeAlignment() {

    let score = 0;

    const observations = [];

    if (!state.learningOutcome) {

        observations.push(

            "No se ha asociado un resultado de aprendizaje."

        );

        state.scores.alignment = score;

        return {

            score,

            observations

        };

    }

    const outcomeText = normalize(

        state.learningOutcome.description ||

        state.learningOutcome.statement ||

        ""

    );

    const detected = detectBloomLevel();

    if (

        detected.detected &&

        outcomeText.includes(detected.verb)

    ) {

        score = 100;

        observations.push(

            "El verbo del resultado de aprendizaje coincide con el utilizado en la pregunta."

        );

    } else {

        score = 65;

        observations.push(

            "Revise la correspondencia entre el resultado de aprendizaje y el verbo utilizado en la pregunta."

        );

    }

    state.scores.alignment = score;

    return {

        score,

        observations

    };

}

/*==========================================================
 CÁLCULO DEL ÍNDICE DE ALINEACIÓN
==========================================================*/

function calculateAlignmentIndex() {

    const values = [

        state.scores.bloom,

        state.scores.verb,

        state.scores.complexity,

        state.scores.alignment

    ];

    const average =

        values.reduce(

            (sum, value) => sum + value,

            0

        ) / values.length;

    return Math.round(average);

}

/*==========================================================
 NIVEL DE ALINEACIÓN
==========================================================*/

function alignmentLevel(score) {

    if (

        score >= CONFIG.excellentAlignment

    ) {

        return "Excelente";

    }

    if (

        score >= CONFIG.minimumAlignment

    ) {

        return "Adecuado";

    }

    if (

        score >= 60

    ) {

        return "Aceptable";

    }

    return "Insuficiente";

}

/*==========================================================
 RECOMENDACIONES
==========================================================*/

function recommendations() {

    const result = [];

    if (

        state.scores.bloom < 80

    ) {

        result.push(

            "Revise el nivel declarado de la Taxonomía de Bloom."

        );

    }

    if (

        state.scores.verb < 80

    ) {

        result.push(

            "Utilice un verbo claramente asociado al nivel cognitivo esperado."

        );

    }

    if (

        state.scores.complexity < 80

    ) {

        result.push(

            "Ajuste la complejidad del caso para favorecer el nivel cognitivo esperado."

        );

    }

    if (

        state.scores.alignment < 80

    ) {

        result.push(

            "Fortalezca la alineación entre la pregunta y el resultado de aprendizaje."

        );

    }

    return result;

}

/*==========================================================
 EVALUACIÓN GENERAL
==========================================================*/

function evaluate() {

    evaluateVerb();

    evaluateBloomAlignment();

    evaluateComplexity();

    evaluateLearningOutcomeAlignment();

    const index =

        calculateAlignmentIndex();

    state.report = {

        generatedAt:

            new Date().toISOString(),

        alignmentIndex:

            index,

        alignmentLevel:

            alignmentLevel(index),

        expectedDifficulty:

            expectedDifficulty(),

        scores:

            structuredClone(state.scores),

        recommendations:

            recommendations()

    };

    return getReport();

} 
/*==========================================================
 ESTADÍSTICAS
==========================================================*/

function statistics() {

    if (!state.report) {

        evaluate();

    }

    return {

        bloom:

            state.scores.bloom,

        verb:

            state.scores.verb,

        complexity:

            state.scores.complexity,

        alignment:

            state.scores.alignment,

        globalAlignment:

            state.report.alignmentIndex,

        quality:

            state.report.alignmentLevel

    };

}

/*==========================================================
 COMPARACIÓN ENTRE PREGUNTAS
==========================================================*/

function compare(questionA, questionB, learningOutcome = null) {

    const previousQuestion =

        state.question;

    const previousOutcome =

        state.learningOutcome;

    setQuestion(questionA);

    if (learningOutcome) {

        setLearningOutcome(

            learningOutcome

        );

    }

    const reportA = evaluate();

    setQuestion(questionB);

    if (learningOutcome) {

        setLearningOutcome(

            learningOutcome

        );

    }

    const reportB = evaluate();

    if (previousQuestion) {

        setQuestion(previousQuestion);

    }

    if (previousOutcome) {

        setLearningOutcome(previousOutcome);

    }

    return {

        first: reportA,

        second: reportB,

        difference:

            reportA.alignmentIndex -

            reportB.alignmentIndex,

        recommended:

            reportA.alignmentIndex >=

            reportB.alignmentIndex

                ? "first"

                : "second"

    };

}

/*==========================================================
 INFORME
==========================================================*/

function getReport() {

    if (!state.report) {

        evaluate();

    }

    return structuredClone(

        state.report

    );

}

/*==========================================================
 EXPORTACIÓN
==========================================================*/

function exportReport() {

    return structuredClone(

        getReport()

    );

}

function exportJSON() {

    return JSON.stringify(

        getReport(),

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

    setLearningOutcome,

    currentQuestion,

    currentLearningOutcome,

    detectVerb,

    detectBloomLevel,

    evaluateVerb,

    evaluateBloomAlignment,

    evaluateComplexity,

    evaluateLearningOutcomeAlignment,

    expectedDifficulty,

    calculateAlignmentIndex,

    alignmentLevel,

    recommendations,

    evaluate,

    statistics,

    compare,

    getReport,

    exportReport,

    exportJSON

};

})();

/*==========================================================
 INICIALIZACIÓN
==========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        SPAEBloomEngine.init();

    }

);  
