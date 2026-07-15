/*********************************************************
 SPAE

 Sistema Profesional de Autoría de Evaluaciones

 Archivo:
 js/report-engine.js

 Versión:
 2.0 Professional Edition

*********************************************************/

const ReportEngine = {


    //--------------------------------------------------
    // ESTADO
    //--------------------------------------------------

    reports: [],



    //--------------------------------------------------
    // INICIALIZACIÓN
    //--------------------------------------------------

    init() {

        console.log(
            "Report Engine inicializado."
        );

    },



    //--------------------------------------------------
    // CURSO
    //--------------------------------------------------

    generateCourseReport() {

        const course =
            CourseManager.getCurrentCourse();

        if (!course) {

            return null;

        }


        const report = {

            type: "Course Report",

            generatedAt:
                new Date(),

            summary:

                CourseManager.getCurricularSummary(),

            pedagogicalProfile:

                CourseManager.getPedagogicalProfile(),

            statistics:

                CourseManager.getStatistics()

        };


        this.reports.push(report);

        return report;

    },



    //--------------------------------------------------
    // QUESTION BANK
    //--------------------------------------------------

    generateQuestionBankReport() {

        const report = {

            type: "Question Bank Report",

            generatedAt:
                new Date(),

            totalQuestions:

                QuestionBank.getQuestions().length,

            bloomDistribution:

                QuestionBank.getBloomDistribution(),

            difficultyDistribution:

                QuestionBank.getDifficultyDistribution(),

            statistics:

                QuestionBank.getStatistics()

        };


        this.reports.push(report);

        return report;

    },



    //--------------------------------------------------
    // BLUEPRINT
    //--------------------------------------------------

    generateBlueprintReport() {

        if (!BlueprintEngine.currentBlueprint) {

            return null;

        }


        const report = {

            type: "Blueprint Report",

            generatedAt:
                new Date(),

            summary:

                BlueprintEngine.getSummary(),

            profile:

                BlueprintEngine.getPedagogicalProfile(),

            validations:

                BlueprintEngine.validateBlueprint(),

            statistics:

                BlueprintEngine.calculateStatistics()

        };


        this.reports.push(report);

        return report;

    },



    //--------------------------------------------------
    // EXAMEN
    //--------------------------------------------------

    generateExamReport() {

        if (!ExamEngine.currentExam) {

            return null;

        }


        const report = {

            type: "Exam Report",

            generatedAt:
                new Date(),

            profile:

                ExamEngine.getExamProfile(),

            validations:

                ExamEngine.validateExam(),

            statistics:

                ExamEngine.currentExam.statistics,

            bloomCoverage:

                ExamEngine.calculateBloomCoverage(),

            difficultyCoverage:

                ExamEngine.calculateDifficultyCoverage()

        };


        this.reports.push(report);

        return report;

    },



    //--------------------------------------------------
    // COBERTURA CURRICULAR
    //--------------------------------------------------

    generateCurricularCoverageReport() {

        const report = {

            type: "Curricular Coverage",

            generatedAt:
                new Date(),

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


        this.reports.push(report);

        return report;

    },



    //--------------------------------------------------
    // REPORTE BLOOM
    //--------------------------------------------------

    generateBloomReport() {

        const report = {

            type: "Bloom Report",

            generatedAt:
                new Date(),

            courseBloom:

                CourseManager
                .getBloomCoverage(),

            questionBankBloom:

                QuestionBank
                .getBloomDistribution(),

            blueprintBloom:

                BlueprintEngine
                .currentBlueprint
                ?.bloomDistribution ||

                {},

            examBloom:

                ExamEngine
                .currentExam
                ?.bloomCoverage ||

                {}

        };


        this.reports.push(report);

        return report;

    },



    //--------------------------------------------------
    // REPORTE DE DIFICULTAD
    //--------------------------------------------------

    generateDifficultyReport() {

        const report = {

            type: "Difficulty Report",

            generatedAt:
                new Date(),

            blueprint:

                BlueprintEngine
                .currentBlueprint
                ?.difficultyDistribution ||

                {},

            questionBank:

                QuestionBank
                .getDifficultyDistribution(),

            exam:

                ExamEngine
                .currentExam
                ?.difficultyCoverage ||

                {}

        };


        this.reports.push(report);

        return report;

    },



    //--------------------------------------------------
    // REPORTE DE CALIDAD
    //--------------------------------------------------

    generateQualityReport() {

        const report = {

            type: "Quality Report",

            generatedAt:
                new Date(),

            totalQuestions:

                QuestionBank.getQuestions().length,

            examQuality:

                ExamEngine
                .currentExam
                ?.qualityScore ||

                0

        };


        this.reports.push(report);

        return report;

    },



    //--------------------------------------------------
    // CHECKLIST PEDAGÓGICO
    //--------------------------------------------------

    generatePedagogicalChecklist() {

        const checklist = {

            learningOutcomes:

                CourseManager
                .getLearningOutcomes()
                .length > 0,

            competencies:

                CourseManager
                .getCompetencies()
                .length > 0,

            blueprint:

                BlueprintEngine
                .currentBlueprint !== null,

            questionBank:

                QuestionBank
                .getQuestions()
                .length > 0,

            exam:

                ExamEngine
                .currentExam !== null

        };


        const report = {

            type:

                "Pedagogical Checklist",

            generatedAt:
                new Date(),

            checklist

        };


        this.reports.push(report);

        return report;

    },



    //--------------------------------------------------
    // REPORTE INSTITUCIONAL
    //--------------------------------------------------

    generateInstitutionalReport() {

        const report = {

            type:

                "Institutional Report",

            generatedAt:
                new Date(),

            curricularCoverage:

                this.generateCurricularCoverageReport(),

            quality:

                this.generateQualityReport(),

            pedagogicalChecklist:

                this.generatePedagogicalChecklist()

        };


        this.reports.push(report);

        return report;

    },



    //--------------------------------------------------
    // EXPORTACIÓN
    //--------------------------------------------------

    exportReport(report) {

        Exporter.exportCustom(

            report.type,

            report

        );

    },



    //--------------------------------------------------
    // EXPORTAR TODOS
    //--------------------------------------------------

    exportAllReports() {

        this.reports.forEach(

            report => {

                this.exportReport(
                    report
                );

            }

        );

    },



    //--------------------------------------------------
    // LISTAR
    //--------------------------------------------------

    getReports() {

        return this.reports;

    },



    //--------------------------------------------------
    // LIMPIAR
    //--------------------------------------------------

    clearReports() {

        this.reports = [];

    },



    //--------------------------------------------------
    // RESUMEN
    //--------------------------------------------------

    getSummary() {

        return {

            totalReports:

                this.reports.length

        };

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

window.ReportEngine = ReportEngine;



/*********************************************************
INICIALIZACIÓN AUTOMÁTICA
*********************************************************/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        ReportEngine.init();

    }

);
