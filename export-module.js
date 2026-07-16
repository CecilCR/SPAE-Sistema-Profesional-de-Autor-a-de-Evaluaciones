/*********************************************************
 SPAE

 Sistema Profesional de Autoría de Evaluaciones

 Archivo:
 js/export-module.js

 Módulo oficial de exportación del sistema.

*********************************************************/

const ExportModule = {

    finalExam: null,



    /*****************************************************
     RENDER
    *****************************************************/

    render() {

        this.finalExam = this.load();

        const workspace =
            document.getElementById("workspace");

        if (!workspace) return;


        workspace.innerHTML = `

        <div class="spae-module">

            <h2>
                Exportar examen
            </h2>

            <p>
                Seleccione el formato de salida.
            </p>

            <hr>


            <button
                onclick="ExportModule.exportHTML()">

                Exportar HTML

            </button>

            <br><br>


            <button
                onclick="ExportModule.exportTXT()">

                Exportar TXT

            </button>

            <br><br>


            <button
                onclick="ExportModule.printExam()">

                Imprimir examen

            </button>


            <hr>


            <h3>
                Próximamente
            </h3>

            <ul>

                <li>PDF</li>
                <li>DOCX</li>
                <li>Moodle</li>
                <li>Canvas</li>
                <li>Blackboard</li>

            </ul>


            <hr>

            <p>

                El instrumento de evaluación
                ha sido generado correctamente.

            </p>

        </div>

        `;

    },



    /*****************************************************
     EXPORTAR HTML
    *****************************************************/

    exportHTML() {

        const html =
            this.generateHTML();

        this.downloadFile(

            html,
            "examen.html",
            "text/html"

        );

    },



    /*****************************************************
     EXPORTAR TXT
    *****************************************************/

    exportTXT() {

        const text =
            this.generateTXT();

        this.downloadFile(

            text,
            "examen.txt",
            "text/plain"

        );

    },



    /*****************************************************
     GENERAR HTML
    *****************************************************/

    generateHTML() {

        if (!this.finalExam) {

            return "";

        }


        let html = `

        <html>

        <head>

        <title>

        ${this.finalExam.metadata.title}

        </title>

        </head>

        <body>

        <h1>

        ${this.finalExam.metadata.title}

        </h1>

        `;


        html += `

        <h2>
        Información general
        </h2>

        <p>
        Curso:
        ${this.finalExam.metadata.courseName}
        </p>

        <p>
        Duración:
        ${this.finalExam.metadata.duration}
        minutos
        </p>

        `;


        html += "<hr>";



        html += `
        <h2>Instrucciones</h2>
        <ul>
        `;


        this.finalExam.instructions.forEach(

            instruction => {

                html += `

                <li>
                ${instruction}
                </li>

                `;

            }

        );


        html += "</ul>";



        html += `
        <hr>
        <h2>Preguntas</h2>
        `;



        this.finalExam.questions.forEach(

            question => {

                html += `

                <h3>

                Pregunta
                ${question.number}

                </h3>

                <p>

                Tipo:
                ${question.type}

                </p>

                `;


                Object.entries(

                    question.data

                ).forEach(

                    ([key, value]) => {

                        html += `

                        <p>

                        <strong>
                        ${key}
                        </strong>

                        :

                        ${value}

                        </p>

                        `;

                    }

                );

            }

        );


        html += `

        <hr>

        <p>

        Puntaje máximo:

        ${this.finalExam.grading.maximumScore}

        </p>

        <p>

        Puntaje mínimo:

        ${this.finalExam.grading.passingScore}

        </p>

        <hr>

        <p>

        ${this.finalExam.footer.message}

        </p>


        </body>

        </html>

        `;


        return html;

    },



    /*****************************************************
     GENERAR TXT
    *****************************************************/

    generateTXT() {

        if (!this.finalExam) {

            return "";

        }


        let text = "";


        text +=
            this.finalExam.metadata.title + "\n\n";


        text +=
            "Curso: " +
            this.finalExam.metadata.courseName +
            "\n";


        text +=
            "Duración: " +
            this.finalExam.metadata.duration +
            " minutos\n\n";


        text +=
            "INSTRUCCIONES\n";


        this.finalExam.instructions.forEach(

            instruction => {

                text +=
                    "- " +
                    instruction +
                    "\n";

            }

        );


        text +=
            "\nPREGUNTAS\n\n";


        this.finalExam.questions.forEach(

            question => {

                text +=
                    "Pregunta "
                    + question.number
                    + "\n";


                text +=
                    "Tipo: "
                    + question.type
                    + "\n";


                Object.entries(
                    question.data
                ).forEach(

                    ([key, value]) => {

                        text +=
                            key
                            + ": "
                            + value
                            + "\n";

                    }

                );


                text += "\n";

            }

        );


        text +=
            "\nPuntaje máximo: "
            + this.finalExam.grading.maximumScore;

        text +=
            "\nPuntaje mínimo: "
            + this.finalExam.grading.passingScore;


        return text;

    },



    /*****************************************************
     IMPRIMIR
    *****************************************************/

    printExam() {

        const html =
            this.generateHTML();

        const windowPrint =
            window.open("");

        windowPrint.document.write(
            html
        );

        windowPrint.print();

    },



    /*****************************************************
     DESCARGAR ARCHIVO
    *****************************************************/

    downloadFile(

        content,
        filename,
        type

    ) {

        const blob =
            new Blob(

                [content],

                { type }

            );


        const link =
            document.createElement(
                "a"
            );


        link.href =
            URL.createObjectURL(
                blob
            );

        link.download =
            filename;

        link.click();

    },



    /*****************************************************
     GUARDAR
    *****************************************************/

    save() {

        return true;

    },



    /*****************************************************
     CARGAR EXAMEN FINAL
    *****************************************************/

    load() {

        if (!window.PersistenceManager) {

            return null;

        }

        const project =
            PersistenceManager.loadProject();

        return project.finalExam;

    },



    /*****************************************************
     DATOS
    *****************************************************/

    getData() {

        return this.finalExam;

    },



    /*****************************************************
     DEBUG
    *****************************************************/

    debug() {

        console.log(
            this.finalExam
        );

    }

};



/*********************************************************
 EXPORTACIÓN GLOBAL
*********************************************************/

window.ExportModule =
    ExportModule;
