```javascript
/*==========================================================
 SPAE
 Sistema Profesional de Autoría de Evaluaciones

 exam-builder.js
 Release 1.0

 Constructor de exámenes
==========================================================*/

const SPAEExamBuilder = (() => {

"use strict";

/*==========================================================
 CONFIGURACIÓN
==========================================================*/

const CONFIG = {

    maxSections: 10,

    maxQuestionsPerSection: 100,

    defaultDuration: 90,

    defaultScore: 20,

    version: "1.0.0"

};

/*==========================================================
 ESTADO
==========================================================*/

const state = {

    exam: null,

    course: null,

    questionBank: [],

    selectedQuestions: [],

    validation: []

};

/*==========================================================
 MODELO BASE
==========================================================*/

function createExam() {

    return {

        id: crypto.randomUUID(),

        code: "",

        title: "",

        subtitle: "",

        description: "",

        courseId: "",

        teacher: "",

        academicPeriod: "",

        semester: "",

        duration: CONFIG.defaultDuration,

        totalScore: CONFIG.defaultScore,

        instructions: [],

        sections: [],

        metadata: {

            createdAt: new Date().toISOString(),

            updatedAt: new Date().toISOString(),

            version: CONFIG.version

        }

    };

}

/*==========================================================
 INICIALIZACIÓN
==========================================================*/

function init(course = null) {

    state.course = course;

    state.exam = createExam();

    state.questionBank = [];

    state.selectedQuestions = [];

    state.validation = [];

}

/*==========================================================
 EXAMEN ACTUAL
==========================================================*/

function currentExam() {

    return state.exam;

}

function currentCourse() {

    return state.course;

}

/*==========================================================
 ACTUALIZAR DATOS
==========================================================*/

function update(data = {}) {

    Object.assign(state.exam, data);

    state.exam.metadata.updatedAt =

        new Date().toISOString();

}

/*==========================================================
 INSTRUCCIONES
==========================================================*/

function addInstruction(text) {

    state.exam.instructions.push(

        text.trim()

    );

}

function removeInstruction(index) {

    state.exam.instructions.splice(index,1);

}

/*==========================================================
 SECCIONES
==========================================================*/

function addSection(section = {}) {

    if (

        state.exam.sections.length >=

        CONFIG.maxSections

    ) {

        return false;

    }

    const newSection = {

        id: crypto.randomUUID(),

        title: section.title || "",

        description: section.description || "",

        score: section.score || 0,

        questions: []

    };

    state.exam.sections.push(newSection);

    return newSection;

}

function findSection(id) {

    return state.exam.sections.find(

        section => section.id === id

    );

}

function updateSection(id,data={}) {

    const section = findSection(id);

    if(!section){

        return null;

    }

    Object.assign(section,data);

    return section;

}

function removeSection(id){

    state.exam.sections =

        state.exam.sections.filter(

            section=>section.id!==id

        );

}

/*==========================================================
 BANCO DE PREGUNTAS
==========================================================*/

function loadQuestionBank(questions=[]){

    state.questionBank =

        structuredClone(questions);

}

function questionBank(){

    return structuredClone(

        state.questionBank

    );

}

/*==========================================================
 BUSCAR PREGUNTA
==========================================================*/

function findQuestion(id){

    return state.questionBank.find(

        question=>question.id===id

    );

}
/*==========================================================
 SELECCIÓN DE PREGUNTAS
==========================================================*/

function addQuestionToSection(sectionId, questionId) {

    const section = findSection(sectionId);

    if (!section) {

        return false;

    }

    if (

        section.questions.length >=

        CONFIG.maxQuestionsPerSection

    ) {

        return false;

    }

    const question = findQuestion(questionId);

    if (!question) {

        return false;

    }

    const exists = section.questions.some(

        item => item.id === question.id

    );

    if (exists) {

        return false;

    }

    section.questions.push(

        structuredClone(question)

    );

    recalculateSectionScore(sectionId);

    updateExamMetadata();

    return true;

}

/*==========================================================
 ELIMINAR PREGUNTA
==========================================================*/

function removeQuestionFromSection(sectionId, questionId) {

    const section = findSection(sectionId);

    if (!section) {

        return false;

    }

    section.questions = section.questions.filter(

        question => question.id !== questionId

    );

    recalculateSectionScore(sectionId);

    updateExamMetadata();

    return true;

}

/*==========================================================
 MOVER PREGUNTA
==========================================================*/

function moveQuestion(sectionId, fromIndex, toIndex) {

    const section = findSection(sectionId);

    if (!section) {

        return false;

    }

    if (

        fromIndex < 0 ||

        toIndex < 0 ||

        fromIndex >= section.questions.length ||

        toIndex >= section.questions.length

    ) {

        return false;

    }

    const [question] =

        section.questions.splice(fromIndex, 1);

    section.questions.splice(

        toIndex,

        0,

        question

    );

    updateExamMetadata();

    return true;

}

/*==========================================================
 REORDENAR SECCIONES
==========================================================*/

function moveSection(fromIndex, toIndex) {

    if (

        fromIndex < 0 ||

        toIndex < 0 ||

        fromIndex >= state.exam.sections.length ||

        toIndex >= state.exam.sections.length

    ) {

        return false;

    }

    const [section] =

        state.exam.sections.splice(

            fromIndex,

            1

        );

    state.exam.sections.splice(

        toIndex,

        0,

        section

    );

    updateExamMetadata();

    return true;

}

/*==========================================================
 PUNTAJES
==========================================================*/

function recalculateSectionScore(sectionId) {

    const section = findSection(sectionId);

    if (!section) {

        return;

    }

    section.score =

        section.questions.reduce(

            (total, question) => {

                return (

                    total +

                    (question.score || 1)

                );

            },

            0

        );

    recalculateExamScore();

}

function recalculateExamScore() {

    state.exam.totalScore =

        state.exam.sections.reduce(

            (total, section) => {

                return total + section.score;

            },

            0

        );

}

/*==========================================================
 METADATOS
==========================================================*/

function updateExamMetadata() {

    state.exam.metadata.updatedAt =

        new Date().toISOString();

}

/*==========================================================
 ESTADÍSTICAS
==========================================================*/

function statistics() {

    let totalQuestions = 0;

    state.exam.sections.forEach(section => {

        totalQuestions +=

            section.questions.length;

    });

    return {

        sections:

            state.exam.sections.length,

        questions:

            totalQuestions,

        totalScore:

            state.exam.totalScore,

        duration:

            state.exam.duration

    };

}

/*==========================================================
 CONTADORES
==========================================================*/

function totalQuestions() {

    return statistics().questions;

}

function totalSections() {

    return statistics().sections;

}
```
/*==========================================================
 VALIDACIÓN DEL EXAMEN
==========================================================*/

