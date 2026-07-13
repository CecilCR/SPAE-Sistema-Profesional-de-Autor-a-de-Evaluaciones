/*==========================================================
 SPAE
 Sistema Profesional de Autoría de Evaluaciones

 js/courses.js
 Release 1.0

 Gestión de cursos
==========================================================*/

const SPAECourses = (() => {

"use strict";

/*==========================================================
CONFIGURACIÓN
==========================================================*/

const STORAGE_KEY = "spae.courses";

/*==========================================================
ESTADO
==========================================================*/

const state = {

    courses: [],

    currentCourse: null

};

/*==========================================================
INICIALIZACIÓN
==========================================================*/

function init() {

    load();

}

/*==========================================================
CARGA
==========================================================*/

function load() {

    try {

        const data = localStorage.getItem(STORAGE_KEY);

        state.courses = data ? JSON.parse(data) : [];

    }

    catch(error){

        console.error(error);

        state.courses=[];

    }

}

/*==========================================================
GUARDAR
==========================================================*/

function save(){

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(state.courses)

    );

}

/*==========================================================
IDENTIFICADOR
==========================================================*/

function generateId(){

    return crypto.randomUUID
        ? crypto.randomUUID()
        : "COURSE-"+Date.now();

}

/*==========================================================
CREAR
==========================================================*/

function create(courseData={}){

    const course={

        id:generateId(),

        code:courseData.code || "",

        name:courseData.name || "",

        program:courseData.program || "",

        semester:courseData.semester || "",

        teacher:courseData.teacher || "",

        credits:courseData.credits || "",

        description:courseData.description || "",

        learningOutcomes:
            courseData.learningOutcomes || [],

        createdAt:new Date().toISOString(),

        updatedAt:new Date().toISOString()

    };

    state.courses.push(course);

    save();

    SPAEUI.notifySuccess("Curso creado.");

    return course;

}

/*==========================================================
OBTENER TODOS
==========================================================*/

function all(){

    return structuredClone(state.courses);

}

/*==========================================================
BUSCAR
==========================================================*/

function find(id){

    return state.courses.find(

        c=>c.id===id

    );

}

/*==========================================================
SELECCIONAR
==========================================================*/

function select(id){

    const course=find(id);

    if(course){

        state.currentCourse=course;

    }

    return course;

}

/*==========================================================
CURSO ACTUAL
==========================================================*/

function current(){

    return state.currentCourse;

}

/*==========================================================
ACTUALIZAR
==========================================================*/

function update(id,data){

    const course=find(id);

    if(!course){

        return null;

    }

    Object.assign(course,data);

    course.updatedAt=new Date().toISOString();

    save();

    SPAEUI.notifySuccess("Curso actualizado.");

    return course;

}

/*==========================================================
ELIMINAR
==========================================================*/

function removeCourse(id){

    const index=state.courses.findIndex(

        c=>c.id===id

    );

    if(index<0){

        return false;

    }

    state.courses.splice(index,1);

    save();

    SPAEUI.notifySuccess("Curso eliminado.");

    return true;

}

/*==========================================================
BUSCAR POR TEXTO
==========================================================*/

function search(text=""){

    const value=text.toLowerCase();

    return state.courses.filter(course=>{

        return (

            course.name.toLowerCase().includes(value)

            ||

            course.code.toLowerCase().includes(value)

            ||

            course.program.toLowerCase().includes(value)

        );

    });

}

/*==========================================================
VALIDAR
==========================================================*/

function validate(course){

    const errors=[];

    if(!course.code?.trim()){

        errors.push("Debe ingresar el código del curso.");

    }

    if(!course.name?.trim()){

        errors.push("Debe ingresar el nombre del curso.");

    }

    return{

        valid:errors.length===0,

        errors

    };

}
/*==========================================================
 RESULTADOS DE APRENDIZAJE
==========================================================*/

function addLearningOutcome(courseId, outcome) {

    const course = find(courseId);

    if (!course) {
        return false;
    }

    if (!course.learningOutcomes) {
        course.learningOutcomes = [];
    }

    const learningOutcome = {

        id: generateId(),

        code: outcome.code || "",

        description: outcome.description || "",

        bloom: outcome.bloom || "",

        createdAt: new Date().toISOString()

    };

    course.learningOutcomes.push(learningOutcome);

    course.updatedAt = new Date().toISOString();

    save();

    return learningOutcome;

}

function updateLearningOutcome(courseId, outcomeId, data = {}) {

    const course = find(courseId);

    if (!course) {
        return false;
    }

    const outcome = course.learningOutcomes.find(
        item => item.id === outcomeId
    );

    if (!outcome) {
        return false;
    }

    Object.assign(outcome, data);

    course.updatedAt = new Date().toISOString();

    save();

    return outcome;

}

function removeLearningOutcome(courseId, outcomeId) {

    const course = find(courseId);

    if (!course) {
        return false;
    }

    const index = course.learningOutcomes.findIndex(
        item => item.id === outcomeId
    );

    if (index < 0) {
        return false;
    }

    course.learningOutcomes.splice(index, 1);

    course.updatedAt = new Date().toISOString();

    save();

    return true;

}

/*==========================================================
 IMPORTAR / EXPORTAR
==========================================================*/

function exportCourse(id) {

    const course = find(id);

    if (!course) {
        return null;
    }

    return JSON.stringify(course, null, 2);

}

function importCourse(json) {

    try {

        const course = JSON.parse(json);

        course.id = generateId();

        course.createdAt = new Date().toISOString();

        course.updatedAt = new Date().toISOString();

        state.courses.push(course);

        save();

        return course;

    } catch (error) {

        console.error(error);

        return null;

    }

}

/*==========================================================
 ESTADÍSTICAS
==========================================================*/

function statistics() {

    return {

        totalCourses: state.courses.length,

        totalLearningOutcomes: state.courses.reduce((total, course) => {

            return total + (course.learningOutcomes?.length || 0);

        }, 0)

    };

}

/*==========================================================
 ORDENAMIENTO
==========================================================*/

function sortBy(field = "name") {

    state.courses.sort((a, b) => {

        const valueA = (a[field] || "").toString().toLowerCase();

        const valueB = (b[field] || "").toString().toLowerCase();

        return valueA.localeCompare(valueB);

    });

    save();

}

function sortByCode() {

    sortBy("code");

}

function sortByName() {

    sortBy("name");

}

function sortByProgram() {

    sortBy("program");

}

/*==========================================================
 FILTROS
==========================================================*/

function filterByProgram(program) {

    return state.courses.filter(course =>

        course.program === program

    );

}

function filterBySemester(semester) {

    return state.courses.filter(course =>

        course.semester === semester

    );

}

/*==========================================================
 DUPLICAR CURSO
==========================================================*/

function duplicate(courseId) {

    const course = find(courseId);

    if (!course) {

        return null;

    }

    const copy = structuredClone(course);

    copy.id = generateId();

    copy.code = `${copy.code}-COPIA`;

    copy.name = `${copy.name} (Copia)`;

    copy.createdAt = new Date().toISOString();

    copy.updatedAt = new Date().toISOString();

    if (copy.learningOutcomes) {

        copy.learningOutcomes.forEach(outcome => {

            outcome.id = generateId();

        });

    }

    state.courses.push(copy);

    save();

    return copy;

}

/*==========================================================
 LIMPIAR
==========================================================*/

function clearAll() {

    state.courses = [];

    state.currentCourse = null;

    save();

}

/*==========================================================
 EXISTE CÓDIGO
==========================================================*/

function existsCode(code) {

    return state.courses.some(course =>

        course.code === code

    );

}  
/*==========================================================
 RENDER - LISTADO DE CURSOS
==========================================================*/

function renderCourseList(containerSelector = "#course-list") {

    const container = SPAEUI.$(containerSelector);

    if (!container) {
        return;
    }

    SPAEUI.clear(container);

    if (state.courses.length === 0) {

        container.appendChild(

            SPAEUI.emptyState({

                icon: "📚",

                title: "No existen cursos",

                description: "Comience creando su primer curso.",

                action: {

                    label: "Nuevo curso",

                    onClick: () => SPAEUI.emit("course:new")

                }

            })

        );

        return;

    }

    state.courses.forEach(course => {

        const card = SPAEUI.create("div", {

            className: "course-card"

        });

        card.innerHTML = `

            <div class="course-card-header">

                <h3>${course.code}</h3>

                <span>${course.program}</span>

            </div>

            <div class="course-card-body">

                <h4>${course.name}</h4>

                <p>${course.semester}</p>

                <small>

                    ${course.learningOutcomes.length}

                    resultado(s) de aprendizaje

                </small>

            </div>

            <div class="course-card-footer">

                <button class="btn btn-primary"
                    data-action="open"
                    data-id="${course.id}">

                    Abrir

                </button>

                <button class="btn btn-secondary"
                    data-action="edit"
                    data-id="${course.id}">

                    Editar

                </button>

                <button class="btn btn-danger"
                    data-action="delete"
                    data-id="${course.id}">

                    Eliminar

                </button>

            </div>

        `;

        container.appendChild(card);

    });

}

/*==========================================================
 EVENTOS
==========================================================*/

function bindUI(containerSelector = "#course-list") {

    const container = SPAEUI.$(containerSelector);

    if (!container) {
        return;
    }

    container.addEventListener("click", event => {

        const button = event.target.closest("button");

        if (!button) {
            return;
        }

        const action = button.dataset.action;

        const id = button.dataset.id;

        switch (action) {

            case "open":

                select(id);

                SPAEUI.emit("course:selected", current());

                break;

            case "edit":

                SPAEUI.emit("course:edit", find(id));

                break;

            case "delete":

                SPAEUI.confirmDialog({

                    title: "Eliminar curso",

                    message: "¿Desea eliminar este curso?",

                    onAccept() {

                        removeCourse(id);

                        renderCourseList(containerSelector);

                    }

                });

                break;

        }

    });

}

/*==========================================================
 RECARGAR
==========================================================*/

function refresh(containerSelector = "#course-list") {

    renderCourseList(containerSelector);

}

/*==========================================================
 API PÚBLICA
==========================================================*/

return {

    init,

    load,

    save,

    create,

    update,

    remove: removeCourse,

    duplicate,

    all,

    current,

    select,

    find,

    search,

    validate,

    existsCode,

    sortBy,

    sortByCode,

    sortByName,

    sortByProgram,

    filterByProgram,

    filterBySemester,

    addLearningOutcome,

    updateLearningOutcome,

    removeLearningOutcome,

    exportCourse,

    importCourse,

    statistics,

    clearAll,

    renderCourseList,

    bindUI,

    refresh

};

})();

/*==========================================================
 INICIALIZACIÓN
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    SPAECourses.init();

});                     
