/*********************************************************
 SPAE

 Sistema Profesional de Autoría de Evaluaciones

 Archivo:
 js/form-engine.js

 Motor reutilizable de formularios académicos.

*********************************************************/


const FormEngine = {


    /*****************************************************
     CONFIGURACIÓN
    *****************************************************/

    currentForm: null,

    currentData: {},

    currentStep: 0,



    /*****************************************************
     INICIALIZACIÓN
    *****************************************************/

    init() {

        console.log(
            "Form Engine inicializado."
        );

    },



    /*****************************************************
     RENDER PRINCIPAL
    *****************************************************/

    render(formConfig) {

        this.currentForm = formConfig;

        this.currentStep = 0;

        const workspace = document.getElementById(
            "workspace"
        );

        if (!workspace) {

            return;

        }

        workspace.innerHTML =

            this.buildForm(formConfig);

    },



    /*****************************************************
     CONSTRUCCIÓN DEL FORMULARIO
    *****************************************************/

    buildForm(formConfig) {

        let html = "";


        html += `
        <div class="spae-form">

            <h2>${formConfig.title}</h2>

            <p>${formConfig.description || ""}</p>

            <hr>
        `;


        formConfig.fields.forEach(field => {

            html += this.renderField(
                field
            );

        });


        html += this.renderButtons();

        html += "</div>";

        return html;

    },



    /*****************************************************
     RENDER DE CAMPOS
    *****************************************************/

    renderField(field) {

        switch (field.type) {


            case "text":

                return `

                <div class="form-group">

                    <label>

                        ${field.label}

                    </label>

                    <input
                        type="text"
                        id="${field.id}"
                        placeholder="${field.placeholder || ""}">

                </div>

                `;


            case "number":

                return `

                <div class="form-group">

                    <label>

                        ${field.label}

                    </label>

                    <input
                        type="number"
                        id="${field.id}">

                </div>

                `;


            case "textarea":

                return `

                <div class="form-group">

                    <label>

                        ${field.label}

                    </label>

                    <textarea
                        id="${field.id}"
                        rows="5">

                    </textarea>

                </div>

                `;


            case "select":

                return this.renderSelect(
                    field
                );


            case "checkbox":

                return this.renderCheckbox(
                    field
                );


            case "dynamic-list":

                return this.renderDynamicList(
                    field
                );


            default:

                return "";

        }

    },



    /*****************************************************
     SELECT
    *****************************************************/

    renderSelect(field) {

        let html = `

        <div class="form-group">

        <label>

        ${field.label}

        </label>

        <select id="${field.id}">
        `;


        field.options.forEach(option => {

            html += `

            <option>

            ${option}

            </option>

            `;

        });


        html += `
        </select>
        </div>
        `;

        return html;

    },



    /*****************************************************
     CHECKBOX
    *****************************************************/

    renderCheckbox(field) {

        return `

        <div class="form-group">

            <input
                type="checkbox"
                id="${field.id}">

            <label>

                ${field.label}

            </label>

        </div>

        `;

    },



    /*****************************************************
     LISTAS DINÁMICAS

     Ideal para:

     - Resultados de aprendizaje
     - Competencias
     - Indicadores
     - Criterios

    *****************************************************/

    renderDynamicList(field) {

        return `

        <div class="form-group">

            <label>

                ${field.label}

            </label>

            <div
                id="${field.id}">

            </div>


            <button
                type="button"
                onclick="FormEngine.addDynamicItem('${field.id}')">

                Agregar

            </button>

        </div>

        `;

    },



    /*****************************************************
     AGREGAR ELEMENTOS DINÁMICOS
    *****************************************************/

    addDynamicItem(id) {

        const container =
            document.getElementById(id);


        const input =
            document.createElement(
                "input"
            );

        input.type = "text";

        input.className =
            "dynamic-item";


        container.appendChild(
            input
        );

    },



    /*****************************************************
     BOTONES
    *****************************************************/

    renderButtons() {

        return `

        <div class="form-actions">

            <button
                onclick="FormEngine.save()">

                Guardar

            </button>


            <button
                onclick="FormEngine.clear()">

                Limpiar

            </button>


            <button
                onclick="Navigation.open('dashboard')">

                Dashboard

            </button>

        </div>

        `;

    },



    /*****************************************************
     VALIDACIONES
    *****************************************************/

    validate() {

        const fields =
            this.currentForm.fields;


        for (const field of fields) {

            if (!field.required) {

                continue;

            }

            const element =
                document.getElementById(
                    field.id
                );

            if (!element) {

                continue;

            }

            if (

                element.value.trim() === ""

            ) {

                alert(

                    `El campo "${field.label}" es obligatorio.`

                );

                return false;

            }

        }


        return true;

    },



    /*****************************************************
     OBTENER DATOS
    *****************************************************/

    getData() {

        const data = {};


        this.currentForm.fields.forEach(
            field => {

                const element =
                    document.getElementById(
                        field.id
                    );


                if (!element) {

                    return;

                }


                data[field.id] =
                    element.value;

            }
        );


        return data;

    },



    /*****************************************************
     GUARDAR
    *****************************************************/

    save() {

        if (!this.validate()) {

            return;

        }


        const data =
            this.getData();


        this.currentData =
            data;


        /*
        Integración con PersistenceManager.
        */

        if (

            window.PersistenceManager &&
            this.currentForm.storageKey

        ) {

            const project =
                PersistenceManager
                .loadProject();


            project[
                this.currentForm.storageKey
            ] = data;


            PersistenceManager
                .saveProject(project);

        }


        alert(
            "Información guardada correctamente."
        );

    },



    /*****************************************************
     LIMPIAR
    *****************************************************/

    clear() {

        this.currentForm.fields.forEach(
            field => {

                const element =
                    document.getElementById(
                        field.id
                    );

                if (!element) {

                    return;

                }

                element.value = "";

            }
        );

    },



    /*****************************************************
     AUTOGUARDADO
    *****************************************************/

    autoSave() {

        if (

            window.PersistenceManager

        ) {

            this.save();

        }

    },



    /*****************************************************
     MULTI STEP WIZARD

     Preparado para futuras versiones.

    *****************************************************/

    nextStep() {

        this.currentStep++;

    },


    previousStep() {

        this.currentStep--;

    },



    /*****************************************************
     CARGAR DATOS EXISTENTES
    *****************************************************/

    loadData(data) {

        Object.keys(data).forEach(
            key => {

                const element =
                    document.getElementById(
                        key
                    );

                if (element) {

                    element.value =
                        data[key];

                }

            }
        );

    },


    /*****************************************************
     DASHBOARD

     Preparado para futuras versiones.
    *****************************************************/

    updateDashboard() {

        console.log(
            "Dashboard actualizado."
        );

    }


};



/*********************************************************
 EXPORTACIÓN GLOBAL
*********************************************************/

window.FormEngine =
    FormEngine;



/*********************************************************
 INICIALIZACIÓN AUTOMÁTICA
*********************************************************/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        FormEngine.init();

    }

);
