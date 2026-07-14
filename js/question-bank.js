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
/*==========================================================
 ORDENAMIENTO
==========================================================*/

function sortBy(field = "code", direction = "asc") {

    const factor = direction === "desc" ? -1 : 1;

    state.filteredQuestions.sort((a, b) => {

        const valueA = (a[field] || "")
            .toString()
            .toLowerCase();

        const valueB = (b[field] || "")
            .toString()
            .toLowerCase();

        return valueA.localeCompare(valueB) * factor;

    });

    return structuredClone(state.filteredQuestions);

}

/*==========================================================
 ETIQUETAS
==========================================================*/

function addTag(questionId, tag) {

    const question = find(questionId);

    if (!question) {

        return false;

    }

    if (!question.tags) {

        question.tags = [];

    }

    tag = tag.trim();

    if (!tag) {

        return false;

    }

    if (!question.tags.includes(tag)) {

        question.tags.push(tag);

        question.updatedAt = new Date().toISOString();

        save();

    }

    return true;

}

function removeTag(questionId, tag) {

    const question = find(questionId);

    if (!question || !question.tags) {

        return false;

    }

    question.tags = question.tags.filter(

        item => item !== tag

    );

    question.updatedAt = new Date().toISOString();

    save();

    return true;

}

function tags(questionId) {

    const question = find(questionId);

    if (!question) {

        return [];

    }

    return [...(question.tags || [])];

}

/*==========================================================
 VERSIONAMIENTO
==========================================================*/

function createVersion(questionId) {

    const question = find(questionId);

    if (!question) {

        return null;

    }

    if (!question.versions) {

        question.versions = [];

    }

    question.versions.push({

        version:

            question.versions.length + 1,

        createdAt:

            new Date().toISOString(),

        snapshot:

            structuredClone(question)

    });

    save();

    return question.versions.at(-1);

}

function versions(questionId) {

    const question = find(questionId);

    if (!question) {

        return [];

    }

    return structuredClone(

        question.versions || []

    );

}

/*==========================================================
 ARCHIVADO
==========================================================*/

function archive(questionId) {

    const question = find(questionId);

    if (!question) {

        return false;

    }

    question.archived = true;

    question.updatedAt = new Date().toISOString();

    save();

    return true;

}

function restore(questionId) {

    const question = find(questionId);

    if (!question) {

        return false;

    }

    question.archived = false;

    question.updatedAt = new Date().toISOString();

    save();

    return true;

}

function archived() {

    return state.questions.filter(

        question => question.archived

    );

}

/*==========================================================
 IMPORTACIÓN
==========================================================*/

function importQuestions(list = []) {

    let imported = 0;

    list.forEach(question => {

        const copy = structuredClone(question);

        copy.id = crypto.randomUUID();

        copy.createdAt = new Date().toISOString();

        copy.updatedAt = new Date().toISOString();

        state.questions.push(copy);

        imported++;

    });

    save();

    return imported;

}

/*==========================================================
 EXPORTACIÓN
==========================================================*/

function exportQuestions() {

    return JSON.stringify(

        state.questions,

        null,

        2

    );

}
/*==========================================================
 ESTADÍSTICAS
==========================================================*/

function statistics() {

    const stats = {

        total: state.questions.length,

        filtered: state.filteredQuestions.length,

        archived: 0,

        active: 0,

        byBloom: {},

        byDifficulty: {},

        byCourse: {},

        byType: {}

    };

    state.questions.forEach(question => {

        if (question.archived) {

            stats.archived++;

        } else {

            stats.active++;

        }

        const bloom = question.bloom || "Sin definir";

        stats.byBloom[bloom] =

            (stats.byBloom[bloom] || 0) + 1;

        const difficulty =

            question.metadata?.estimatedDifficulty ||

            "Sin definir";

        stats.byDifficulty[difficulty] =

            (stats.byDifficulty[difficulty] || 0) + 1;

        const course =

            question.courseId || "Sin curso";

        stats.byCourse[course] =

            (stats.byCourse[course] || 0) + 1;

        const type =

            question.type || "Sin tipo";

        stats.byType[type] =

            (stats.byType[type] || 0) + 1;

    });

    return stats;

}

/*==========================================================
 VALIDACIÓN
==========================================================*/

function validate(question) {

    const errors = [];

    if (!question.code?.trim()) {

        errors.push("La pregunta no posee código.");

    }

    if (!question.stem?.trim()) {

        errors.push("La pregunta no posee enunciado.");

    }

    if (!question.bloom) {

        errors.push("No se ha definido el nivel de Bloom.");

    }

    if (!question.learningOutcomeId) {

        errors.push(
            "No existe un resultado de aprendizaje asociado."
        );

    }

    if (!question.alternatives?.length) {

        errors.push(
            "La pregunta no contiene alternativas."
        );

    }

    const correct =

        question.alternatives?.filter(

            alternative => alternative.correct

        ) || [];

    if (correct.length !== 1) {

        errors.push(
            "Debe existir una única respuesta correcta."
        );

    }

    return {

        valid: errors.length === 0,

        errors

    };

}

/*==========================================================
 RENDER
==========================================================*/

function render(containerSelector = "#question-bank") {

    const container = SPAEUI.$(containerSelector);

    if (!container) {

        return;

    }

    SPAEUI.clear(container);

    if (state.filteredQuestions.length === 0) {

        container.appendChild(

            SPAEUI.emptyState({

                icon: "📝",

                title: "No existen preguntas",

                description:

                    "No se encontraron preguntas para mostrar."

            })

        );

        return;

    }

    state.filteredQuestions.forEach(question => {

        const card = SPAEUI.create("article", {

            className: "question-card"

        });

        card.innerHTML = `

            <header class="question-card__header">

                <strong>${question.code}</strong>

                <span>${question.bloom || "-"}</span>

            </header>

            <section class="question-card__body">

                <p>${question.stem}</p>

            </section>

            <footer class="question-card__footer">

                <button class="btn btn-primary"
                    data-action="open"
                    data-id="${question.id}">

                    Abrir

                </button>

                <button class="btn btn-secondary"
                    data-action="duplicate"
                    data-id="${question.id}">

                    Duplicar

                </button>

                <button class="btn btn-danger"
                    data-action="delete"
                    data-id="${question.id}">

                    Eliminar

                </button>

            </footer>

        `;

        container.appendChild(card);

    });

}

/*==========================================================
 EVENTOS
==========================================================*/

function bindEvents(containerSelector = "#question-bank") {

    const container = SPAEUI.$(containerSelector);

    if (!container) {

        return;

    }

    container.addEventListener("click", event => {

        const button = event.target.closest("button");

        if (!button) {

            return;

        }

        const id = button.dataset.id;

        const action = button.dataset.action;

        switch (action) {

            case "open":

                select(id);

                SPAEUI.emit(

                    "question:selected",

                    current()

                );

                break;

            case "duplicate":

                duplicate(id);

                render(containerSelector);

                break;

            case "delete":

                remove(id);

                render(containerSelector);

                break;

        }

    });

}

/*==========================================================
 API PÚBLICA
==========================================================*/

return {

    init,

    load,

    save,

    add,

    update,

    remove,

    duplicate,

    all,

    find,

    current,

    select,

    filter,

    sortBy,

    addTag,

    removeTag,

    tags,

    createVersion,

    versions,

    archive,

    restore,

    archived,

    importQuestions,

    exportQuestions,

    statistics,

    validate,

    render,

    bindEvents

};

})();

/*==========================================================
 INICIALIZACIÓN
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    SPAEQuestionBank.init();

}); 
