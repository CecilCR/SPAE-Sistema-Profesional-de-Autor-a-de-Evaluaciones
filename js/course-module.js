/*********************************************************
 SPAE

 Sistema Profesional de Autoría de Evaluaciones

 Archivo:
 js/course-module.js

 Paso 1 del flujo de construcción de una evaluación.

*********************************************************/

const CourseModule = {

    learningOutcomes: [],


    /*****************************************************
     RENDER
    *****************************************************/

    render() {

        const workspace = document.getElementById("workspace");

        if (!workspace) return;

        workspace.innerHTML = `
        <div class="spae-module">

            <h2>Información del Curso</h2>
            <p>
                Complete la información general del curso.
            </p>

            <hr>

            <div class="form-group">

                <label>Nombre del curso *</label>

                <input
                    type="text"
                    id="courseName">

            </div>


            <div class="form-group">

                <label>Programa académico *</label>

                <input
                    type="text"
                    id="program">

            </div>


            <div class="form-group">

                <label>Nivel *</label>

                <input
                    type="text"
                    id="level">

            </div>


            <div class="form-group">

                <label>Modalidad *</label>

                <select id="modality">

                    <option value="">
                        Seleccione...
                    </option>

                    <option>
                        Pregrado
                    </option>

                    <option>
                        Ejecutivo
                    </option>

                    <option>
                        Posgrado
                    </option>

                </select>

            </div>


            <div class="form-group">

                <label>Año académico *</label>

                <input
                    type="text"
                    id="academicYear"
                    placeholder="2026">

            </div>


            <div class="form-group">

                <label>Semestre *</label>

                <input
                    type="text"
                    id="semester"
                    placeholder="2026-1">

            </div>


            <div class="form-group">

                <label>Número de estudiantes</label>

                <input
                    type="number"
                    id="students">

            </div>


            <div class="form-group">

                <label>Horas pedagógicas</label>

                <input
                    type="number"
                    id="hours">

            </div>


            <div class="form-group">

                <label>Créditos</label>

                <input
                    type="number"
                    id="credits">

            </div>


            <div class="form-group">

                <label>Tipo de curso</label>

                <select id="courseType">

                    <option>
                        Presencial
                    </option>

                    <option>
                        Online
                    </option>

                    <option>
                        Híbrido
                    </option>

                </select>

            </div>



            <!-- RESULTADOS DE APRENDIZAJE -->

            <hr>

            <h3>
                Resultados de aprendizaje
            </h3>


            <textarea
                id="newLearningOutcome"
                rows="3"
                placeholder="Escriba un resultado de aprendizaje.">
            </textarea>


            <br><br>

            <button
                onclick="CourseModule.addLearningOutcome()">

                Agregar resultado de aprendizaje

            </button>


            <div
                id="learningOutcomesContainer">

            </div>


            <!-- OBSERVACIONES -->


            <hr>

            <div class="form-group">

                <label>
                    Observaciones
                </label>

                <textarea
                    id="observations"
                    rows="4">
                </textarea>

            </div>



            <!-- BOTONES -->


            <div class="module-actions">

                <button
                    onclick="CourseModule.save()">

                    Guardar Curso

                </button>


                <button
                    onclick="CourseModule.clear()">

                    Limpiar

                </button>


                <button
                    onclick="EvaluationWorkspace.next()">

                    Guardar y Continuar

                </button>

            </div>

        </div>
        `;

        this.load();

        this.renderLearningOutcomes();

    },



    /*****************************************************
     RESULTADOS DE APRENDIZAJE
    *****************************************************/

    addLearningOutcome() {

        const textarea =
            document.getElementById(
                "newLearningOutcome"
            );

        const value =
            textarea.value.trim();

        if (!value) {

            alert(
                "Debe ingresar un resultado de aprendizaje."
            );

            return;

        }

        this.learningOutcomes.push({

            id: Date.now(),

            description: value

        });

        textarea.value = "";

        this.renderLearningOutcomes();

    },



    renderLearningOutcomes() {

        const container =
            document.getElementById(
                "learningOutcomesContainer"
            );

        if (!container) return;

        container.innerHTML = "";


        this.learningOutcomes.forEach(

            outcome => {

                container.innerHTML += `

                <div class="learning-outcome-card">

                    <p>

                        ${outcome.description}

                    </p>


                    <button
                        onclick="CourseModule.removeLearningOutcome(${outcome.id})">

                        Eliminar

                    </button>

                </div>

                <hr>

                `;

            }

        );

    },



    removeLearningOutcome(id) {

        this.learningOutcomes =

            this.learningOutcomes.filter(

                item => item.id !== id

            );

        this.renderLearningOutcomes();

    },



    /*****************************************************
     OBTENER DATOS
    *****************************************************/

    getData() {

        return {

            courseName:

                document.getElementById(
                    "courseName"
                ).value,

            program:

                document.getElementById(
                    "program"
                ).value,

            level:

                document.getElementById(
                    "level"
                ).value,

            modality:

                document.getElementById(
                    "modality"
                ).value,

            academicYear:

                document.getElementById(
                    "academicYear"
                ).value,

            semester:

                document.getElementById(
                    "semester"
                ).value,

            students:

                document.getElementById(
                    "students"
                ).value,

            hours:

                document.getElementById(
                    "hours"
                ).value,

            credits:

                document.getElementById(
                    "credits"
                ).value,

            courseType:

                document.getElementById(
                    "courseType"
                ).value,

            learningOutcomes:

                this.learningOutcomes,

            observations:

                document.getElementById(
                    "observations"
                ).value

        };

    },



    /*****************************************************
     VALIDACIÓN
    *****************************************************/

    validate() {

        const data =
            this.getData();

        if (!data.courseName.trim()) {

            alert(
                "Debe ingresar el nombre del curso."
            );

            return false;

        }

        if (!data.program.trim()) {

            alert(
                "Debe ingresar el programa académico."
            );

            return false;

        }

        if (!data.level.trim()) {

            alert(
                "Debe ingresar el nivel del curso."
            );

            return false;

        }

        if (!data.modality) {

            alert(
                "Debe seleccionar una modalidad."
            );

            return false;

        }

        if (
            this.learningOutcomes.length === 0
        ) {

            alert(
                "Debe registrar al menos un resultado de aprendizaje."
            );

            return false;

        }

        return true;

    },



    /*****************************************************
     GUARDAR
    *****************************************************/

    save() {

        if (!this.validate()) {

            return false;

        }

        const data =
            this.getData();


        /*
         Integración con PersistenceManager.
        */

        if (window.PersistenceManager) {

            const project =
                PersistenceManager.loadProject();

            project.course = data;

            PersistenceManager.saveProject(
                project
            );

        }

        alert(
            "Curso guardado correctamente."
        );

        return true;

    },



    /*****************************************************
     CARGAR DATOS EXISTENTES
    *****************************************************/

    load() {

        if (!window.PersistenceManager) {

            return;

        }

        const project =
            PersistenceManager.loadProject();


        if (!project.course) {

            return;

        }


        const course =
            project.course;


        if (
            Object.keys(course).length === 0
        ) {

            return;

        }


        setTimeout(() => {

            this.setValue("courseName", course.courseName);
            this.setValue("program", course.program);
            this.setValue("level", course.level);
            this.setValue("modality", course.modality);
            this.setValue("academicYear", course.academicYear);
            this.setValue("semester", course.semester);
            this.setValue("students", course.students);
            this.setValue("hours", course.hours);
            this.setValue("credits", course.credits);
            this.setValue("courseType", course.courseType);
            this.setValue("observations", course.observations);

        }, 50);


        this.learningOutcomes =
            course.learningOutcomes || [];

    },



    /*****************************************************
     LIMPIAR
    *****************************************************/

    clear() {

        if (

            confirm(
                "¿Desea limpiar toda la información del curso?"
            )

        ) {

            this.learningOutcomes = [];

            this.render();

        }

    },



    /*****************************************************
     UTILIDAD
    *****************************************************/

    setValue(id, value) {

        const element =
            document.getElementById(id);

        if (element) {

            element.value =
                value || "";

        }

    },


    /*****************************************************
     DEBUG
    *****************************************************/

    debug() {

        console.table(
            this.getData()
        );

    }

};



/*********************************************************
 EXPORTACIÓN GLOBAL
*********************************************************/

window.CourseModule =
    CourseModule;
