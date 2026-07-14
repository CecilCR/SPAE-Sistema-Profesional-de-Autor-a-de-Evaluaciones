/*==========================================================
 SPAE
 Sistema Profesional de Autoría de Evaluaciones

 js/dashboard.js
 Release 1.0
==========================================================*/

const SPAEDashboard = (() => {

"use strict";

/*==========================================================
 ESTADO
==========================================================*/

const state = {

    initialized: false,

    currentCourse: null,

    statistics: {

        courses: 0,

        learningOutcomes: 0,

        questions: 0,

        exams: 0

    }

};

/*==========================================================
 INICIALIZACIÓN
==========================================================*/

function init() {

    cacheDOM();

    refresh();

    state.initialized = true;

}

/*==========================================================
 ELEMENTOS DOM
==========================================================*/

const DOM = {};

function cacheDOM() {

    DOM.courseList =

        document.getElementById(

            "recentCourses"

        );

    DOM.currentCourse =

        document.getElementById(

            "currentCourse"

        );

    DOM.totalCourses =

        document.getElementById(

            "statCourses"

        );

    DOM.totalQuestions =

        document.getElementById(

            "statQuestions"

        );

    DOM.totalLearningOutcomes =

        document.getElementById(

            "statLearningOutcomes"

        );

    DOM.totalExams =

        document.getElementById(

            "statExams"

        );

}

/*==========================================================
 REFRESCAR DASHBOARD
==========================================================*/

function refresh() {

    loadStatistics();

    renderStatistics();

    renderRecentCourses();

    renderCurrentCourse();

}

/*==========================================================
 ESTADÍSTICAS
==========================================================*/

function loadStatistics() {

    const courses =

        window.SPAECourses

            ? SPAECourses.getCourses()

            : [];

    state.statistics.courses =

        courses.length;

    state.statistics.questions =

        window.SPAEQuestionBank

            ? SPAEQuestionBank.all().length

            : 0;

    state.statistics.learningOutcomes =

        state.currentCourse?.learningOutcomes?.length

            || 0;

    state.statistics.exams =

        state.currentCourse?.exams?.length

            || 0;

}

function renderStatistics() {

    if (DOM.totalCourses)

        DOM.totalCourses.textContent =

            state.statistics.courses;

    if (DOM.totalQuestions)

        DOM.totalQuestions.textContent =

            state.statistics.questions;

    if (DOM.totalLearningOutcomes)

        DOM.totalLearningOutcomes.textContent =

            state.statistics.learningOutcomes;

    if (DOM.totalExams)

        DOM.totalExams.textContent =

            state.statistics.exams;

}

/*==========================================================
 CURSO ACTUAL
==========================================================*/

function setCurrentCourse(course) {

    state.currentCourse =

        structuredClone(course);

    refresh();

}

function renderCurrentCourse() {

    if (!DOM.currentCourse)

        return;

    if (!state.currentCourse) {

        DOM.currentCourse.innerHTML =

        `

        <div class="empty-card">

            <h3>No existe un curso activo</h3>

            <p>

                Cree un curso o abra uno existente.

            </p>

        </div>

        `;

        return;

    }

    DOM.currentCourse.innerHTML =

    `

    <div class="course-summary">

        <h2>

            ${state.currentCourse.name}

        </h2>

        <p>

            ${state.currentCourse.program || ""}

        </p>

        <p>

            ${state.currentCourse.semester || ""}

        </p>

    </div>

    `;

}
/*==========================================================
 CURSOS RECIENTES
==========================================================*/

function renderRecentCourses() {

    if (!DOM.courseList) {

        return;

    }

    DOM.courseList.innerHTML = "";

    if (!window.SPAECourses) {

        DOM.courseList.innerHTML = `

            <div class="empty-state">

                No se encuentra disponible el módulo de cursos.

            </div>

        `;

        return;

    }

    const courses = SPAECourses.getCourses();

    if (!courses.length) {

        DOM.courseList.innerHTML = `

            <div class="empty-state">

                <h3>No existen cursos registrados</h3>

                <p>

                    Presione <strong>Crear curso</strong> para comenzar.

                </p>

            </div>

        `;

        return;

    }

    const fragment = document.createDocumentFragment();

    courses.forEach(course => {

        fragment.appendChild(

            createCourseCard(course)

        );

    });

    DOM.courseList.appendChild(fragment);

}

/*==========================================================
 TARJETA DE CURSO
==========================================================*/

function createCourseCard(course) {

    const article = document.createElement("article");

    article.className = "course-card";

    article.dataset.id = course.id;

    article.innerHTML = `

        <header class="course-card__header">

            <h3>${escape(course.name)}</h3>

        </header>

        <section class="course-card__body">

            <p>

                <strong>Programa:</strong>

                ${escape(course.program || "No definido")}

            </p>

            <p>

                <strong>Semestre:</strong>

                ${escape(course.semester || "-")}

            </p>

            <p>

                <strong>Creado:</strong>

                ${formatDate(course.createdAt)}

            </p>

        </section>

        <footer class="course-card__footer">

            <button
                class="btn btn-primary"
                data-action="open"
                data-id="${course.id}">

                Abrir

            </button>

            <button
                class="btn btn-secondary"
                data-action="edit"
                data-id="${course.id}">

                Editar

            </button>

            <button
                class="btn btn-danger"
                data-action="delete"
                data-id="${course.id}">

                Eliminar

            </button>

        </footer>

    `;

    return article;

}

/*==========================================================
 EVENTOS
==========================================================*/

function bindEvents() {

    if (!DOM.courseList) {

        return;

    }

    DOM.courseList.addEventListener(

        "click",

        onCourseClick

    );

}

function onCourseClick(event) {

    const button = event.target.closest("button");

    if (!button) {

        return;

    }

    const id = button.dataset.id;

    const action = button.dataset.action;

    switch (action) {

        case "open":

            openCourse(id);

            break;

        case "edit":

            editCourse(id);

            break;

        case "delete":

            deleteCourse(id);

            break;

    }

}

/*==========================================================
 ABRIR CURSO
==========================================================*/

function openCourse(id) {

    const course =

        SPAECourses.findById(id);

    if (!course) {

        return;

    }

    setCurrentCourse(course);

    if (window.SPAE) {

        SPAE.loadCourse(course);

    }

}

/*==========================================================
 EDITAR CURSO
==========================================================*/

function editCourse(id) {

    const course =

        SPAECourses.findById(id);

    if (!course) {

        return;

    }

    if (window.SPAEDialogs) {

        SPAEDialogs.openCourseDialog({

            mode: "edit",

            course,

            onSave(updatedCourse) {

                SPAECourses.updateCourse(updatedCourse);

                refresh();

            }

        });

        return;

    }

    alert(

        "El editor de cursos estará disponible al integrar dialogs.js."

    );

}

/*==========================================================
 ELIMINAR CURSO
==========================================================*/

function deleteCourse(id) {

    const course =

        SPAECourses.findById(id);

    if (!course) {

        return;

    }

    const confirmed = confirm(

        `¿Eliminar el curso "${course.name}"?`

    );

    if (!confirmed) {

        return;

    }

    SPAECourses.removeCourse(id);

    if (

        state.currentCourse &&

        state.currentCourse.id === id

    ) {

        state.currentCourse = null;

    }

    refresh();

}

/*==========================================================
 UTILIDADES
==========================================================*/

function escape(text = "") {

    return String(text)

        .replaceAll("&", "&amp;")

        .replaceAll("<", "&lt;")

        .replaceAll(">", "&gt;")

        .replaceAll('"', "&quot;")

        .replaceAll("'", "&#39;");

}

function formatDate(date) {

    if (!date) {

        return "-";

    }

    return new Date(date)

        .toLocaleDateString();

}  
/*==========================================================
 ACTUALIZACIÓN AUTOMÁTICA
==========================================================*/

function autoRefresh() {

    refresh();

}

function synchronize() {

    if (!window.SPAEStorage) {

        return;

    }

    const session = SPAEStorage.load("spae-session");

    if (!session) {

        return;

    }

    if (session.currentCourse) {

        state.currentCourse = structuredClone(

            session.currentCourse

        );

    }

    refresh();

}

/*==========================================================
 OBSERVADORES
==========================================================*/

function registerObservers() {

    document.addEventListener(

        "spae-course-created",

        autoRefresh

    );

    document.addEventListener(

        "spae-course-updated",

        autoRefresh

    );

    document.addEventListener(

        "spae-course-deleted",

        autoRefresh

    );

    document.addEventListener(

        "spae-question-created",

        autoRefresh

    );

    document.addEventListener(

        "spae-question-updated",

        autoRefresh

    );

    document.addEventListener(

        "spae-question-deleted",

        autoRefresh

    );

    document.addEventListener(

        "spae-exam-created",

        autoRefresh

    );

    document.addEventListener(

        "spae-exam-updated",

        autoRefresh

    );

}

/*==========================================================
 NOTIFICACIONES
==========================================================*/

function notify(message) {

    if (window.SPAENotifications) {

        SPAENotifications.info(message);

    }

}

/*==========================================================
 ACTUALIZAR CURSO ACTIVO
==========================================================*/

function reloadCurrentCourse() {

    if (

        !state.currentCourse ||

        !window.SPAECourses

    ) {

        return;

    }

    const updated =

        SPAECourses.findById(

            state.currentCourse.id

        );

    if (updated) {

        state.currentCourse =

            structuredClone(updated);

    }

}

/*==========================================================
 REFRESCO COMPLETO
==========================================================*/

function fullRefresh() {

    reloadCurrentCourse();

    refresh();

}

/*==========================================================
 API PÚBLICA
==========================================================*/

return {

    init,

    refresh,

    fullRefresh,

    autoRefresh,

    synchronize,

    setCurrentCourse,

    renderCurrentCourse,

    renderRecentCourses,

    renderStatistics,

    openCourse,

    editCourse,

    deleteCourse,

    loadStatistics,

    currentCourse() {

        return structuredClone(

            state.currentCourse

        );

    },

    statistics() {

        return structuredClone(

            state.statistics

        );

    }

};

})();

/*==========================================================
 INICIALIZACIÓN
==========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        SPAEDashboard.init();

        SPAEDashboard.synchronize();

        SPAEDashboard.refresh();

        SPAEDashboard.fullRefresh();

        SPAEDashboard.autoRefresh();

    }

);                       
