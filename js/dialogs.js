/*********************************************************
 SPAE
 Sistema Profesional de Autoría de Evaluaciones

 Archivo : js/dialogs.js
 Versión : 1.0

 Administrador centralizado de diálogos y modales.

*********************************************************/


const Dialogs = {


    //--------------------------------------------------
    // CONFIGURACIÓN
    //--------------------------------------------------

    overlayID: "spae-dialog-overlay",

    dialogID: "spae-dialog",



    //--------------------------------------------------
    // INICIALIZACIÓN
    //--------------------------------------------------

    init() {

        this.createDialogContainer();

        console.log(
            "Dialogs inicializado."
        );

    },



    //--------------------------------------------------
    // CREAR CONTENEDOR
    //--------------------------------------------------

    createDialogContainer() {

        if (document.getElementById(this.overlayID)) {

            return;

        }

        const overlay = document.createElement("div");

        overlay.id = this.overlayID;

        overlay.className =
            "spae-overlay hidden";


        overlay.innerHTML = `

            <div id="${this.dialogID}"
                 class="spae-dialog">

            </div>

        `;

        document.body.appendChild(
            overlay
        );

    },



    //--------------------------------------------------
    // ABRIR DIÁLOGO
    //--------------------------------------------------

    open(config = {}) {

        const {

            title = "SPAE",
            subtitle = "",
            body = "",
            footer = "",
            size = "medium",
            closable = true

        } = config;


        const overlay = document.getElementById(
            this.overlayID
        );

        const dialog = document.getElementById(
            this.dialogID
        );


        dialog.className =
            `spae-dialog dialog-${size}`;


        dialog.innerHTML = `

            <div class="dialog-header">

                <div>

                    <h2>${title}</h2>

                    <p>${subtitle}</p>

                </div>

                ${
                    closable
                    ? `<button id="dialog-close">
                        ×
                       </button>`
                    : ""
                }

            </div>

            <div class="dialog-body">

                ${body}

            </div>

            <div class="dialog-footer">

                ${footer}

            </div>

        `;


        overlay.classList.remove(
            "hidden"
        );


        if (closable) {

            this.bindCloseButton();

        }

        this.bindOutsideClick();

    },



    //--------------------------------------------------
    // CERRAR
    //--------------------------------------------------

    close() {

        const overlay = document.getElementById(
            this.overlayID
        );

        overlay.classList.add(
            "hidden"
        );

    },



    //--------------------------------------------------
    // BOTÓN CERRAR
    //--------------------------------------------------

    bindCloseButton() {

        const button = document.getElementById(
            "dialog-close"
        );

        if (!button) {

            return;

        }

        button.addEventListener(

            "click",

            () => {

                this.close();

            }

        );

    },



    //--------------------------------------------------
    // CERRAR AL HACER CLICK FUERA
    //--------------------------------------------------

    bindOutsideClick() {

        const overlay = document.getElementById(
            this.overlayID
        );

        overlay.onclick = (event) => {

            if (

                event.target === overlay

            ) {

                this.close();

            }

        };

    },



    //--------------------------------------------------
    // ALERTA
    //--------------------------------------------------

    alert(

        title,
        message

    ) {

        this.open({

            title,

            body: `

                <p>

                    ${message}

                </p>

            `,

            footer: `

                <button
                class="btn btn-primary"
                id="dialog-ok">

                    Aceptar

                </button>

            `

        });


        setTimeout(() => {

            const button =
                document.getElementById(
                    "dialog-ok"
                );

            if (button) {

                button.onclick = () => {

                    this.close();

                };

            }

        }, 50);

    },



    //--------------------------------------------------
    // CONFIRMACIÓN
    //--------------------------------------------------

    confirm(

        title,
        message,
        callback

    ) {

        this.open({

            title,

            body: `

                <p>

                    ${message}

                </p>

            `,

            footer: `

                <button
                class="btn btn-secondary"
                id="dialog-cancel">

                    Cancelar

                </button>

                <button
                class="btn btn-primary"
                id="dialog-confirm">

                    Confirmar

                </button>

            `

        });


        setTimeout(() => {

            const confirmButton =
                document.getElementById(
                    "dialog-confirm"
                );

            const cancelButton =
                document.getElementById(
                    "dialog-cancel"
                );


            if (confirmButton) {

                confirmButton.onclick = () => {

                    this.close();

                    if (callback) {

                        callback();

                    }

                };

            }


            if (cancelButton) {

                cancelButton.onclick = () => {

                    this.close();

                };

            }

        }, 50);

    },



    //--------------------------------------------------
    // WIZARD DE CURSOS
    //--------------------------------------------------

    openCourseWizard() {

        this.open({

            title:
            "Crear nuevo curso",

            subtitle:
            "Configuración inicial.",

            size:
            "large",

            body:

            `

            <div class="form-group">

                <label>

                    Nombre del curso

                </label>

                <input
                    id="course-name"
                    class="form-control"
                    type="text">

            </div>


            <div class="form-group">

                <label>

                    Código

                </label>

                <input
                    id="course-code"
                    class="form-control"
                    type="text">

            </div>


            <div class="form-group">

                <label>

                    Nivel

                </label>

                <select
                    id="course-level"
                    class="form-control">

                    <option>

                        Pregrado

                    </option>

                    <option>

                        Posgrado

                    </option>

                    <option>

                        Ejecutivo

                    </option>

                </select>

            </div>

            `,


            footer:

            `

            <button
            class="btn btn-secondary"
            id="course-cancel">

                Cancelar

            </button>

            <button
            class="btn btn-primary"
            id="course-save">

                Guardar

            </button>

            `

        });


        this.bindCourseWizard();

    },



    //--------------------------------------------------
    // GUARDAR CURSO
    //--------------------------------------------------

    bindCourseWizard() {

        setTimeout(() => {

            const saveButton =
                document.getElementById(
                    "course-save"
                );

            const cancelButton =
                document.getElementById(
                    "course-cancel"
                );


            if (cancelButton) {

                cancelButton.onclick =
                () => this.close();

            }


            if (saveButton) {

                saveButton.onclick =
                () => {

                    const name =
                    document.getElementById(
                        "course-name"
                    ).value;

                    const code =
                    document.getElementById(
                        "course-code"
                    ).value;

                    const level =
                    document.getElementById(
                        "course-level"
                    ).value;


                    const course = {

                        name,
                        code,
                        level

                    };


                    console.log(
                        course
                    );


                    if (
                        window.Notifications
                    ) {

                        Notifications.success(

                            "Curso creado correctamente."

                        );

                    }

                    this.close();

                };

            }

        }, 50);

    },



    //--------------------------------------------------
    // MOSTRAR HTML PERSONALIZADO
    //--------------------------------------------------

    custom(config) {

        this.open(config);

    },



    //--------------------------------------------------
    // UTILIDADES
    //--------------------------------------------------

    isOpen() {

        const overlay =
            document.getElementById(
                this.overlayID
            );

        return !overlay.classList.contains(
            "hidden"
        );

    },



    //--------------------------------------------------
    // DEBUG
    //--------------------------------------------------

    debug() {

        console.log(

            "Dialog abierto:",
            this.isOpen()

        );

    }


};




/*********************************************************
EXPORTACIÓN GLOBAL
*********************************************************/

window.Dialogs = Dialogs;



/*********************************************************
INICIALIZACIÓN AUTOMÁTICA
*********************************************************/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        Dialogs.init();

    }

);
