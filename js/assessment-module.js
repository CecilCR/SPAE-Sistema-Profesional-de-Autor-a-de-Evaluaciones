/*********************************************************
 SPAE

 Sistema Profesional de Autoría de Evaluaciones

 Archivo:
 js/assessment-module.js

 Paso 2 del flujo operativo del sistema.

*********************************************************/

const AssessmentModule = {

    sections: [],


    /*****************************************************
     RENDER
    *****************************************************/

    render() {

        const workspace =
            document.getElementById("workspace");

        if (!workspace) return;


        workspace.innerHTML = `

        <div class="spae-module">

            <h2>Configuración de la Evaluación</h2>

            <p>
                Defina las características generales
                del instrumento de evaluación.
            </p>

            <hr>


            <div class="form-group">

                <label>
                    Nombre de la evaluación *
                </label>

                <input
                    type="text"
                    id="assessmentName">

            </div>


            <div class="form-group">

                <label>
                    Tipo de evaluación *
                </label>

                <select id="assessmentType">

                    <option value="">
                        Seleccione...
                    </option>

                    <option>Diagnóstica</option>
                    <option>Formativa</option>
                    <option>Sumativa</option>
                    <option>Parcial</option>
                    <option>Final</option>
                    <option>Recuperativa</option>
                    <option>Proyecto</option>
                    <option>Presentación</option>

                </select>

            </div>


            <div class="form-group">

                <label>
                    Tiempo total (minutos)
                </label>

                <input
                    type="number"
                    id="duration"
                    value="90">

            </div>


            <div class="form-group">

                <label>
                    Puntaje máximo
                </label>

                <input
                    type="number"
                    id="maximumScore"
                    value="100">

            </div>


            <div class="form-group">

                <label>
                    Puntaje mínimo de aprobación
                </label>

                <input
                    type="number"
                    id="passingScore"
                    value="60">

            </div>


            <div class="form-group">

                <label>
                    Modalidad
                </label>

                <select id="assessmentModality">

                    <option>
                        Presencial
                    </option>

                    <option>
                        Online
                    </option>

                    <option>
                        Mixta
                    </option>

                </select>

            </div>


            <hr>

            <h3>
                Secciones del instrumento
            </h3>


            <div class="section-builder">

                <select id="sectionType">

                    <option>
                        Opción múltiple
                    </option>

                    <option>
                        Caso de aplicación
                    </option>

                    <option>
                        Pregunta abierta
                    </option>

                    <option>
                        Verdadero/Falso
                    </option>

                    <option>
                        Emparejamiento
                    </option>

                    <option>
                        Desarrollo breve
                    </option>

                </select>


                <input
                    type="number"
                    id="sectionQuantity"
                    placeholder="Cantidad">


                <button
                    onclick="AssessmentModule.addSection()">

                    Agregar sección

                </button>

            </div>


            <br>


            <div
                id="sectionsContainer">

            </div>


            <hr>


            <div id="assessmentSummary">

            </div>


            <div class="module-actions">

                <button
                    onclick="AssessmentModule.save()">

                    Guardar

                </button>


                <button
                    onclick="AssessmentModule.clear()">

                    Limpiar

                </button>


                <button
                    onclick="EvaluationWorkspace.next()">

                    Guardar y continuar

                </button>

            </div>

        </div>
        `;


        this.load();

        this.renderSections();

        this.updateSummary();

    },



    /*****************************************************
     AGREGAR SECCIÓN
    *****************************************************/

    addSection() {

        const type =
            document.getElementById(
                "sectionType"
            ).value;


        const quantity =
            Number(

                document.getElementById(
                    "sectionQuantity"
                ).value

            );


        if (!quantity || quantity <= 0) {

            alert(
                "Debe indicar la cantidad."
            );

            return;

        }


        this.sections.push({

            id: Date.now(),

            type,

            quantity

        });


        this.renderSections();

        this.updateSummary();

    },



    /*****************************************************
     ELIMINAR SECCIÓN
    *****************************************************/

    removeSection(id) {

        this.sections =

            this.sections.filter(

                section =>
                    section.id !== id

            );


        this.renderSections();

        this.updateSummary();

    },



    /*****************************************************
     MOSTRAR SECCIONES
    *****************************************************/

    renderSections() {

        const container =
            document.getElementById(
                "sectionsContainer"
            );

        if (!container) return;

        container.innerHTML = "";


        this.sections.forEach(

            section => {

                container.innerHTML += `

                <div class="section-card">

                    <p>

                        <strong>
                        ${section.type}
                        </strong>

                    </p>

                    <p>

                        Cantidad:
                        ${section.quantity}

                    </p>


                    <button
                        onclick="AssessmentModule.removeSection(${section.id})">

                        Eliminar

                    </button>

                    <hr>

                </div>

                `;

            }

        );

    },



    /*****************************************************
     RESUMEN AUTOMÁTICO
    *****************************************************/

    updateSummary() {

        const element =
            document.getElementById(
                "assessmentSummary"
            );

        if (!element) return;


        const totalQuestions =

            this.sections.reduce(

                (total, section) =>

                    total + section.quantity,

                0

            );


        element.innerHTML = `

            <h3>
                Resumen del instrumento
            </h3>

            <p>
                Número total de ítems:
                <strong>${totalQuestions}</strong>
            </p>

        `;

    },



    /*****************************************************
     DATOS DEL MÓDULO
    *****************************************************/

    getData() {

        const totalQuestions =

            this.sections.reduce(

                (total, section) =>

                    total + section.quantity,

                0

            );


        return {

            name:
                document.getElementById(
                    "assessmentName"
                ).value,

            type:
                document.getElementById(
                    "assessmentType"
                ).value,

            duration:
                document.getElementById(
                    "duration"
                ).value,

            maximumScore:
                document.getElementById(
                    "maximumScore"
                ).value,

            passingScore:
                document.getElementById(
                    "passingScore"
                ).value,

            modality:
                document.getElementById(
                    "assessmentModality"
                ).value,

            totalQuestions,

            sections:
                this.sections

        };

    },



    /*****************************************************
     VALIDACIÓN
    *****************************************************/

    validate() {

        const data =
            this.getData();


        if (!data.name.trim()) {

            alert(
                "Debe ingresar un nombre."
            );

            return false;

        }


        if (!data.type) {

            alert(
                "Debe seleccionar un tipo de evaluación."
            );

            return false;

        }


        if (this.sections.length === 0) {

            alert(
                "Debe definir al menos una sección."
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


        if (window.PersistenceManager) {

            const project =
                PersistenceManager.loadProject();

            project.assessment = data;

            PersistenceManager.saveProject(
                project
            );

        }


        alert(
            "Configuración guardada correctamente."
        );

        return true;

    },



    /*****************************************************
     CARGAR DATOS
    *****************************************************/

    load() {

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


        this.sections =
            assessment.sections || [];


        setTimeout(() => {

            this.setValue(
                "assessmentName",
                assessment.name
            );

            this.setValue(
                "assessmentType",
                assessment.type
            );

            this.setValue(
                "duration",
                assessment.duration
            );

            this.setValue(
                "maximumScore",
                assessment.maximumScore
            );

            this.setValue(
                "passingScore",
                assessment.passingScore
            );

            this.setValue(
                "assessmentModality",
                assessment.modality
            );

        }, 50);

    },



    /*****************************************************
     LIMPIAR
    *****************************************************/

    clear() {

        if (

            confirm(
                "¿Desea eliminar la configuración?"
            )

        ) {

            this.sections = [];

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

window.AssessmentModule =
    AssessmentModule;