function validateExam() {

    const errors = [];

    if (!state.exam.title.trim()) {

        errors.push(
            "Debe ingresar el título del examen."
        );

    }

    if (!state.exam.courseId) {

        errors.push(
            "Debe asociar el examen a un curso."
        );

    }

    if (state.exam.sections.length === 0) {

        errors.push(
            "El examen debe contener al menos una sección."
        );

    }

    state.exam.sections.forEach((section, index) => {

        if (!section.title.trim()) {

            errors.push(
                `La sección ${index + 1} no posee título.`
            );

        }

        if (section.questions.length === 0) {

            errors.push(
                `La sección ${index + 1} no contiene preguntas.`
            );

        }

    });

    state.validation = errors;

    return {

        valid: errors.length === 0,

        errors

    };

}

/*==========================================================
 VISTA PREVIA
==========================================================*/

function preview() {

    return structuredClone(state.exam);

}

/*==========================================================
 EXPORTAR
==========================================================*/

function exportExam() {

    return JSON.stringify(

        state.exam,

        null,

        2

    );

}

function importExam(json) {

    try {

        state.exam = JSON.parse(json);

        updateExamMetadata();

        return true;

    }

    catch(error){

        console.error(error);

        return false;

    }

}

/*==========================================================
 REINICIAR
==========================================================*/

function reset() {

    state.exam = createExam();

    state.questionBank = [];

    state.selectedQuestions = [];

    state.validation = [];

}

/*==========================================================
 RESUMEN
==========================================================*/

function summary() {

    const stats = statistics();

    return {

        title:

            state.exam.title,

        sections:

            stats.sections,

        questions:

            stats.questions,

        totalScore:

            stats.totalScore,

        duration:

            stats.duration,

        teacher:

            state.exam.teacher,

        academicPeriod:

            state.exam.academicPeriod

    };

}

/*==========================================================
 API PÚBLICA
==========================================================*/

return {

    init,

    currentExam,

    currentCourse,

    update,

    reset,

    addInstruction,

    removeInstruction,

    addSection,

    updateSection,

    removeSection,

    findSection,

    loadQuestionBank,

    questionBank,

    findQuestion,

    addQuestionToSection,

    removeQuestionFromSection,

    moveQuestion,

    moveSection,

    recalculateSectionScore,

    recalculateExamScore,

    validateExam,

    statistics,

    totalQuestions,

    totalSections,

    preview,

    exportExam,

    importExam,

    summary

};

})();

/*==========================================================
 INICIALIZACIÓN
==========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        SPAEExamBuilder.init();

    }

);
