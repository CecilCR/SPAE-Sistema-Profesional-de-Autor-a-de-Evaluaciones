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
```

