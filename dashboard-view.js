/*********************************************************
 SPAE

 Sistema Profesional de Autoría de Evaluaciones

 Archivo:
 js/dashboard-view.js

 Dashboard principal del sistema.

*********************************************************/

const DashboardView = {


    //--------------------------------------------------
    // ESTADO
    //--------------------------------------------------

    dashboardData: {},



    //--------------------------------------------------
    // INICIALIZACIÓN
    //--------------------------------------------------

    init() {

        console.log(
            "Dashboard View inicializado."
        );

        this.refresh();

    },



    //--------------------------------------------------
    // ACTUALIZAR DASHBOARD
    //--------------------------------------------------

    refresh() {

        this.dashboardData = {

            course:
                this.getCoursePanel(),

            questionBank:
                this.getQuestionBankPanel(),

            blueprint:
                this.getBlueprintPanel(),

            exam:
                this.getExamPanel(),

            analytics:
                this.getAnalyticsPanel(),

            alerts:
                this.getAlertsPanel(),

            reports:
                this.getReportsPanel(),

            system:
                this.getSystemPanel()

        };

    },



    //--------------------------------------------------
    // CURSO
    //--------------------------------------------------

    getCoursePanel() {

        return {

            currentCourse:

                CourseManager.getCurrentCourse(),

            competencies:

                CourseManager
                .getCompetencies().length,

            learningOutcomes:

                CourseManager
                .getLearningOutcomes().length,

            units:

                CourseManager
                .getUnits().length

        };

    },



    //--------------------------------------------------
    // BANCO DE PREGUNTAS
    //--------------------------------------------------

    getQuestionBankPanel() {

        return {

            totalQuestions:

                QuestionBank
                .getQuestions().length,

            bloom:

                QuestionBank
                .getBloomDistribution(),

            difficulty:

                QuestionBank
                .getDifficultyDistribution(),

            statistics:

                QuestionBank
                .getStatistics()

        };

    },



    //--------------------------------------------------
    // BLUEPRINT
    //--------------------------------------------------

    getBlueprintPanel() {

        return {

            blueprint:

                BlueprintEngine
                .currentBlueprint

        };

    },



    //--------------------------------------------------
    // EXAMEN
    //--------------------------------------------------

    getExamPanel() {

        return {

            exam:

                ExamEngine
                .currentExam,

            duration:

                ExamEngine
                .calculateDuration()

        };

    },



    //--------------------------------------------------
    // ANALYTICS
    //--------------------------------------------------

    getAnalyticsPanel() {

        return Analytics
            .generateFullAnalytics();

    },



    //--------------------------------------------------
    // ALERTAS
    //--------------------------------------------------

    getAlertsPanel() {

        const alerts = [];


        if (

            QuestionBank
            .getQuestions()
            .length === 0

        ) {

            alerts.push(

                "No existen preguntas registradas."

            );

        }


        if (

            !BlueprintEngine.currentBlueprint

        ) {

            alerts.push(

                "No existe un Blueprint activo."

            );

        }


        if (

            !ExamEngine.currentExam

        ) {

            alerts.push(

                "No existe un examen generado."

            );

        }


        return alerts;

    },



    //--------------------------------------------------
    // REPORTES
    //--------------------------------------------------

    getReportsPanel() {

        return {

            totalReports:

                ReportCenter
                .getReports()
                .length

        };

    },



    //--------------------------------------------------
    // SISTEMA
    //--------------------------------------------------

    getSystemPanel() {

        return Analytics
            .systemHealthCheck();

    },



    //--------------------------------------------------
    // MÉTRICAS RÁPIDAS
    //--------------------------------------------------

    getQuickMetrics() {

        return {

            courses:

                CourseManager
                .getCurrentCourse()
                ? 1 : 0,

            questions:

                QuestionBank
                .getQuestions()
                .length,

            blueprints:

                BlueprintEngine
                .blueprints
                .length,

            exams:

                ExamEngine
                .getExams()
                .length,

            reports:

                ReportCenter
                .getReports()
                .length

        };

    },



    //--------------------------------------------------
    // ESTADO GENERAL
    //--------------------------------------------------

    getSystemStatus() {

        const health =

            Analytics
            .systemHealthCheck();


        const activeModules =

            Object.values(health)
            .filter(Boolean)
            .length;


        return {

            activeModules,

            totalModules:

                Object.keys(health)
                .length

        };

    },



    //--------------------------------------------------
    // RESUMEN DEL DASHBOARD
    //--------------------------------------------------

    getSummary() {

        return this.dashboardData;

    },



    //--------------------------------------------------
    // EXPORTAR DASHBOARD
    //--------------------------------------------------

    exportDashboard() {

        Exporter.exportCustom(

            "SPAE Dashboard",

            this.dashboardData

        );

    },



    //--------------------------------------------------
    // LIMPIAR
    //--------------------------------------------------

    clear() {

        this.dashboardData = {};

    },



    //--------------------------------------------------
    // DEBUG
    //--------------------------------------------------

    debug() {

        console.table(

            this.getQuickMetrics()

        );

    }


};



/*********************************************************
 EXPORTACIÓN GLOBAL
*********************************************************/

window.DashboardView = DashboardView;



/*********************************************************
 INICIALIZACIÓN AUTOMÁTICA
*********************************************************/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        DashboardView.init();

    }

);
