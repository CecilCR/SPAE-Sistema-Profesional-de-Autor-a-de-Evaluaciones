/*********************************************************
 SPAE
 Sistema Profesional de Autoría de Evaluaciones

 Archivo : js/course-manager.js
 Versión : 1.0

 Administrador pedagógico de cursos.

*********************************************************/


const CourseManager = {


    //--------------------------------------------------
    // ESTADO ACTUAL
    //--------------------------------------------------

    currentCourse: null,



    //--------------------------------------------------
    // INICIALIZACIÓN
    //--------------------------------------------------

    init() {

        console.log(
            "CourseManager inicializado."
        );

    },



    //--------------------------------------------------
    // CREAR CURSO
    //--------------------------------------------------

    createCourse(data) {

        const course = {

            id: Date.now(),

            name:
                data.name || "",

            code:
                data.code || "",

            program:
                data.program || "",

            level:
                data.level || "",

            period:
                data.period || "",

            description:
                data.description || "",

            teacher:
                data.teacher || "",

            units: [],

            learningOutcomes: [],

            competencies: [],

            bloomLevels: [],

            metadata: {

                createdAt:
                    new Date(),

                updatedAt:
                    new Date()

            }

        };


        StorageManager.saveCourse(
            course
        );


        Notifications.success(
            "Curso creado correctamente."
        );


        return course;

    },



    //--------------------------------------------------
    // SELECCIONAR CURSO
    //--------------------------------------------------

    setCurrentCourse(course) {

        this.currentCourse = course;


        if (

            window.SPAE

        ) {

            SPAE.setCurrentCourse(
                course
            );

        }


        DashboardModule.setCourseInformation(
            course
        );

    },



    //--------------------------------------------------
    // OBTENER CURSO ACTUAL
    //--------------------------------------------------

    getCurrentCourse() {

        return this.currentCourse;

    },



    //--------------------------------------------------
    // LISTAR CURSOS
    //--------------------------------------------------

    getCourses() {

        return StorageManager.getCourses();

    },



    //--------------------------------------------------
    // BUSCAR CURSO
    //--------------------------------------------------

    findCourse(id) {

        return this.getCourses().find(

            course => course.id === id

        );

    },



    //--------------------------------------------------
    // ELIMINAR CURSO
    //--------------------------------------------------

    deleteCourse(id) {

        StorageManager.deleteCourse(
            id
        );


        Notifications.warning(
            "Curso eliminado."
        );

    },



    //--------------------------------------------------
    // UNIDADES DE APRENDIZAJE
    //--------------------------------------------------

    addUnit(unit) {

        if (!this.currentCourse) {

            return;

        }

        this.currentCourse.units.push({

            id: Date.now(),

            title:
                unit.title,

            description:
                unit.description

        });

    },



    getUnits() {

        if (!this.currentCourse) {

            return [];

        }

        return this.currentCourse.units;

    },



    //--------------------------------------------------
    // RESULTADOS DE APRENDIZAJE
    //--------------------------------------------------

    addLearningOutcome(outcome) {

        if (!this.currentCourse) {

            return;

        }

        this.currentCourse.learningOutcomes.push({

            id: Date.now(),

            description:
                outcome.description,

            bloom:
                outcome.bloom

        });

    },



    getLearningOutcomes() {

        if (!this.currentCourse) {

            return [];

        }

        return this.currentCourse.learningOutcomes;

    },



    //--------------------------------------------------
    // COMPETENCIAS
    //--------------------------------------------------

    addCompetency(competency) {

        if (!this.currentCourse) {

            return;

        }

        this.currentCourse.competencies.push({

            id: Date.now(),

            title:
                competency.title

        });

    },



    getCompetencies() {

        if (!this.currentCourse) {

            return [];

        }

        return this.currentCourse.competencies;

    },



    //--------------------------------------------------
    // BLOOM
    //--------------------------------------------------

    setBloomDistribution(levels) {

        if (!this.currentCourse) {

            return;

        }

        this.currentCourse.bloomLevels =
            levels;

    },



    getBloomDistribution() {

        if (!this.currentCourse) {

            return [];

        }

        return this.currentCourse.bloomLevels;

    },



    //--------------------------------------------------
    // CONFIGURACIÓN PEDAGÓGICA
    //--------------------------------------------------

    getPedagogicalProfile() {

        if (!this.currentCourse) {

            return null;

        }

        return {

            outcomes:
                this.currentCourse.learningOutcomes.length,

            competencies:
                this.currentCourse.competencies.length,

            units:
                this.currentCourse.units.length,

            bloom:
                this.currentCourse.bloomLevels

        };

    },



    //--------------------------------------------------
    // VALIDACIONES
    //--------------------------------------------------

    validateCourse(course) {

        if (!course.name) {

            return false;

        }

        if (!course.code) {

            return false;

        }

        return true;

    },



    //--------------------------------------------------
    // ESTADÍSTICAS
    //--------------------------------------------------

    getStatistics() {

        const courses =
            this.getCourses();


        return {

            totalCourses:

                courses.length,

            totalOutcomes:

                courses.reduce(

                    (sum, course) =>

                    sum +

                    course.learningOutcomes.length,

                    0

                ),

            totalUnits:

                courses.reduce(

                    (sum, course) =>

                    sum +

                    course.units.length,

                    0

                )

        };

    },



    //--------------------------------------------------
    // EXPORTAR PERFIL DEL CURSO
    //--------------------------------------------------

    exportCurrentCourse() {

        if (!this.currentCourse) {

            return;

        }

        Exporter.exportCustom(

            this.currentCourse.name,

            this.currentCourse

        );

    },



    //--------------------------------------------------
    // IMPORTAR CURSO
    //--------------------------------------------------

    importCourse(course) {

        StorageManager.saveCourse(
            course
        );

        Notifications.success(
            "Curso importado."
        );

    },



    //--------------------------------------------------
    // DUPLICAR CURSO
    //--------------------------------------------------

    duplicateCourse(id) {

        const course =
            this.findCourse(id);

        if (!course) {

            return;

        }

        const copy = {

            ...course,

            id: Date.now(),

            name:
                course.name +

                " (Copia)"

        };

        StorageManager.saveCourse(
            copy
        );

        Notifications.success(
            "Curso duplicado."
        );

    },



    //--------------------------------------------------
    // RESUMEN DEL CURSO
    //--------------------------------------------------

    getSummary() {

        if (!this.currentCourse) {

            return null;

        }

        return {

            name:
                this.currentCourse.name,

            code:
                this.currentCourse.code,

            units:
                this.currentCourse.units.length,

            outcomes:
                this.currentCourse.learningOutcomes.length,

            competencies:
                this.currentCourse.competencies.length

        };

    },



    //--------------------------------------------------
    // LIMPIAR CURSO ACTUAL
    //--------------------------------------------------

    clearCurrentCourse() {

        this.currentCourse = null;

    },



    //--------------------------------------------------
    // DEBUG
    //--------------------------------------------------

    debug() {

        console.log(
            this.currentCourse
        );

    }


};



/*********************************************************
EXPORTACIÓN GLOBAL
*********************************************************/

window.CourseManager = CourseManager;



/*********************************************************
INICIALIZACIÓN AUTOMÁTICA
*********************************************************/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        CourseManager.init();

    }

);
