/*********************************************************
 SPAE

 Sistema Profesional de Autoría de Evaluaciones

 Archivo:
 js/course-module.js

 VERSIÓN MVP 2.0

 RESPONSABILIDAD:

 - Crear un curso.
 - Registrar la información básica.
 - Actualizar el proyecto activo.

*********************************************************/


const CourseModule = {


    /*****************************************************
     RENDERIZAR MÓDULO
    *****************************************************/

    render() {

        WorkspaceManager.render(

            `

            <div class="workspace-container">

                <h2>Crear Curso</h2>

                <p>
                    Complete la información general del curso.
                </p>

                <br>

                <label>Nombre del curso</label>

                <input
                    type="text"
                    id="course-name"
                    class="form-input"
                    placeholder="Ej. Gestión de las Organizaciones">

                <br><br>


                <label>Programa académico</label>

                <input
                    type="text"
                    id="course-program"
                    class="form-input"
                    placeholder="Ej. Administración de Empresas">

                <br><br>


                <label>Nivel académico</label>

                <input
                    type="text"
                    id="course-level"
                    class="form-input"
                    placeholder="Ej. Media Carrera">

                <br><br>


                <label>Modalidad</label>

                <select
                    id="course-modality"
                    class="form-input">

                    <option>Presencial</option>
                    <option>Virtual</option>
                    <option>Híbrida</option>

                </select>

                <br><br>


                <label>Duración del curso</label>

                <input
                    type="text"
                    id="course-duration"
                    class="form-input"
                    placeholder="Ej. 16 semanas">

                <br><br>


                <label>Número de estudiantes</label>

                <input
                    type="number"
                    id="course-students"
                    class="form-input"
                    placeholder="30">

                <br><br>


                <button
                    class="workspace-button button-success"
                    onclick="CourseModule.saveCourse()">

                    Guardar Curso

                </button>

            </div>

            `

        );

    },



    /*****************************************************
     GUARDAR CURSO
    *****************************************************/

    saveCourse() {


        const course = {

            name:

                document.getElementById(
                    "course-name"
                ).value,

            program:

                document.getElementById(
                    "course-program"
                ).value,

            level:

                document.getElementById(
                    "course-level"
                ).value,

            modality:

                document.getElementById(
                    "course-modality"
                ).value,

            duration:

                document.getElementById(
                    "course-duration"
                ).value,

            students:

                document.getElementById(
                    "course-students"
                ).value

        };


        localStorage.setItem(

            "SPAE_COURSE",

            JSON.stringify(course)

        );


        WorkspaceManager.updateCourseName(

            course.name

        );


        WorkspaceManager.updateProjectStatus(

            "Curso creado correctamente."

        );


        alert(

            "Curso registrado correctamente."

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

        );

    },



    /*****************************************************
     VERIFICAR EXISTENCIA DEL CURSO
    *****************************************************/

    exists() {

        return (

            localStorage.getItem(

                "SPAE_COURSE"

            ) !== null

        );

    },



    /*****************************************************
     ELIMINAR CURSO
    *****************************************************/

    deleteCourse() {

        localStorage.removeItem(

            "SPAE_COURSE"

        );

    },



    /*****************************************************
     DEBUG
    *****************************************************/

    debug() {

        console.log(

            this.getCourse()

        );

    }


};



/*********************************************************
 EXPORTACIÓN GLOBAL
*********************************************************/

window.CourseModule = CourseModule;
