/*********************************************************
 SPAE

 Sistema Profesional de Autoría de Evaluaciones

 Archivo:
 js/report-center.js

 Centro de reportes y analítica pedagógica.

*********************************************************/

const ReportCenter = {

    //--------------------------------------------------
    // ESTADO
    //--------------------------------------------------

    reports: [],



    //--------------------------------------------------
    // INICIALIZACIÓN
    //--------------------------------------------------

    init() {

        console.log(
            "Report Center inicializado."
        );

    },



    //--------------------------------------------------
    // CURSO
    //--------------------------------------------------

    generateCourseReport() {

        return {

            course:

                CourseManager.getCurrentCourse(),

            learningOutcomes:

                CourseManager
                .getLearningOutcomes(),

            competencies:

                CourseManager
                .getCompetencies(),

            units:

                CourseManager
                .getUnits()

        };

    },



    //--------------------------------------------------
    // BANCO DE PREGUNTAS
    //--------------------------------------------------

    generateQuestionBankReport() {

        return {

            totalQuestions:

                QuestionBank
                .getQuestions().length,

            statistics:

                QuestionBank
                .getStatistics(),

            bloomCoverage:

                QuestionBank
                .getBloomDistribution(),

            difficulty:

                QuestionBank
                .getDifficultyDistribution()

        };

    },



    //--------------------------------------------------
    // BLUEPRINT
    //--------------------------------------------------

    generateBlueprintReport() {

        return {

            blueprint:

                BlueprintEngine
                .currentBlueprint

        };

    },



    //--------------------------------------------------
    // EXAMEN
    //--------------------------------------------------

    generateExamReport() {

        return {

            exam:

                ExamEngine
                .currentExam,

            duration:

                ExamEngine
                .calculateDuration(),

            validations:

                ExamEngine
                .validateExam()

        };

    },



    //--------------------------------------------------
    // BLOOM
    //--------------------------------------------------

    generateBloomReport() {

        return {

            bloomCoverage:

                Analytics
                .analyzeBloomCoverage()

        };

    },



    //--------------------------------------------------
    // DIFICULTAD
    //--------------------------------------------------

    generateDifficultyReport() {

        return {

            difficultyCoverage:

                Analytics
                .analyzeDifficulty()

        };

    },



    //--------------------------------------------------
    // CALIDAD
    //--------------------------------------------------

    generateQualityReport() {

        return {

            quality:

                Analytics
                .analyzeExamQuality()

        };

    },



    //--------------------------------------------------
    // TIEMPO
    //--------------------------------------------------

    generateTimeReport() {

        return {

            time:

                Analytics
                .analyzeTime()

        };

    },



    //--------------------------------------------------
    // ANALYTICS
    //--------------------------------------------------

    generateAnalyticsReport() {

        return Analytics
            .generateFullAnalytics();

    },



    //--------------------------------------------------
    // DASHBOARD
    //--------------------------------------------------

    generateDashboardReport() {

        return Analytics
            .generateDashboardMetrics();

    },



    //--------------------------------------------------
    // REPORTE INSTITUCIONAL
    //--------------------------------------------------

    generateInstitutionalReport() {

        return {

            curricularCoverage:

                Analytics
                .analyzeCurricularCoverage(),

            bloomCoverage:

                Analytics
                .analyzeBloomCoverage(),

            quality:

                Analytics
                .analyzeExamQuality(),

            statistics:

                Analytics
                .generateDashboardMetrics()

        };

    },



    //--------------------------------------------------
    // REPORTE COMPLETO
    //--------------------------------------------------

    generateCompleteReport() {

        return {

            generatedAt:

                new Date(),

            course:

                this.generateCourseReport(),

            questionBank:

                this.generateQuestionBankReport(),

            blueprint:

                this.generateBlueprintReport(),

            exam:

                this.generateExamReport(),

            bloom:

                this.generateBloomReport(),

            difficulty:

                this.generateDifficultyReport(),

            quality:

                this.generateQualityReport(),

            time:

                this.generateTimeReport(),

            dashboard:

                this.generateDashboardReport(),

            analytics:

                this.generateAnalyticsReport(),

            institutional:

                this.generateInstitutionalReport()

        };

    },



    //--------------------------------------------------
    // GUARDAR REPORTE
    //--------------------------------------------------

    saveReport(report) {

        this.reports.push(report);

    },



    //--------------------------------------------------
    // OBTENER REPORTES
    //--------------------------------------------------

    getReports() {

        return this.reports;

    },



    //--------------------------------------------------
    // EXPORTACIONES
    //--------------------------------------------------

    exportCourseReport() {

        Exporter.exportCustom(

            "Course Report",

            this.generateCourseReport()

        );

    },


    exportQuestionBankReport() {

        Exporter.exportCustom(

            "Question Bank Report",

            this.generateQuestionBankReport()

        );

    },


    exportBlueprintReport() {

        Exporter.exportCustom(

            "Blueprint Report",

            this.generateBlueprintReport()

        );

    },


    exportExamReport() {

        Exporter.exportCustom(

            "Exam Report",

            this.generateExamReport()

        );

    },


    exportInstitutionalReport() {

        Exporter.exportCustom(

            "Institutional Report",

            this.generateInstitutionalReport()

        );

    },


    exportCompleteReport() {

        Exporter.exportCustom(

            "SPAE Complete Report",

            this.generateCompleteReport()

        );

    },



    //--------------------------------------------------
    // LIMPIAR REPORTES
    //--------------------------------------------------

    clearReports() {

        this.reports = [];

    },



    //--------------------------------------------------
    // DEBUG
    //--------------------------------------------------

    debug() {

        console.table(

            this.reports

        );

    }

};



/*********************************************************
 EXPORTACIÓN GLOBAL
*********************************************************/

window.ReportCenter = ReportCenter;



/*********************************************************
 INICIALIZACIÓN AUTOMÁTICA
*********************************************************/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        ReportCenter.init();

    }

);
