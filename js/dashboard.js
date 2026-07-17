/*********************************************************
 SPAE

 Sistema Profesional de Autoría de Evaluaciones

 Archivo:
 js/dashboard-module.js

 VERSIÓN MVP 2.0

 RESPONSABILIDAD:

 - Mostrar el estado general del proyecto.
 - Mostrar el flujo de trabajo del docente.
 - Servir como pantalla de inicio del sistema.

*********************************************************/


const DashboardModule = {


    /*****************************************************
     RENDERIZAR DASHBOARD
    *****************************************************/

    render() {

        const course = this.getCourseName();

        const questions = this.getQuestionCount();


        WorkspaceManager.render(

            `

            <div class="workspace-container">

                <h2>

                    Bienvenido al SPAE

                </h2>


                <p>

                    El Sistema Profesional de Autoría de
                    Evaluaciones está listo para comenzar.

                </p>


                <br>


                <h3>

                    Flujo del Instrumento

                </h3>


                <ol>

                    <li>Crear curso.</li>
                    <li>Configurar evaluación.</li>
                    <li>Crear preguntas.</li>
                    <li>Construir Blueprint.</li>
                    <li>Generar examen.</li>
                    <li>Exportar instrumento.</li>

                </ol>


                <br>


                <h3>

                    Estado del Proyecto

                </h3>


                <p>

                    <strong>Curso:</strong>
                    ${course}

                </p>


                <p>

                    <strong>Total de preguntas:</strong>
                    ${questions}

                </p>


                <br>


                <div class="workspace-actions">

                    <button

                        class="workspace-button button-primary"

                        onclick="Navigation.open('course')">

                        Crear Curso

                    </button>


                    <button

                        class="workspace-button button-primary"

                        onclick="Navigation.open('question')">

                        Crear Preguntas

                    </button>


                    <button

                        class="workspace-button button-success"

                        onclick="Navigation.open('exam')">

                        Construir Examen

                    </button>

                </div>

            </div>

            `

        );

    },



    /*****************************************************
     OBTENER CURSO
    *****************************************************/

    getCourseName() {

        const course = JSON.parse(

            localStorage.getItem(
                "SPAE_COURSE"
            )

        );


        if (!course) {

            return "No registrado.";

        }


        return course.name;

    },



    /*****************************************************
     TOTAL DE PREGUNTAS
    *****************************************************/

    getQuestionCount() {

        const questions = JSON.parse(

            localStorage.getItem(
                "SPAE_QUESTIONS"
            )

        ) || [];


        return questions.length;

    },



    /*****************************************************
     DEBUG
    *****************************************************/

    debug() {

        console.log(

            "Dashboard operativo."

        );

    }


};



/*********************************************************
 EXPORTACIÓN GLOBAL
*********************************************************/

window.DashboardModule = DashboardModule;
