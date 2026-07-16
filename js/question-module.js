/*********************************************************
 SPAE

 Sistema Profesional de Autoría de Evaluaciones

 Archivo:
 js/question-module.js

 Constructor guiado del instrumento de evaluación.

*********************************************************/

const QuestionModule = {

    questionPlan: [],
    questions: [],
    currentQuestionIndex: 0,


    /*****************************************************
     RENDER PRINCIPAL
    *****************************************************/

    render() {

        this.generateQuestionPlan();

        const workspace =
            document.getElementById("workspace");

        if (!workspace) return;

        workspace.innerHTML = `

        <div class="spae-module">

            <h2>
                Construcción del instrumento
            </h2>

            <div id="questionProgress"></div>

            <hr>

            <div id="questionContainer"></div>

        </div>

        `;

        this.renderQuestion();

    },


    /*****************************************************
     GENERAR PLAN DE PREGUNTAS
    *****************************************************/

    generateQuestionPlan() {

        if (this.questionPlan.length > 0) {
            return;
        }

        if (!window.PersistenceManager) {
            return;
        }

        const project =
            PersistenceManager.loadProject();

        const assessment =
            project.assessment;

        if (!assessment) {
            return;
        }

        let counter = 1;

        assessment.sections.forEach(section => {

            for (let i = 0; i < section.quantity; i++) {

                this.questionPlan.push({

                    number: counter,
                    type: section.type

                });

                counter++;

            }

        });

    },


    /*****************************************************
     MOSTRAR PREGUNTA ACTUAL
    *****************************************************/

    renderQuestion() {

        const progress =
            document.getElementById(
                "questionProgress"
            );

        const container =
            document.getElementById(
                "questionContainer"
            );

        const question =
            this.questionPlan[
                this.currentQuestionIndex
            ];

        if (!question) {

            container.innerHTML = `

                <h3>
                    Instrumento completado.
                </h3>

                <button
                    onclick="EvaluationWorkspace.next()">

                    Continuar

                </button>

            `;

            return;
        }


        progress.innerHTML = `

            <p>

                Pregunta
                ${this.currentQuestionIndex + 1}

                de

                ${this.questionPlan.length}

            </p>

            <p>

                Tipo:
                <strong>
                    ${question.type}
                </strong>

            </p>

        `;


        switch (question.type) {

            case "Opción múltiple":
                container.innerHTML =
                    this.renderMCQ();
                break;

            case "Caso de aplicación":
                container.innerHTML =
                    this.renderCaseStudy();
                break;

            case "Pregunta abierta":
                container.innerHTML =
                    this.renderOpenQuestion();
                break;

            case "Verdadero/Falso":
                container.innerHTML =
                    this.renderTrueFalse();
                break;

            case "Emparejamiento":
                container.innerHTML =
                    this.renderMatching();
                break;

            default:
                container.innerHTML =
                    this.renderShortAnswer();

        }

    },


    /*****************************************************
     OPCIÓN MÚLTIPLE
    *****************************************************/

    renderMCQ() {

        return `

        <label>Enunciado</label>
        <textarea id="statement"></textarea>

        <label>Alternativa A</label>
        <input id="optionA">

        <label>Alternativa B</label>
        <input id="optionB">

        <label>Alternativa C</label>
        <input id="optionC">

        <label>Alternativa D</label>
        <input id="optionD">

        <label>Respuesta correcta</label>

        <select id="correctAnswer">

            <option>A</option>
            <option>B</option>
            <option>C</option>
            <option>D</option>

        </select>

        ${this.renderCommonFields()}

        ${this.renderNavigationButtons()}

        `;

    },


    /*****************************************************
     CASO DE APLICACIÓN
    *****************************************************/

    renderCaseStudy() {

        return `

        <label>Caso</label>
        <textarea id="caseText"></textarea>

        <label>Pregunta asociada</label>
        <textarea id="caseQuestion"></textarea>

        <label>Respuesta modelo</label>
        <textarea id="modelAnswer"></textarea>

        <label>Rúbrica</label>
        <textarea id="rubric"></textarea>

        ${this.renderCommonFields()}

        ${this.renderNavigationButtons()}

        `;

    },


    /*****************************************************
     PREGUNTA ABIERTA
    *****************************************************/

    renderOpenQuestion() {

        return `

        <label>Pregunta</label>
        <textarea id="openQuestion"></textarea>

        <label>Respuesta modelo</label>
        <textarea id="modelAnswer"></textarea>

        <label>Rúbrica</label>
        <textarea id="rubric"></textarea>

        <label>Longitud sugerida</label>
        <input
            id="expectedLength"
            value="80-120 palabras">

        ${this.renderCommonFields()}

        ${this.renderNavigationButtons()}

        `;

    },


    /*****************************************************
     VERDADERO / FALSO
    *****************************************************/

    renderTrueFalse() {

        return `

        <label>Enunciado</label>
        <textarea id="statement"></textarea>

        <label>Respuesta correcta</label>

        <select id="tfAnswer">

            <option>Verdadero</option>
            <option>Falso</option>

        </select>

        ${this.renderCommonFields()}

        ${this.renderNavigationButtons()}

        `;

    },


    /*****************************************************
     EMPAREJAMIENTO
    *****************************************************/

    renderMatching() {

        return `

        <label>
            Instrucciones
        </label>

        <textarea id="matchingText"></textarea>

        ${this.renderCommonFields()}

        ${this.renderNavigationButtons()}

        `;

    },


    /*****************************************************
     RESPUESTA BREVE
    *****************************************************/

    renderShortAnswer() {

        return `

        <label>Pregunta</label>

        <textarea id="question"></textarea>

        ${this.renderCommonFields()}

        ${this.renderNavigationButtons()}

        `;

    },


    /*****************************************************
     CAMPOS COMUNES
    *****************************************************/

    renderCommonFields() {

        return `

        <hr>

        <label>Puntaje</label>

        <input
            type="number"
            id="score"
            value="10">


        <label>Dificultad</label>

        <select id="difficulty">

            <option>Baja</option>
            <option>Media</option>
            <option>Alta</option>

        </select>


        <label>
            Resultado de aprendizaje
        </label>

        <input id="learningOutcome">

        `;

    },


    /*****************************************************
     BOTONES
    *****************************************************/

    renderNavigationButtons() {

        return `

        <br><br>

        <button
            onclick="QuestionModule.previousQuestion()">

            Anterior

        </button>


        <button
            onclick="QuestionModule.saveQuestion()">

            Guardar

        </button>


        <button
            onclick="QuestionModule.nextQuestion()">

            Guardar y continuar

        </button>

        `;

    },


    /*****************************************************
     GUARDAR
    *****************************************************/

    saveQuestion() {

        const question = {

            number:
                this.currentQuestionIndex + 1,

            type:
                this.questionPlan[
                    this.currentQuestionIndex
                ].type,

            data:
                this.collectFormData()

        };


        this.questions[
            this.currentQuestionIndex

        ] = question;


        this.persist();

        alert(
            "Pregunta guardada."
        );

    },


    /*****************************************************
     SIGUIENTE
    *****************************************************/

    nextQuestion() {

        this.saveQuestion();

        this.currentQuestionIndex++;

        this.renderQuestion();

    },


    /*****************************************************
     ANTERIOR
    *****************************************************/

    previousQuestion() {

        if (

            this.currentQuestionIndex > 0

        ) {

            this.currentQuestionIndex--;

            this.renderQuestion();

        }

    },


    /*****************************************************
     RECOGER DATOS
    *****************************************************/

    collectFormData() {

        const fields =

            document.querySelectorAll(

                "#questionContainer input, #questionContainer textarea, #questionContainer select"

            );


        const data = {};

        fields.forEach(field => {

            data[field.id] =
                field.value;

        });


        return data;

    },


    /*****************************************************
     PERSISTENCIA
    *****************************************************/

    persist() {

        if (!window.PersistenceManager) {

            return;

        }

        const project =
            PersistenceManager.loadProject();


        project.examDraft = {

            questionPlan:
                this.questionPlan,

            questions:
                this.questions,

            progress:
                this.calculateProgress()

        };


        PersistenceManager.saveProject(
            project
        );

    },


    /*****************************************************
     PROGRESO
    *****************************************************/

    calculateProgress() {

        return Math.round(

            (this.questions.length /
                this.questionPlan.length)

            * 100

        );

    },


    /*****************************************************
     VALIDACIÓN
    *****************************************************/

    validate() {

        return (

            this.questions.length ===
            this.questionPlan.length

        );

    },


    /*****************************************************
     FINALIZACIÓN
    *****************************************************/

    finish() {

        if (!this.validate()) {

            alert(
                "Aún existen preguntas pendientes."
            );

            return false;

        }

        return true;

    },


    /*****************************************************
     DATOS
    *****************************************************/

    getData() {

        return {

            questionPlan:
                this.questionPlan,

            questions:
                this.questions

        };

    },


    /*****************************************************
     DEBUG
    *****************************************************/

    debug() {

        console.table(
            this.questions
        );

    }

};



/*********************************************************
 EXPORTACIÓN GLOBAL
*********************************************************/

window.QuestionModule =
    QuestionModule;
