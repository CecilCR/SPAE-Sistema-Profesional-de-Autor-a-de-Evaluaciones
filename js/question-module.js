/*********************************************************
 SPAE

 Sistema Profesional de Autoría de Evaluaciones

 Archivo:
 js/question-module.js

 VERSIÓN MVP 2.0

 RESPONSABILIDAD:

 - Crear preguntas.
 - Registrar preguntas del instrumento.
 - Mantener el banco de preguntas del proyecto.

*********************************************************/


const QuestionModule = {


    /*****************************************************
     RENDERIZAR MÓDULO
    *****************************************************/

    render() {

        WorkspaceManager.render(

            `

            <div class="workspace-container">

                <h2>Banco de Preguntas</h2>

                <p>
                    Registre las preguntas del instrumento
                    de evaluación.
                </p>

                <br>


                <label>Tipo de pregunta</label>

                <select
                    id="question-type"
                    class="form-input">

                    <option>Opción múltiple</option>
                    <option>Caso de aplicación</option>
                    <option>Pregunta abierta</option>
                    <option>Pregunta reflexiva</option>
                    <option>Pregunta situacional</option>

                </select>


                <br><br>


                <label>Enunciado</label>

                <textarea
                    id="question-statement"
                    class="form-input"
                    rows="5"
                    placeholder="Ingrese el enunciado de la pregunta."></textarea>


                <br><br>


                <label>Alternativa A</label>

                <input
                    type="text"
                    id="alternative-a"
                    class="form-input">


                <br><br>


                <label>Alternativa B</label>

                <input
                    type="text"
                    id="alternative-b"
                    class="form-input">


                <br><br>


                <label>Alternativa C</label>

                <input
                    type="text"
                    id="alternative-c"
                    class="form-input">


                <br><br>


                <label>Alternativa D</label>

                <input
                    type="text"
                    id="alternative-d"
                    class="form-input">


                <br><br>


                <label>Respuesta correcta</label>

                <select
                    id="correct-answer"
                    class="form-input">

                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                    <option>D</option>

                </select>


                <br><br>


                <label>Competencia asociada</label>

                <input
                    type="text"
                    id="question-competency"
                    class="form-input">


                <br><br>


                <label>Resultado de aprendizaje</label>

                <input
                    type="text"
                    id="question-learning-result"
                    class="form-input">


                <br><br>


                <label>Retroalimentación</label>

                <textarea
                    id="question-feedback"
                    class="form-input"
                    rows="3"></textarea>


                <br><br>


                <button
                    class="workspace-button button-success"
                    onclick="QuestionModule.saveQuestion()">

                    Guardar Pregunta

                </button>


                <br><br>


                <button
                    class="workspace-button button-secondary"
                    onclick="QuestionModule.showQuestionCounter()">

                    Actualizar Contador

                </button>


                <br><br>


                <div id="question-total">

                </div>


            </div>

            `

        );

    },



    /*****************************************************
     GUARDAR PREGUNTA
    *****************************************************/

    saveQuestion() {

        const questions = this.getQuestions();


        const question = {

            type:

                document.getElementById(
                    "question-type"
                ).value,

            statement:

                document.getElementById(
                    "question-statement"
                ).value,

            alternativeA:

                document.getElementById(
                    "alternative-a"
                ).value,

            alternativeB:

                document.getElementById(
                    "alternative-b"
                ).value,

            alternativeC:

                document.getElementById(
                    "alternative-c"
                ).value,

            alternativeD:

                document.getElementById(
                    "alternative-d"
                ).value,

            correctAnswer:

                document.getElementById(
                    "correct-answer"
                ).value,

            competency:

                document.getElementById(
                    "question-competency"
                ).value,

            learningResult:

                document.getElementById(
                    "question-learning-result"
                ).value,

            feedback:

                document.getElementById(
                    "question-feedback"
                ).value

        };


        questions.push(question);


        localStorage.setItem(

            "SPAE_QUESTIONS",

            JSON.stringify(
                questions
            )

        );


        WorkspaceManager.updateQuestionCounter(

            questions.length

        );


        alert(

            "Pregunta registrada correctamente."

        );

    },



    /*****************************************************
     OBTENER PREGUNTAS
    *****************************************************/

    getQuestions() {

        const data = localStorage.getItem(

            "SPAE_QUESTIONS"

        );


        return data

            ? JSON.parse(data)

            : [];

    },



    /*****************************************************
     MOSTRAR TOTAL DE PREGUNTAS
    *****************************************************/

    showQuestionCounter() {

        const total = this.getQuestions().length;


        WorkspaceManager.updateQuestionCounter(

            total

        );


        const container = document.getElementById(

            "question-total"

        );


        if (container) {

            container.innerHTML =

                `<strong>Total de preguntas registradas: ${total}</strong>`;

        }

    },



    /*****************************************************
     ELIMINAR BANCO DE PREGUNTAS
    *****************************************************/

    deleteQuestions() {

        localStorage.removeItem(

            "SPAE_QUESTIONS"

        );

    },



    /*****************************************************
     VERIFICAR EXISTENCIA
    *****************************************************/

    exists() {

        return (

            this.getQuestions().length > 0

        );

    },



    /*****************************************************
     DEBUG
    *****************************************************/

    debug() {

        console.table(

            this.getQuestions()

        );

    }


};



/*********************************************************
 EXPORTACIÓN GLOBAL
*********************************************************/

window.QuestionModule = QuestionModule;
