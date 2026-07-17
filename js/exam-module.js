/*********************************************************
 SPAE

 Sistema Profesional de Autoría de Evaluaciones

 Archivo:
 js/exam-module.js

 VERSIÓN MVP 2.0

 RESPONSABILIDAD:

 - Construir automáticamente el examen.
 - Consolidar toda la información del proyecto.
 - Generar una vista previa del instrumento.
 - Dejar el examen listo para exportación.

*********************************************************/


const ExamModule = {


    /*****************************************************
     RENDERIZAR MÓDULO
    *****************************************************/

    render() {

        const course = this.getCourse();
        const assessment = this.getAssessment();
        const questions = this.getQuestions();


        WorkspaceManager.render(

            `

            <div class="workspace-container">

                <h2>

                    Generador del Examen

                </h2>

                <p>

                    Vista previa del instrumento de evaluación.

                </p>

                <br>


                <h3>

                    Información General

                </h3>

                <p>

                    <strong>Curso:</strong>
                    ${course.name || "No registrado"}

                </p>

                <p>

                    <strong>Evaluación:</strong>
                    ${assessment.name || "No registrada"}

                </p>

                <p>

                    <strong>Tipo:</strong>
                    ${assessment.type || "No registrado"}

                </p>

                <p>

                    <strong>Tiempo:</strong>
                    ${assessment.time || "No registrado"} minutos

                </p>


                <br>


                <h3>

                    Instrucciones Generales

                </h3>

                <p>

                    Lea atentamente cada pregunta antes de responder.

                </p>

                <p>

                    Utilice argumentos claros y precisos cuando corresponda.

                </p>


                <br>


                <h3>

                    Preguntas del Instrumento

                </h3>


                ${this.generateQuestionsHTML(questions)}


                <br>


                <button

                    class="workspace-button button-success"

                    onclick="ExamModule.generateExam()">

                    Generar Examen

                </button>

            </div>

            `

        );

    },



    /*****************************************************
     GENERAR EXAMEN
    *****************************************************/

    generateExam() {

        const exam = {

            course:

                this.getCourse(),

            assessment:

                this.getAssessment(),

            questions:

                this.getQuestions()

        };


        localStorage.setItem(

            "SPAE_EXAM",

            JSON.stringify(
                exam
            )

        );


        WorkspaceManager.updateExamStatus(

            "Examen generado."

        );


        WorkspaceManager.updateProjectStatus(

            "Examen construido correctamente."

        );


        alert(

            "Examen generado correctamente."

        );

    },



    /*****************************************************
     GENERAR HTML DE LAS PREGUNTAS
    *****************************************************/

    generateQuestionsHTML(questions) {

        if (questions.length === 0) {

            return `

                <p>

                    No existen preguntas registradas.

                </p>

            `;

        }


        let html = "";


        questions.forEach((question, index) => {


            html += `

                <div class="workspace-card">

                    <h4>

                        Pregunta ${index + 1}

                    </h4>


                    <p>

                        <strong>Tipo:</strong>
                        ${question.type}

                    </p>


                    <p>

                        ${question.statement}

                    </p>


                    <ul>

                        <li>A. ${question.alternativeA || ""}</li>

                        <li>B. ${question.alternativeB || ""}</li>

                        <li>C. ${question.alternativeC || ""}</li>

                        <li>D. ${question.alternativeD || ""}</li>

                    </ul>


                    <p>

                        <strong>Respuesta correcta:</strong>
                        ${question.correctAnswer || "-"}

                    </p>


                    <p>

                        <strong>Competencia:</strong>
                        ${question.competency || "-"}

                    </p>


                    <p>

                        <strong>Resultado de aprendizaje:</strong>
                        ${question.learningResult || "-"}

                    </p>

                </div>

                <br>

            `;

        });


        return html;

    },



    /*****************************************************
     OBTENER CURSO
    *****************************************************/

    getCourse() {

        return JSON.parse(

            localStorage.getItem(

                "SPAE_COURSE"

            )

        ) || {};

    },



    /*****************************************************
     OBTENER EVALUACIÓN
    *****************************************************/

    getAssessment() {

        return JSON.parse(

            localStorage.getItem(

                "SPAE_ASSESSMENT"

            )

        ) || {};

    },



    /*****************************************************
     OBTENER PREGUNTAS
    *****************************************************/

    getQuestions() {

        return JSON.parse(

            localStorage.getItem(

                "SPAE_QUESTIONS"

            )

        ) || [];

    },



    /*****************************************************
     OBTENER EXAMEN
    *****************************************************/

    getExam() {

        return JSON.parse(

            localStorage.getItem(

                "SPAE_EXAM"

            )

        );

    },



    /*****************************************************
     VERIFICAR EXISTENCIA DEL EXAMEN
    *****************************************************/

    exists() {

        return (

            localStorage.getItem(

                "SPAE_EXAM"

            ) !== null

        );

    },



    /*****************************************************
     ELIMINAR EXAMEN
    *****************************************************/

    deleteExam() {

        localStorage.removeItem(

            "SPAE_EXAM"

        );

    },



    /*****************************************************
     DEBUG
    *****************************************************/

    debug() {

        console.log(

            this.getExam()

        );

    }


};



/*********************************************************
 EXPORTACIÓN GLOBAL
*********************************************************/

window.ExamModule = ExamModule;
