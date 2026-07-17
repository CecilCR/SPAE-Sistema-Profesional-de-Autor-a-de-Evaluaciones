/*********************************************************
 SPAE

 Sistema Profesional de Autoría de Evaluaciones

 Archivo:
 js/blueprint-module.js

 VERSIÓN MVP 2.0

 RESPONSABILIDAD:

 - Construir automáticamente el Blueprint.
 - Consolidar la información del proyecto.
 - Visualizar la estructura del instrumento.

*********************************************************/


const BlueprintModule = {


    /*****************************************************
     RENDERIZAR MÓDULO
    *****************************************************/

    render() {

        const course = this.getCourse();
        const assessment = this.getAssessment();
        const questions = this.getQuestions();

        const totalQuestions = questions.length;


        WorkspaceManager.render(

            `

            <div class="workspace-container">

                <h2>Blueprint del Instrumento</h2>

                <p>
                    El Blueprint se genera automáticamente
                    con la información registrada.
                </p>

                <br>


                <h3>Curso</h3>

                <p>
                    <strong>Nombre:</strong>
                    ${course.name || "No registrado"}
                </p>

                <p>
                    <strong>Programa:</strong>
                    ${course.program || "No registrado"}
                </p>


                <br>


                <h3>Evaluación</h3>

                <p>
                    <strong>Nombre:</strong>
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

                <p>
                    <strong>Ponderación:</strong>
                    ${assessment.weight || "No registrada"} %
                </p>

                <p>
                    <strong>Nivel Cognitivo:</strong>
                    ${assessment.bloom || "No registrado"}
                </p>


                <br>


                <h3>Banco de Preguntas</h3>

                <p>
                    <strong>Total:</strong>
                    ${totalQuestions}
                </p>


                <br>


                <h3>Distribución por tipo</h3>

                ${this.generateQuestionDistribution(questions)}


                <br>


                <h3>Competencias</h3>

                <p>
                    ${assessment.competencies || "No registradas"}
                </p>


                <br>


                <h3>Resultados de Aprendizaje</h3>

                <p>
                    ${assessment.learningResults || "No registrados"}
                </p>


                <br>


                <button
                    class="workspace-button button-success"
                    onclick="BlueprintModule.updateBlueprintStatus()">

                    Confirmar Blueprint

                </button>

            </div>

            `

        );

    },



    /*****************************************************
     DISTRIBUCIÓN DE PREGUNTAS
    *****************************************************/

    generateQuestionDistribution(questions) {

        if (questions.length === 0) {

            return "<p>No existen preguntas registradas.</p>";

        }


        const distribution = {};


        questions.forEach(question => {

            const type = question.type;

            distribution[type] =

                (distribution[type] || 0) + 1;

        });


        let html = "<ul>";


        for (const type in distribution) {

            html += `

                <li>

                    ${type}: ${distribution[type]}

                </li>

            `;

        }


        html += "</ul>";


        return html;

    },



    /*****************************************************
     ACTUALIZAR ESTADO DEL BLUEPRINT
    *****************************************************/

    updateBlueprintStatus() {

        WorkspaceManager.updateBlueprintStatus(

            "Blueprint generado."

        );


        WorkspaceManager.updateProjectStatus(

            "Blueprint construido correctamente."

        );


        alert(

            "Blueprint generado correctamente."

        );

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
     EXPORTAR BLUEPRINT
    *****************************************************/

    getBlueprint() {

        return {

            course:

                this.getCourse(),

            assessment:

                this.getAssessment(),

            questions:

                this.getQuestions()

        };

    },



    /*****************************************************
     DEBUG
    *****************************************************/

    debug() {

        console.log(

            this.getBlueprint()

        );

    }


};



/*********************************************************
 EXPORTACIÓN GLOBAL
*********************************************************/

window.BlueprintModule = BlueprintModule;
