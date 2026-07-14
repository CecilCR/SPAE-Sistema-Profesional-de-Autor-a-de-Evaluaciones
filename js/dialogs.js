/*==========================================================
 SPAE
 Sistema Profesional de Autoría de Evaluaciones

 dialogs.js
 Release 1.0
==========================================================*/

const SPAEDialogs = (()=>{

"use strict";

/*==========================================================
 ESTADO
==========================================================*/

const state={

    overlay:null,

    dialog:null,

    onSave:null,

    currentCourse:null,

    mode:"create"

};

/*==========================================================
 INICIALIZACIÓN
==========================================================*/

function init(){

    createRoot();

}

/*==========================================================
 CREAR CONTENEDOR
==========================================================*/

function createRoot(){

    if(document.getElementById("spae-dialog-overlay")){

        state.overlay=document.getElementById(
            "spae-dialog-overlay"
        );

        return;

    }

    state.overlay=document.createElement("div");

    state.overlay.id="spae-dialog-overlay";

    state.overlay.className="spae-overlay hidden";

    state.overlay.innerHTML=`

        <div class="spae-dialog" id="spae-dialog">

        </div>

    `;

    document.body.appendChild(state.overlay);

    state.dialog=document.getElementById(
        "spae-dialog"
    );

    state.overlay.addEventListener(

        "click",

        event=>{

            if(event.target===state.overlay){

                close();

            }

        }

    );

}

/*==========================================================
 ABRIR
==========================================================*/

function open(html){

    state.dialog.innerHTML=html;

    state.overlay.classList.remove("hidden");

}

/*==========================================================
 CERRAR
==========================================================*/

function close(){

    state.overlay.classList.add("hidden");

    state.dialog.innerHTML="";

}

/*==========================================================
 DIALOGO CURSO
==========================================================*/

function openCourseDialog(options={}){

    state.mode=options.mode || "create";

    state.currentCourse=options.course || null;

    state.onSave=options.onSave;

    const course=state.currentCourse || {};

    open(`

    <div class="dialog-header">

        <h2>

        ${
            state.mode==="create"
            ? "Nuevo Curso"
            : "Editar Curso"
        }

        </h2>

    </div>

    <div class="dialog-body">

        <label>

            Nombre

        </label>

        <input
            id="dlgCourseName"
            type="text"
            value="${course.name || ""}">

        <label>

            Programa

        </label>

        <input
            id="dlgProgram"
            type="text"
            value="${course.program || ""}">

        <label>

            Semestre

        </label>

        <input
            id="dlgSemester"
            type="text"
            value="${course.semester || ""}">

    </div>

    <div class="dialog-footer">

        <button
            id="dlgCancel"
            class="btn">

            Cancelar

        </button>

        <button
            id="dlgSave"
            class="btn btn-primary">

            Guardar

        </button>

    </div>

    `);

    bindCourseDialog();

}

/*==========================================================
 EVENTOS
==========================================================*/

function bindCourseDialog(){

    document

        .getElementById("dlgCancel")

        .addEventListener(

            "click",

            close

        );

    document

        .getElementById("dlgSave")

        .addEventListener(

            "click",

            saveCourse

        );

}

/*==========================================================
 VALIDACIÓN
==========================================================*/

function validateCourse(){

    const name=document

        .getElementById("dlgCourseName")

        .value

        .trim();

    if(name===""){

        alert(

            "Debe ingresar el nombre del curso."

        );

        return false;

    }

    return true;

}
/*==========================================================
 GUARDAR CURSO
==========================================================*/

function saveCourse() {

    if (!validateCourse()) {

        return;

    }

    const course = {

        id:

            state.currentCourse?.id ||

            crypto.randomUUID(),

        name:

            document

                .getElementById("dlgCourseName")

                .value

                .trim(),

        program:

            document

                .getElementById("dlgProgram")

                .value

                .trim(),

        semester:

            document

                .getElementById("dlgSemester")

                .value

                .trim(),

        learningOutcomes:

            state.currentCourse?.learningOutcomes || [],

        competencies:

            state.currentCourse?.competencies || [],

        questions:

            state.currentCourse?.questions || [],

        exams:

            state.currentCourse?.exams || [],

        createdAt:

            state.currentCourse?.createdAt ||

            new Date().toISOString(),

        updatedAt:

            new Date().toISOString()

    };

    if (typeof state.onSave === "function") {

        state.onSave(course);

    }

    document.dispatchEvent(

        new CustomEvent(

            state.mode === "create"

                ? "spae-course-created"

                : "spae-course-updated",

            {

                detail: course

            }

        )

    );

    close();

}

/*==========================================================
 SELECTOR DE CURSOS
==========================================================*/

function openCourseSelector(courses = [], onSelect = null) {

    state.onSave = onSelect;

    open(`

    <div class="dialog-header">

        <h2>

            Abrir curso

        </h2>

    </div>

    <div class="dialog-body">

        <input

            id="dlgCourseSearch"

            type="search"

            placeholder="Buscar curso...">

        <div

            id="dlgCourseList"

            class="course-selector">

        </div>

    </div>

    <div class="dialog-footer">

        <button

            id="dlgClose"

            class="btn">

            Cerrar

        </button>

    </div>

    `);

    document

        .getElementById("dlgClose")

        .addEventListener(

            "click",

            close

        );

    document

        .getElementById("dlgCourseSearch")

        .addEventListener(

            "input",

            event => {

                renderCourseSelector(

                    courses,

                    event.target.value

                );

            }

        );

    renderCourseSelector(

        courses,

        ""

    );

}

/*==========================================================
 RENDER CURSOS
==========================================================*/

function renderCourseSelector(

    courses,

    filter = ""

) {

    const container =

        document.getElementById(

            "dlgCourseList"

        );

    if (!container) {

        return;

    }

    const search =

        filter

            .toLowerCase()

            .trim();

    const filtered =

        courses.filter(course =>

            course.name

                .toLowerCase()

                .includes(search)

        );

    if (!filtered.length) {

        container.innerHTML = `

            <div class="empty-state">

                No existen coincidencias.

            </div>

        `;

        return;

    }

    container.innerHTML = "";

    filtered.forEach(course => {

        const item =

            document.createElement("div");

        item.className =

            "course-selector-item";

        item.innerHTML = `

            <strong>

                ${course.name}

            </strong>

            <small>

                ${course.program || ""}

            </small>

        `;

        item.addEventListener(

            "click",

            () => {

                if (

                    typeof state.onSave ===

                    "function"

                ) {

                    state.onSave(course);

                }

                close();

            }

        );

        container.appendChild(item);

    });

}

/*==========================================================
 API PÚBLICA
==========================================================*/

return {

    init,

    close,

    open,

    openCourseDialog,

    openCourseSelector

};

})();

/*==========================================================
 INICIALIZACIÓN
==========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        SPAEDialogs.init();

    }

);  
