/*********************************************************
 SPAE

 Sistema Profesional de Autoría de Evaluaciones

 Archivo:
 js/exam-module.js

 Generador y vista previa del examen final.

*********************************************************/

const ExamModule = {

    finalExam: null,


    /*****************************************************
     RENDER PRINCIPAL
    *****************************************************/

    render() {

        const workspace =
            document.getElementById("workspace");

        if (!workspace) return;

        if (!this.validateExam()) {

            workspace.innerHTML = `

                <div class="spae-module">

                    <h2>
                        No es posible generar el examen
                    </h2>

                    <p>
                        Verifique que todos los pasos
                        anteriores hayan sido completados.
                    </p>

                </div>

            `;

            return;
        }


        this.generateFinalExam();


        workspace.innerHTML = `

        <div class="spae-module">

            <h2>
                Vista previa del examen
            </h2>

            <div id="examPreview">

            </div>


            <hr>

            <div class="module-actions">

                <button
                    onclick="ExamModule.save()">

                    Guardar examen

                </button>

                <button
                    onclick="EvaluationWorkspace.next()">

                    Continuar

                </button>

            </div>

        </div>

        `;


        this.renderPreview();

    },



    /*****************************************************
     VALIDACIÓN DEL EXAMEN
    *****************************************************/

    validateExam() {

        if (!window.PersistenceManager) {
            return false;
        }

        const project =
            PersistenceManager.loadProject();


        if (!project.course) return false;
        if (!project.assessment) return false;
        if (!project.examDraft) return false;
        if (!project.blueprint) return false;

        if (
            !project.course.learningOutcomes ||
            project.course.learningOutcomes.length === 0
        ) {
            return false;
        }

        if (
            !project.assessment.sections ||
            project.assessment.sections.length === 0
        ) {
            return false;
        }

        if (
            !project.examDraft.questions ||
            project.examDraft.questions.length === 0
        ) {
            return false;
        }

        return true;

    },



    /*****************************************************
     GENERAR EXAMEN FINAL
    *****************************************************/

    generateFinalExam() {

        const project =
            PersistenceManager.loadProject();


        const course =
            project.course;

        const assessment =
            project.assessment;

        const questions =
            project.examDraft.questions;


        this.finalExam = {

            metadata: {

                title:
                    assessment.name,

                courseName:
                    course.courseName,

                program:
                    course.program,

                level:
                    course.level,

                semester:
                    course.semester,

                duration:
                    assessment.duration

            },

            instructions: [

                "Lea atentamente cada pregunta.",

                "Administre adecuadamente su tiempo.",

                "Responda de acuerdo con las instrucciones indicadas.",

                "Revise sus respuestas antes de finalizar."

            ],

            sections:

                assessment.sections,


            questions:

                questions,


            grading: {

                maximumScore:
                    assessment.maximumScore,

                passingScore:
                    assessment.passingScore

            },


            footer: {

                message:
                    "Fin del instrumento de evaluación."

            }

        };

    },



    /*****************************************************
     VISTA PREVIA COMPLETA
    *****************************************************/

    renderPreview() {

        const preview =
            document.getElementById(
                "examPreview"
            );

        if (!preview) return;


        preview.innerHTML = `

            ${this.renderHeader()}

            <hr>

            ${this.renderInstructions()}

            <hr>

            ${this.renderSections()}

            <hr>

            ${this.renderQuestions()}

            <hr>

            ${this.renderFooter()}

        `;

    },



    /*****************************************************
     CABECERA
    *****************************************************/

    renderHeader() {

        const meta =
            this.finalExam.metadata;


        return `

        <h1>

            ${meta.title}

        </h1>


        <p>

            <strong>Curso:</strong>

            ${meta.courseName}

        </p>


        <p>

            <strong>Programa:</strong>

            ${meta.program}

        </p>


        <p>

            <strong>Nivel:</strong>

            ${meta.level}

        </p>


        <p>

            <strong>Semestre:</strong>

            ${meta.semester}

        </p>


        <p>

            <strong>Duración:</strong>

            ${meta.duration} minutos

        </p>

        `;

    },



    /*****************************************************
     INSTRUCCIONES
    *****************************************************/

    renderInstructions() {

        let html = `

        <h3>
            Instrucciones
        </h3>

        <ul>

        `;


        this.finalExam.instructions.forEach(

            instruction => {

                html += `

                <li>

                    ${instruction}

                </li>

                `;

            }

        );


        html += `

        </ul>

        `;


        return html;

    },



    /*****************************************************
     SECCIONES
    *****************************************************/

    renderSections() {

        let html = `

        <h3>
            Estructura del examen
        </h3>

        `;


        this.finalExam.sections.forEach(

            section => {

                html += `

                <p>

                    <strong>
                        ${section.type}
                    </strong>

                    (${section.quantity})

                </p>

                `;

            }

        );


        return html;

    },



    /*****************************************************
     PREGUNTAS
    *****************************************************/

    renderQuestions() {

        let html = `

        <h3>
            Preguntas del examen
        </h3>

        `;


        this.finalExam.questions.forEach(

            question => {

                html += `

                <div class="exam-question">

                    <h4>

                        Pregunta
                        ${question.number}

                    </h4>


                    <p>

                        <strong>
                            Tipo:
                        </strong>

                        ${question.type}

                    </p>

                `;


                html +=
                    this.renderQuestionContent(
                        question
                    );


                html += `

                <hr>

                </div>

                `;

            }

        );


        return html;

    },



    /*****************************************************
     CONTENIDO DE LAS PREGUNTAS
    *****************************************************/

    renderQuestionContent(question) {

        let html = "";

        const data =
            question.data;


        Object.keys(data).forEach(key => {

            html += `

                <p>

                    <strong>
                        ${key}:
                    </strong>

                    ${data[key]}

                </p>

            `;

        });


        return html;

    },



    /*****************************************************
     PIE DEL EXAMEN
    *****************************************************/

    renderFooter() {

        const grading =
            this.finalExam.grading;

        const footer =
            this.finalExam.footer;


        return `

        <h3>
            Información de evaluación
        </h3>

        <p>

            Puntaje máximo:

            ${grading.maximumScore}

        </p>


        <p>

            Puntaje mínimo de aprobación:

            ${grading.passingScore}

        </p>


        <hr>


        <p>

            ${footer.message}

        </p>

        `;

    },



    /*****************************************************
     GUARDAR EXAMEN
    *****************************************************/

    save() {

        if (!window.PersistenceManager) {
            return;
        }


        const project =
            PersistenceManager.loadProject();


        project.finalExam =
            this.finalExam;


        PersistenceManager.saveProject(
            project
        );


        alert(
            "Examen generado correctamente."
        );

    },



    /*****************************************************
     CARGAR EXAMEN
    *****************************************************/

    load() {

        if (!window.PersistenceManager) {
            return null;
        }

        const project =
            PersistenceManager.loadProject();

        return project.finalExam;

    },



    /*****************************************************
     OBTENER DATOS
    *****************************************************/

    getData() {

        return this.finalExam;

    },



    /*****************************************************
     DEBUG
    *****************************************************/

    debug() {

        console.log(
            this.finalExam
        );

    }

};



/*********************************************************
 EXPORTACIÓN GLOBAL
*********************************************************/

window.ExamModule =
    ExamModule;
