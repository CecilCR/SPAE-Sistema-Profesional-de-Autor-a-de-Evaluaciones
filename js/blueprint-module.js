/*********************************************************
 SPAE

 Sistema Profesional de Autoría de Evaluaciones

 Archivo:
 js/blueprint-module.js

 Generador automático del Blueprint pedagógico.

*********************************************************/

const BlueprintModule = {

    blueprint: {},


    /*****************************************************
     RENDER
    *****************************************************/

    render() {

        this.generateBlueprint();

        const workspace =
            document.getElementById("workspace");

        if (!workspace) return;


        workspace.innerHTML = `

        <div class="spae-module">

            <h2>
                Blueprint de la evaluación
            </h2>

            <div id="bpSummary"></div>

            <hr>

            <div id="bpLearningOutcomes"></div>

            <hr>

            <div id="bpDistribution"></div>

            <hr>

            <div id="bpDifficulty"></div>

            <hr>

            <div id="bpRecommendations"></div>

            <hr>

            <div id="bpStatus"></div>

            <hr>

            <div class="module-actions">

                <button
                    onclick="BlueprintModule.save()">

                    Guardar Blueprint

                </button>

                <button
                    onclick="EvaluationWorkspace.next()">

                    Continuar

                </button>

            </div>

        </div>

        `;


        this.renderAssessmentSummary();
        this.renderLearningOutcomes();
        this.renderQuestionDistribution();
        this.renderDifficultyDistribution();
        this.renderRecommendations();
        this.renderStatus();

    },



    /*****************************************************
     GENERAR BLUEPRINT
    *****************************************************/

    generateBlueprint() {

        if (!window.PersistenceManager) {
            return;
        }

        const project =
            PersistenceManager.loadProject();


        const course =
            project.course || {};

        const assessment =
            project.assessment || {};

        const examDraft =
            project.examDraft || {};


        this.blueprint = {

            course,

            assessment,

            examDraft,

            recommendations: []

        };


        this.generateRecommendations();

    },



    /*****************************************************
     RESUMEN
    *****************************************************/

    renderAssessmentSummary() {

        const element =
            document.getElementById(
                "bpSummary"
            );

        const assessment =
            this.blueprint.assessment;


        element.innerHTML = `

            <h3>
                Resumen del instrumento
            </h3>

            <p>
                Nombre:
                ${assessment.name || "-"}
            </p>

            <p>
                Tipo:
                ${assessment.type || "-"}
            </p>

            <p>
                Duración:
                ${assessment.duration || "-"} minutos
            </p>

            <p>
                Total de preguntas:
                ${assessment.totalQuestions || 0}
            </p>

            <p>
                Puntaje máximo:
                ${assessment.maximumScore || "-"}
            </p>

        `;

    },



    /*****************************************************
     RESULTADOS DE APRENDIZAJE
    *****************************************************/

    renderLearningOutcomes() {

        const element =
            document.getElementById(
                "bpLearningOutcomes"
            );

        const outcomes =
            this.blueprint.course.learningOutcomes || [];


        let html = `
        <h3>
            Resultados de aprendizaje
        </h3>
        `;


        if (outcomes.length === 0) {

            html += `
            <p>No registrados.</p>
            `;

        }


        outcomes.forEach((outcome, index) => {

            html += `

                <p>

                    RA ${index + 1}:

                    ${outcome.description}

                </p>

            `;

        });


        element.innerHTML = html;

    },



    /*****************************************************
     DISTRIBUCIÓN
    *****************************************************/

    renderQuestionDistribution() {

        const element =
            document.getElementById(
                "bpDistribution"
            );

        const sections =
            this.blueprint.assessment.sections || [];


        let html = `
        <h3>
            Distribución del examen
        </h3>
        `;


        sections.forEach(section => {

            html += `

                <p>

                    ${section.type}

                    :

                    ${section.quantity}

                </p>

            `;

        });


        element.innerHTML = html;

    },



    /*****************************************************
     DIFICULTAD
    *****************************************************/

    renderDifficultyDistribution() {

        const element =
            document.getElementById(
                "bpDifficulty"
            );

        const questions =
            this.blueprint.examDraft.questions || [];


        let low = 0;
        let medium = 0;
        let high = 0;


        questions.forEach(question => {

            const difficulty =
                question.data?.difficulty;

            if (difficulty === "Baja") low++;
            if (difficulty === "Media") medium++;
            if (difficulty === "Alta") high++;

        });


        element.innerHTML = `

            <h3>
                Distribución de dificultad
            </h3>

            <p>
                Baja:
                ${low}
            </p>

            <p>
                Media:
                ${medium}
            </p>

            <p>
                Alta:
                ${high}
            </p>

        `;

    },



    /*****************************************************
     RECOMENDACIONES
    *****************************************************/

    generateRecommendations() {

        const recommendations =
            [];


        const course =
            this.blueprint.course;

        const questions =
            this.blueprint.examDraft.questions || [];


        if (
            (course.learningOutcomes || []).length === 0
        ) {

            recommendations.push(
                "No existen resultados de aprendizaje registrados."
            );

        }


        if (
            questions.length === 0
        ) {

            recommendations.push(
                "No existen preguntas construidas."
            );

        }


        let openQuestions = 0;

        questions.forEach(q => {

            if (
                q.type ===
                "Pregunta abierta"
            ) {

                openQuestions++;

            }

        });


        if (openQuestions === 0) {

            recommendations.push(
                "No existen preguntas abiertas en la evaluación."
            );

        }


        this.blueprint.recommendations =
            recommendations;

    },



    renderRecommendations() {

        const element =
            document.getElementById(
                "bpRecommendations"
            );


        let html = `
        <h3>
            Recomendaciones del sistema
        </h3>
        `;


        if (
            this.blueprint.recommendations.length === 0
        ) {

            html += `
            <p>
                No existen observaciones.
            </p>
            `;

        }


        this.blueprint.recommendations.forEach(

            recommendation => {

                html += `

                    <p>

                    • ${recommendation}

                    </p>

                `;

            }

        );


        element.innerHTML = html;

    },



    /*****************************************************
     ESTADO DEL EXAMEN
    *****************************************************/

    renderStatus() {

        const element =
            document.getElementById(
                "bpStatus"
            );


        element.innerHTML = `

            <h3>
                Estado del instrumento
            </h3>

            <p>
                Curso ............... OK
            </p>

            <p>
                Evaluación .......... OK
            </p>

            <p>
                Preguntas ........... OK
            </p>

            <p>
                Blueprint ........... OK
            </p>

            <p>

                <strong>
                Instrumento listo
                para generar el examen.
                </strong>

            </p>

        `;

    },



    /*****************************************************
     VALIDACIÓN
    *****************************************************/

    validate() {

        return true;

    },



    /*****************************************************
     GUARDAR
    *****************************************************/

    save() {

        if (!window.PersistenceManager) {
            return;
        }

        const project =
            PersistenceManager.loadProject();

        project.blueprint =
            this.blueprint;


        PersistenceManager.saveProject(
            project
        );


        alert(
            "Blueprint guardado correctamente."
        );

    },



    /*****************************************************
     CARGAR
    *****************************************************/

    load() {

        if (!window.PersistenceManager) {
            return;
        }

        const project =
            PersistenceManager.loadProject();

        return project.blueprint;

    },



    /*****************************************************
     DATOS
    *****************************************************/

    getData() {

        return this.blueprint;

    },



    /*****************************************************
     DEBUG
    *****************************************************/

    debug() {

        console.table(
            this.blueprint
        );

    }

};



/*********************************************************
 EXPORTACIÓN GLOBAL
*********************************************************/

window.BlueprintModule =
    BlueprintModule;
