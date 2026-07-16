/*********************************************************
 SPAE

 Sistema Profesional de Autoría de Evaluaciones

 Archivo:
 js/project-manager.js

 Gestiona los proyectos académicos del sistema.

*********************************************************/


const ProjectManager = {


    /*****************************************************
     CONFIGURACIÓN
    *****************************************************/

    PROJECTS_KEY: "SPAE_PROJECTS",

    ACTIVE_PROJECT_KEY: "SPAE_ACTIVE_PROJECT",



    /*****************************************************
     INICIALIZACIÓN
    *****************************************************/

    init() {

        if (!this.exists()) {

            this.saveProjects([]);

        }

        console.log(
            "Project Manager inicializado."
        );

    },



    /*****************************************************
     EXISTENCIA DE PROYECTOS
    *****************************************************/

    exists() {

        return (

            localStorage.getItem(
                this.PROJECTS_KEY
            ) !== null

        );

    },



    /*****************************************************
     GUARDAR PROYECTOS
    *****************************************************/

    saveProjects(projects) {

        localStorage.setItem(

            this.PROJECTS_KEY,

            JSON.stringify(projects)

        );

    },



    /*****************************************************
     OBTENER PROYECTOS
    *****************************************************/

    getProjects() {

        const projects =

            localStorage.getItem(
                this.PROJECTS_KEY
            );


        if (!projects) {

            return [];

        }


        return JSON.parse(projects);

    },



    /*****************************************************
     CREAR PROYECTO
    *****************************************************/

    createProject(name) {

        const projects =
            this.getProjects();


        const project = {

            id:

                Date.now(),


            name:

                name,


            createdAt:

                new Date().toLocaleString(),


            updatedAt:

                new Date().toLocaleString(),


            status:

                "Activo"

        };


        projects.push(project);

        this.saveProjects(projects);

        this.setActiveProject(
            project.id
        );


        return project;

    },



    /*****************************************************
     ELIMINAR PROYECTO
    *****************************************************/

    deleteProject(id) {

        const projects =

            this.getProjects().filter(

                project =>

                    project.id !== id

            );


        this.saveProjects(
            projects
        );

    },



    /*****************************************************
     DUPLICAR PROYECTO
    *****************************************************/

    duplicateProject(id) {

        const project =
            this.getProjectById(id);


        if (!project) {

            return null;

        }


        const copy = {

            ...project,

            id: Date.now(),

            name:

                `${project.name} (Copia)`,

            createdAt:

                new Date().toLocaleString()

        };


        const projects =
            this.getProjects();

        projects.push(copy);

        this.saveProjects(projects);


        return copy;

    },



    /*****************************************************
     RENOMBRAR PROYECTO
    *****************************************************/

    renameProject(id, newName) {

        const projects =
            this.getProjects();


        projects.forEach(

            project => {

                if (

                    project.id === id

                ) {

                    project.name =
                        newName;

                    project.updatedAt =
                        new Date()
                        .toLocaleString();

                }

            }

        );


        this.saveProjects(
            projects
        );

    },



    /*****************************************************
     ARCHIVAR PROYECTO
    *****************************************************/

    archiveProject(id) {

        const projects =
            this.getProjects();


        projects.forEach(

            project => {

                if (

                    project.id === id

                ) {

                    project.status =
                        "Archivado";

                }

            }

        );


        this.saveProjects(
            projects
        );

    },



    /*****************************************************
     PROYECTO ACTIVO
    *****************************************************/

    setActiveProject(id) {

        localStorage.setItem(

            this.ACTIVE_PROJECT_KEY,

            id

        );

    },



    /*****************************************************
     OBTENER ID ACTIVO
    *****************************************************/

    getActiveProjectId() {

        return localStorage.getItem(
            this.ACTIVE_PROJECT_KEY
        );

    },



    /*****************************************************
     OBTENER PROYECTO ACTIVO
    *****************************************************/

    getActiveProject() {

        const id =
            Number(
                this.getActiveProjectId()
            );

        return this.getProjectById(id);

    },



    /*****************************************************
     BUSCAR PROYECTO
    *****************************************************/

    getProjectById(id) {

        return this.getProjects().find(

            project =>

                project.id === id

        );

    },



    /*****************************************************
     LISTAR PROYECTOS
    *****************************************************/

    listProjects() {

        return this.getProjects();

    },



    /*****************************************************
     EXPORTAR PROYECTO ACTIVO
    *****************************************************/

    exportProject() {

        if (

            !window.PersistenceManager

        ) {

            return null;

        }


        return PersistenceManager
            .exportProject();

    },



    /*****************************************************
     IMPORTAR PROYECTO
    *****************************************************/

    importProject(json) {

        if (

            !window.PersistenceManager

        ) {

            return false;

        }


        return PersistenceManager
            .importProject(json);

    },



    /*****************************************************
     PROGRESO DEL PROYECTO
    *****************************************************/

    getProjectProgress() {

        if (

            !window.WorkflowManager

        ) {

            return 0;

        }


        return WorkflowManager
            .getProgress();

    },



    /*****************************************************
     ACTUALIZAR DASHBOARD
    *****************************************************/

    updateDashboard() {

        const activeProject =
            this.getActiveProject();


        const element =
            document.getElementById(
                "summary-course"
            );


        if (

            element &&
            activeProject

        ) {

            element.textContent =
                activeProject.name;

        }

    },



    /*****************************************************
     INFORMACIÓN COMPLETA
    *****************************************************/

    getInformation() {

        return {

            totalProjects:

                this.getProjects().length,


            activeProject:

                this.getActiveProject(),


            progress:

                this.getProjectProgress()

        };

    },



    /*****************************************************
     LIMPIAR TODOS LOS PROYECTOS
    *****************************************************/

    clearProjects() {

        localStorage.removeItem(
            this.PROJECTS_KEY
        );

        localStorage.removeItem(
            this.ACTIVE_PROJECT_KEY
        );

    },



    /*****************************************************
     DEBUG
    *****************************************************/

    debug() {

        console.table(
            this.getProjects()
        );

        console.log(
            this.getInformation()
        );

    }

};



/*********************************************************
 EXPORTACIÓN GLOBAL
*********************************************************/

window.ProjectManager =
    ProjectManager;



/*********************************************************
 INICIALIZACIÓN AUTOMÁTICA
*********************************************************/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        ProjectManager.init();

    }

);
