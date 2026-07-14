/*==========================================================
 SPAE
 Sistema Profesional de Autoría de Evaluaciones

 js/question-bank.js
 Release 1.0

 Banco central de preguntas
==========================================================*/

const SPAEQuestionBank = (() => {

"use strict";

/*==========================================================
 CONFIGURACIÓN
==========================================================*/

const STORAGE_KEY = "spae.question.bank";

const CONFIG = {

    autosave: true,

    version: "1.0.0"

};

/*==========================================================
 ESTADO
==========================================================*/

const state = {

    questions: [],

    filteredQuestions: [],

    currentQuestion: null,

    filters: {

        courseId: "",

        bloom: "",

        learningOutcomeId: "",

        difficulty: "",

        keyword: ""

    }

};

/*==========================================================
 INICIALIZACIÓN
==========================================================*/

function init() {

    load();

}

/*==========================================================
 PERSISTENCIA
==========================================================*/

function load() {

    try {

        const data =

            localStorage.getItem(STORAGE_KEY);

        state.questions =

            data

                ? JSON.parse(data)

                : [];

        state.filteredQuestions =

            [...state.questions];

    }

    catch (error) {

        console.error(error);

        state.questions = [];

        state.filteredQuestions = [];

    }

}

function save() {

    if (!CONFIG.autosave) {

        return;

    }

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(state.questions)

    );

}

/*==========================================================
 CRUD
==========================================================*/

function add(question) {

    const item = structuredClone(question);

    item.id = item.id || crypto.randomUUID();

    item.createdAt =

        new Date().toISOString();

    item.updatedAt =

        new Date().toISOString();

    state.questions.push(item);

    save();

    return item;

}

function update(id, data = {}) {

    const question = find(id);

    if (!question) {

        return null;

    }

    Object.assign(question, data);

    question.updatedAt =

        new Date().toISOString();

    save();

    return question;

}

function remove(id) {

    const index =

        state.questions.findIndex(

            q => q.id === id

        );

    if (index < 0) {

        return false;

    }

    state.questions.splice(index, 1);

    save();

    return true;

}

function duplicate(id) {

    const question = find(id);

    if (!question) {

        return null;

    }

    const copy =

        structuredClone(question);

    copy.id = crypto.randomUUID();

    copy.code =

        `${copy.code}-COPIA`;

    copy.createdAt =

        new Date().toISOString();

    copy.updatedAt =

        new Date().toISOString();

    state.questions.push(copy);

    save();

    return copy;

}

/*==========================================================
 CONSULTAS
==========================================================*/

function all() {

    return structuredClone(

        state.questions

    );

}

function find(id) {

    return state.questions.find(

        q => q.id === id

    );

}

function current() {

    return state.currentQuestion;

}

function select(id) {

    state.currentQuestion =

        find(id);

}

/*==========================================================
 FILTROS
==========================================================*/

function filter(options = {}) {

    state.filters = {

        ...state.filters,

        ...options

    };

    state.filteredQuestions =

        state.questions.filter(question => {

            if (

                state.filters.courseId &&

                question.courseId !==

                state.filters.courseId

            ) {

                return false;

            }

            if (

                state.filters.bloom &&

                question.bloom !==

                state.filters.bloom

            ) {

                return false;

            }

            if (

                state.filters.learningOutcomeId &&

                question.learningOutcomeId !==

                state.filters.learningOutcomeId

            ) {

                return false;

            }

            if (

                state.filters.difficulty &&

                question.metadata
                    ?.estimatedDifficulty !==

                state.filters.difficulty

            ) {

                return false;

            }

            if (

                state.filters.keyword

            ) {

                const text =

                    JSON.stringify(question)

                        .toLowerCase();

                if (

                    !text.includes(

                        state.filters.keyword
                            .toLowerCase()

                    )

                ) {

                    return false;

                }

            }

            return true;

        });

    return structuredClone(

        state.filteredQuestions

    );

}
