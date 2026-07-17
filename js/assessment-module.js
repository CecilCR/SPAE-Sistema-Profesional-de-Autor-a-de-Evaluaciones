/*********************************************************
 SPAE

 Sistema Profesional de Autoría de Evaluaciones

 Archivo:
 js/assessment-module.js

 VERSIÓN MVP 2.0

 RESPONSABILIDAD:

 - Configurar la evaluación.
 - Registrar los parámetros básicos.
 - Almacenar la configuración del instrumento.

*********************************************************/


const AssessmentModule = {


    /*****************************************************
     RENDERIZAR MÓDULO
    *****************************************************/

    render() {

        WorkspaceManager.render(

            `

            <div class="workspace-container">

                <h2>Configurar Evaluación</h2>

                <p>
                    Defina las características generales del
                    instrumento de evaluación.
                </p>

                <br>

                <label>Nombre de la evaluación</label>

                <input
                    type="text"
                    id="assessment-name"
                    class="form-input"
                    placeholder="Ej. Examen Sumativo Unidad 1">

                <br><br>


                <label>Tipo de evaluación</label>

                <select
                    id="assessment-type"
                    class="form-input">

                    <option>Examen Sumativo</option>
                    <option>Examen Parcial</option>
                    <option>Examen Final</option>
                    <option>Práctica Calificada</option>
                    <option>Trabajo Aplicado</option>
                    <option>Proyecto</option>

                </select>

                <br><br>


                <label>Tiempo disponible (minutos)</label>

                <input
                    type="number"
                    id="assessment-time"
                    class="form-input"
                    placeholder="120">

                <br><br>


                <label>Número de preguntas</label>

                <input
                    type="number"
                    id="assessment-questions"
                    class="form-input"
                    placeholder="20">

                <br><br>


                <label>Competencias evaluadas</label>

                <textarea
                    id="assessment-competencies"
                    class="form-input"
                    rows="4"
                    placeholder="Ingrese las competencias a evaluar."></textarea>

                <br><br>


                <label>Resultados de aprendizaje</label>

                <textarea
                    id="assessment-learning"
                    class="form-input"
                    rows="4"
                    placeholder="Ingrese los resultados de aprendizaje."></textarea>

                <br><br>


                <label>Ponderación (%)</label>

                <input
                    type="number"
                    id="assessment-weight"
                    class="form-input"
                    placeholder="30">

                <br><br>


                <label>Nivel cognitivo predominante</label>

                <select
                    id="assessment-bloom"
                    class="form-input">

                    <option>Recordar</option>
                    <option>Comprender</option>
                    <option>Aplicar</option>
                    <option>Analizar</option>
                    <option>Evaluar</option>
                    <option>Crear</option>

                </select>

                <br><br>


                <button
                    class="workspace-button button-success"
                    onclick="AssessmentModule.saveAssessment()">

                    Guardar Evaluación

                </button>

            </div>

            `

        );

    },



    /*****************************************************
     GUARDAR EVALUACIÓN
    *****************************************************/

    saveAssessment() {

        const assessment = {

            name:

                document.getElementById(
                    "assessment-name"
                ).value,

            type:

                document.getElementById(
                    "assessment-type"
                ).value,

            time:

                document.getElementById(
                    "assessment-time"
                ).value,

            totalQuestions:

                document.getElementById(
                    "assessment-questions"
                ).value,

            competencies:

                document.getElementById(
                    "assessment-competencies"
                ).value,

            learningResults:

                document.getElementById(
                    "assessment-learning"
                ).value,

            weight:

                document.getElementById(
                    "assessment-weight"
                ).value,

            bloom:

                document.getElementById(
                    "assessment-bloom"
                ).value

        };


        localStorage.setItem(

            "SPAE_ASSESSMENT",

            JSON.stringify(
                assessment
            )

        );


        WorkspaceManager.updateProjectStatus(

            "Evaluación configurada correctamente."

        );


        alert(

            "Configuración de la evaluación guardada correctamente."

        );

    },



    /*****************************************************
     OBTENER EVALUACIÓN
    *****************************************************/

    getAssessment() {

        return JSON.parse(

            localStorage.getItem(

                "SPAE_ASSESSMENT"

            )

        );

    },



    /*****************************************************
     VERIFICAR EXISTENCIA
    *****************************************************/

    exists() {

        return (

            localStorage.getItem(

                "SPAE_ASSESSMENT"

            ) !== null

        );

    },



    /*****************************************************
     ELIMINAR CONFIGURACIÓN
    *****************************************************/

    deleteAssessment() {

        localStorage.removeItem(

            "SPAE_ASSESSMENT"

        );

    },



    /*****************************************************
     DEBUG
    *****************************************************/

    debug() {

        console.log(

            this.getAssessment()

        );

    }


};



/*********************************************************
 EXPORTACIÓN GLOBAL
*********************************************************/

window.AssessmentModule = AssessmentModule;
