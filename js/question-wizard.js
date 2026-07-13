/*==========================================================
 SPAE
 Sistema Profesional de Autoría de Evaluaciones

 question-wizard.js
 Release 1.0

 Asistente para el diseño de preguntas
==========================================================*/

const SPAEQuestionWizard = (() => {

"use strict";

/*==========================================================
 CONFIGURACIÓN
==========================================================*/

const CONFIG = {

    maxStemLength: 350,

    maxAlternativeLength: 180,

    minAlternatives: 4,

    maxAlternatives: 5

};

/*==========================================================
 ESTADO
==========================================================*/

const state = {

    course: null,

    question: null,

    step: 1,

    maxStep: 8,

    advisorMessages: [],

    validation: []

};

/*==========================================================
 MODELO BASE
==========================================================*/

function createQuestion() {

    return {

        id: crypto.randomUUID(),

        code: "",

        title: "",

        unit: "",

        learningOutcomeId: "",

        bloom: "",

        cognitiveLevel: "",

        type: "multiple-choice",

        context: "",

        stem: "",

        alternatives: [

            {

                id: crypto.randomUUID(),

                text: "",

                correct: false

            },

            {

                id: crypto.randomUUID(),

                text: "",

                correct: false

            },

            {

                id: crypto.randomUUID(),

                text: "",

                correct: false

            },

            {

                id: crypto.randomUUID(),

                text: "",

                correct: false

            }

        ],

        justification: {

            correct: "",

            distractors: []

        },

        metadata: {

            professionalRole: "",

            organizationalContext: "",

            latamTerminology: true,

            authenticityScore: 0,

            cognitiveLoad: "",

            estimatedDifficulty: "",

            keywords: []

        },

        createdAt: new Date().toISOString(),

        updatedAt: new Date().toISOString()

    };

}

/*==========================================================
 INICIALIZACIÓN
==========================================================*/

function init(course = null) {

    state.course = course;

    state.question = createQuestion();

    state.step = 1;

}

/*==========================================================
 PREGUNTA ACTUAL
==========================================================*/

function currentQuestion() {

    return state.question;

}

/*==========================================================
 CURSO
==========================================================*/

function currentCourse() {

    return state.course;

}

/*==========================================================
 PASOS
==========================================================*/

function nextStep() {

    if (state.step < state.maxStep) {

        state.step++;

        SPAEUI.emit("wizard:step", state.step);

    }

}

function previousStep() {

    if (state.step > 1) {

        state.step--;

        SPAEUI.emit("wizard:step", state.step);

    }

}

function goToStep(step) {

    if (step < 1 || step > state.maxStep) {

        return;

    }

    state.step = step;

    SPAEUI.emit("wizard:step", state.step);

}

function currentStep() {

    return state.step;

}

/*==========================================================
 ACTUALIZAR DATOS
==========================================================*/

function update(data = {}) {

    Object.assign(state.question, data);

    state.question.updatedAt = new Date().toISOString();

}

/*==========================================================
 CONTEXTO
==========================================================*/

function setContext(text) {

    state.question.context = text.trim();

}

function setStem(text) {

    state.question.stem = text.trim();

}

function setBloom(level) {

    state.question.bloom = level;

}

function setLearningOutcome(id) {

    state.question.learningOutcomeId = id;

}

function setProfessionalRole(role) {

    state.question.metadata.professionalRole = role;

}

function setOrganizationalContext(context) {

    state.question.metadata.organizationalContext = context;

}

/*==========================================================
 ALTERNATIVAS
==========================================================*/

function addAlternative(text = "") {

    if (

        state.question.alternatives.length >=

        CONFIG.maxAlternatives

    ) {

        return false;

    }

    state.question.alternatives.push({

        id: crypto.randomUUID(),

        text,

        correct: false

    });

    return true;

}

function updateAlternative(id, text) {

    const alternative =

        state.question.alternatives.find(

            item => item.id === id

        );

    if (!alternative) {

        return;

    }

    alternative.text = text;

}

function removeAlternative(id) {

    if (

        state.question.alternatives.length <=

        CONFIG.minAlternatives

    ) {

        return false;

    }

    state.question.alternatives =

        state.question.alternatives.filter(

            item => item.id !== id

        );

    return true;

}

function setCorrectAlternative(id) {

    state.question.alternatives.forEach(

        alternative => {

            alternative.correct =

                alternative.id === id;

        }
/*==========================================================
 VALIDACIONES
==========================================================*/

function validateStem() {

    const errors = [];

    if (!state.question.context.trim()) {
        errors.push("Debe incorporar un contexto organizacional.");
    }

    if (!state.question.stem.trim()) {
        errors.push("Debe redactar el enunciado.");
    }

    if (
        state.question.stem.length >
        CONFIG.maxStemLength
    ) {
        errors.push(
            `El enunciado supera ${CONFIG.maxStemLength} caracteres.`
        );
    }

    return errors;

}

function validateAlternatives() {

    const errors = [];

    if (
        state.question.alternatives.length <
        CONFIG.minAlternatives
    ) {

        errors.push(
            "Debe existir un mínimo de cuatro alternativas."
        );

    }

    const correct =

        state.question.alternatives.filter(

            alt => alt.correct

        );

    if (correct.length !== 1) {

        errors.push(

            "Debe existir una única respuesta correcta."

        );

    }

    state.question.alternatives.forEach(

        (alternative, index) => {

            if (!alternative.text.trim()) {

                errors.push(

                    `La alternativa ${index + 1} está vacía.`

                );

            }

            if (

                alternative.text.length >

                CONFIG.maxAlternativeLength

            ) {

                errors.push(

                    `La alternativa ${index + 1} excede el tamaño permitido.`

                );

            }

        }

    );

    return errors;

}

function validateMetadata() {

    const errors = [];

    if (!state.question.learningOutcomeId) {

        errors.push(

            "Debe seleccionar un resultado de aprendizaje."

        );

    }

    if (!state.question.bloom) {

        errors.push(

            "Debe indicar el nivel de Bloom."

        );

    }

    if (

        !state.question.metadata.professionalRole

    ) {

        errors.push(

            "Debe definir el rol profesional."

        );

    }

    if (

        !state.question.metadata.organizationalContext

    ) {

        errors.push(

            "Debe indicar el contexto organizacional."

        );

    }

    return errors;

}

/*==========================================================
 VALIDACIÓN GENERAL
==========================================================*/

function validateQuestion() {

    const errors = [];

    errors.push(...validateStem());

    errors.push(...validateAlternatives());

    errors.push(...validateMetadata());

    state.validation = errors;

    return {

        valid: errors.length === 0,

        errors

    };

}

/*==========================================================
 JUSTIFICACIONES
==========================================================*/

function setCorrectJustification(text) {

    state.question.justification.correct =

        text.trim();

}

function setDistractorJustification(

    index,

    text

) {

    state.question.justification

        .distractors[index] = text.trim();

}

/*==========================================================
 PALABRAS CLAVE
==========================================================*/

function addKeyword(keyword) {

    keyword = keyword.trim();

    if (!keyword) {

        return;

    }

    if (

        state.question.metadata.keywords

            .includes(keyword)

    ) {

        return;

    }

    state.question.metadata.keywords

        .push(keyword);

}

function removeKeyword(keyword) {

    state.question.metadata.keywords =

        state.question.metadata.keywords.filter(

            item => item !== keyword

        );

}

/*==========================================================
 DIFICULTAD
==========================================================*/

function setDifficulty(level) {

    state.question.metadata

        .estimatedDifficulty = level;

}

function setCognitiveLoad(level) {

    state.question.metadata

        .cognitiveLoad = level;

}

/*==========================================================
 AUTENTICIDAD PROFESIONAL
==========================================================*/

function setAuthenticityScore(score) {

    state.question.metadata

        .authenticityScore = score;

}

/*==========================================================
 MENSAJES DEL ASESOR
==========================================================*/

function addAdvisorMessage(message) {

    state.advisorMessages.push({

        id: crypto.randomUUID(),

        message,

        createdAt:

            new Date().toISOString()

    });

}

function clearAdvisorMessages() {

    state.advisorMessages = [];

}

function advisorMessages() {

    return structuredClone(

        state.advisorMessages

    );

}
  /*==========================================================
 ANÁLISIS PEDAGÓGICO
==========================================================*/

function analyzeQuestion() {

    clearAdvisorMessages();

    analyzeProfessionalAuthenticity();

    analyzeBloomAlignment();

    analyzeContext();

    analyzeAlternatives();

    analyzeJustifications();

    analyzeLatamTerminology();

    return advisorMessages();

}

/*==========================================================
 AUTENTICIDAD PROFESIONAL
==========================================================*/

function analyzeProfessionalAuthenticity() {

    const q = state.question;

    if (!q.context.trim()) {

        addAdvisorMessage(
            "Incorpore una situación organizacional realista antes del enunciado."
        );

    }

    if (!q.metadata.professionalRole.trim()) {

        addAdvisorMessage(
            "Defina el rol profesional (gerente, coordinador, supervisor, líder de equipo, etc.)."
        );

    }

    if (!q.metadata.organizationalContext.trim()) {

        addAdvisorMessage(
            "Especifique el contexto organizacional donde ocurre la situación."
        );

    }

    const score = calculateAuthenticityScore();

    setAuthenticityScore(score);

}

/*==========================================================
 BLOOM
==========================================================*/

function analyzeBloomAlignment() {

    if (!state.question.bloom) {

        addAdvisorMessage(
            "Seleccione el nivel de la Taxonomía de Bloom."
        );

    }

}

/*==========================================================
 CONTEXTO
==========================================================*/

function analyzeContext() {

    const context =

        state.question.context.toLowerCase();

    if (context.length < 80) {

        addAdvisorMessage(
            "Amplíe el contexto para mejorar la autenticidad del caso."
        );

    }

}

/*==========================================================
 ALTERNATIVAS
==========================================================*/

function analyzeAlternatives() {

    const alternatives =

        state.question.alternatives;

    const duplicated = new Set();

    alternatives.forEach(a => {

        alternatives.forEach(b => {

            if (

                a.id !== b.id &&

                a.text.trim().toLowerCase() ===

                b.text.trim().toLowerCase()

            ) {

                duplicated.add(a.id);

            }

        });

    });

    if (duplicated.size > 0) {

        addAdvisorMessage(
            "Existen alternativas duplicadas."
        );

    }

}

/*==========================================================
 JUSTIFICACIONES
==========================================================*/

function analyzeJustifications() {

    if (

        !state.question.justification.correct

            .trim()

    ) {

        addAdvisorMessage(
            "Debe justificar la respuesta correcta."
        );

    }

    if (

        state.question.justification

            .distractors.length === 0

    ) {

        addAdvisorMessage(
            "Debe justificar por qué los distractores son incorrectos."
        );

    }

}

/*==========================================================
 TERMINOLOGÍA LATAM
==========================================================*/

function analyzeLatamTerminology() {

    if (

        !state.question.metadata.latamTerminology

    ) {

        addAdvisorMessage(
            "Utilice terminología empresarial habitual en Latinoamérica."
        );

    }

}

/*==========================================================
 INDICADORES
==========================================================*/

function calculateAuthenticityScore() {

    let score = 0;

    const q = state.question;

    if (q.context.trim()) score += 20;

    if (q.metadata.professionalRole) score += 20;

    if (q.metadata.organizationalContext) score += 20;

    if (q.learningOutcomeId) score += 20;

    if (q.bloom) score += 20;

    return score;

}

function qualityIndicator() {

    const validation = validateQuestion();

    return {

        valid: validation.valid,

        authenticity:

            calculateAuthenticityScore(),

        advisorMessages:

            state.advisorMessages.length,

        validationErrors:

            validation.errors.length

    };

}

/*==========================================================
 EXPORTAR
==========================================================*/

function exportQuestion() {

    return structuredClone(

        state.question

    );

}

function importQuestion(question) {

    state.question =

        structuredClone(question);

}

/*==========================================================
 REINICIAR
==========================================================*/

function reset() {

    state.question = createQuestion();

    state.step = 1;

    clearAdvisorMessages();

}

/*==========================================================
 API PÚBLICA
==========================================================*/

return {

    init,

    currentCourse,

    currentQuestion,

    currentStep,

    nextStep,

    previousStep,

    goToStep,

    update,

    reset,

    exportQuestion,

    importQuestion,

    validateQuestion,

    analyzeQuestion,

    qualityIndicator,

    setContext,

    setStem,

    setBloom,

    setLearningOutcome,

    setProfessionalRole,

    setOrganizationalContext,

    addAlternative,

    updateAlternative,

    removeAlternative,

    setCorrectAlternative,

    setCorrectJustification,

    setDistractorJustification,

    addKeyword,

    removeKeyword,

    setDifficulty,

    setCognitiveLoad,

    setAuthenticityScore,

    advisorMessages

};

})();

/*==========================================================
 INICIALIZACIÓN
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    SPAEQuestionWizard.init();

});

    );

}
