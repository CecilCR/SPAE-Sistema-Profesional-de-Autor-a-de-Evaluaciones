/*********************************************************
 SPAE

 Sistema Profesional de Autoría de Evaluaciones

 Archivo:
 js/workspace-manager.js

 VERSIÓN MVP 2.0

*********************************************************/


const WorkspaceManager = {


    workspaceId: "workspace",


    init() {

        console.log(
            "WorkspaceManager MVP inicializado."
        );

    },


    getWorkspace() {

        return document.getElementById(
            this.workspaceId
        );

    },


    clear() {

        const workspace = this.getWorkspace();

        if (workspace) {

            workspace.innerHTML = "";

        }

    },


    render(htmlContent) {

        const workspace = this.getWorkspace();

        if (!workspace) {

            console.error(
                "Workspace no encontrado."
            );

            return;

        }

        workspace.innerHTML = htmlContent;

    },


    append(htmlContent) {

        const workspace = this.getWorkspace();

        if (!workspace) {

            return;

        }

        workspace.innerHTML += htmlContent;

    },


    showMessage(message) {

        this.render(

            `
            <div class="empty-state">

                <h2>${message}</h2>

            </div>
            `

        );

    },


    showError(message) {

        this.render(

            `
            <div class="empty-state">

                <h2>Error</h2>

                <p>${message}</p>

            </div>
            `

        );

    },


    showLoading() {

        this.render(

            `
            <div class="empty-state">

                <h2>Cargando módulo...</h2>

            </div>
            `

        );

    },


    updateProjectStatus(status) {

        const element = document.getElementById(

            "active-project-status"

        );

        if (element) {

            element.textContent = status;

        }

    },


    updateCourseName(courseName) {

        const sidebar = document.getElementById(

            "active-course-name"

        );

        const summary = document.getElementById(

            "summary-course"

        );


        if (sidebar) {

            sidebar.textContent = courseName;

        }


        if (summary) {

            summary.textContent = courseName;

        }

    },


    updateQuestionCounter(total) {

        const element = document.getElementById(

            "summary-questions"

        );

        if (element) {

            element.textContent = total;

        }

    },


    updateBlueprintStatus(status) {

        const element = document.getElementById(

            "summary-blueprint"

        );

        if (element) {

            element.textContent = status;

        }

    },


    updateExamStatus(status) {

        const element = document.getElementById(

            "summary-exam"

        );

        if (element) {

            element.textContent = status;

        }

    },


    debug() {

        console.log(

            "Workspace disponible:",
            this.getWorkspace()

        );

    }


};



window.WorkspaceManager = WorkspaceManager;
