/*********************************************************
 SPAE

 Sistema Profesional de Autoría de Evaluaciones

 Archivo:
 js/analytics.js

 Versión:
 2.0 Professional Edition

*********************************************************/


const Analytics = {


    //--------------------------------------------------
    // ESTADO
    //--------------------------------------------------

    metrics: {},



    //--------------------------------------------------
    // INICIALIZACIÓN
    //--------------------------------------------------

    init() {

        console.log(
            "Analytics Engine inicializado."
        );

    },



    //--------------------------------------------------
    // CURSO
    //--------------------------------------------------

    analyzeCourse() {

        const course =

            CourseManager.getCurrentCourse();

        if (!course) {

            return null;

        }


        return {

            totalUnits:

                course.units.length,

            totalCompetencies:

                course.competencies.length,

            totalLearningOutcomes:

                course.learningOutcomes.length,

            bloomCoverage:

                CourseManager.getBloomCoverage(),

            pedagogicalProfile:

                CourseManager.getPedagogicalProfile()

        };

    },



    //--------------------------------------------------
    // BANCO DE PREGUNTAS
    //--------------------------------------------------

    analyzeQuestionBank() {

        return {

            totalQuestions:

                QuestionBank.getQuestions().length,

            bloomDistribution:

                QuestionBank.getBloomDistribution(),

            difficultyDistribution:

                QuestionBank.getDifficultyDistribution(),

            statistics:

                QuestionBank.getStatistics()

        };

    },



    //--------------------------------------------------
    // BLUEPRINT
    //--------------------------------------------------

    analyzeBlueprint() {

        const blueprint =

            BlueprintEngine.currentBlueprint;


        if (!blueprint) {

            return null;

        }


        return {

            title:

                blueprint.title,

            duration:

                blueprint.duration,

            totalQuestions:

                blueprint.totalQuestions,

            bloomDistribution:

                blueprint.bloomDistribution,

            difficultyDistribution:

                blueprint.difficultyDistribution,

            questionTypes:

                blueprint.questionTypes

        };

    },



    //--------------------------------------------------
    // EXAMEN
    //--------------------------------------------------

    analyzeExam() {

        const exam =

            ExamEngine.currentExam;


        if (!exam) {

            return null;

        }


        return {

            title:

                exam.title,

            totalQuestions:

                exam.questions.length,

            duration:

                ExamEngine.calculateDuration(),

            qualityScore:

                exam.qualityScore,

            bloomCoverage:

                exam.bloomCoverage,

            difficultyCoverage:

                exam.difficultyCoverage

        };

    },



    //--------------------------------------------------
    // COBERTURA BLOOM
    //--------------------------------------------------

    analyzeBloomCoverage() {

        return {

            course:

                CourseManager.getBloomCoverage(),

            questionBank:

                QuestionBank.getBloomDistribution(),

            blueprint:

                BlueprintEngine
                .currentBlueprint
                ?.bloomDistribution || {},

            exam:

                ExamEngine
                .currentExam
                ?.bloomCoverage || {}

        };

    },



    //--------------------------------------------------
    // COBERTURA CURRICULAR
    //--------------------------------------------------

    analyzeCurricularCoverage() {

        return {

            units:

                CourseManager
                .getUnits().length,

            competencies:

                CourseManager
                .getCompetencies().length,

            learningOutcomes:

                CourseManager
                .getLearningOutcomes().length

        };

    },



    //--------------------------------------------------
    // CALIDAD DEL EXAMEN
    //--------------------------------------------------

    analyzeExamQuality() {

        const exam =

            ExamEngine.currentExam;

        if (!exam) {

            return null;

        }


        return {

            qualityScore:

                exam.qualityScore,

            validations:

                exam.validations

        };

    },



    //--------------------------------------------------
    // DIFICULTAD
    //--------------------------------------------------

    analyzeDifficulty() {

        return {

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

    },



    //--------------------------------------------------
    // TIEMPO DEL EXAMEN
    //--------------------------------------------------

    analyzeTime() {

        const exam =

            ExamEngine.currentExam;


        if (!exam) {

            return null;

        }


        return {

            expected:

                exam.duration,

            calculated:

                ExamEngine
                .calculateDuration(),

            valid:

                ExamEngine
                .validateTime()

        };

    },



    //--------------------------------------------------
    // INDICADORES INSTITUCIONALES
    //--------------------------------------------------

    generateInstitutionalIndicators() {

        return {

            curricularCoverage:

                this.analyzeCurricularCoverage(),

            bloomCoverage:

                this.analyzeBloomCoverage(),

            examQuality:

                this.analyzeExamQuality(),

            difficulty:

                this.analyzeDifficulty(),

            time:

                this.analyzeTime()

        };

    },



    //--------------------------------------------------
    // DASHBOARD GENERAL
    //--------------------------------------------------

    generateDashboardMetrics() {

        return {

            courses:

                CourseManager
                .getCurrentCourse()
                ? 1 : 0,

            questions:

                QuestionBank
                .getQuestions().length,

            blueprints:

                BlueprintEngine
                .blueprints.length,

            exams:

                ExamEngine
                .getExams().length,

            reports:

                ReportEngine
                .getReports().length

        };

    },



    //--------------------------------------------------
    // HEALTH CHECK
    //--------------------------------------------------

    systemHealthCheck() {

        return {

            courseManager:

                !!window.CourseManager,

            questionBank:

                !!window.QuestionBank,

            blueprintEngine:

                !!window.BlueprintEngine,

            examEngine:

                !!window.ExamEngine,

            reportEngine:

                !!window.ReportEngine,

            analytics:

                !!window.Analytics

        };

    },



    //--------------------------------------------------
    // ANALÍTICA COMPLETA
    //--------------------------------------------------

    generateFullAnalytics() {

        return {

            generatedAt:

                new Date(),

            dashboard:

                this.generateDashboardMetrics(),

            course:

                this.analyzeCourse(),

            questionBank:

                this.analyzeQuestionBank(),

            blueprint:

                this.analyzeBlueprint(),

            exam:

                this.analyzeExam(),

            bloom:

                this.analyzeBloomCoverage(),

            curricular:

                this.analyzeCurricularCoverage(),

            quality:

                this.analyzeExamQuality(),

            difficulty:

                this.analyzeDifficulty(),

            time:

                this.analyzeTime(),

            institutional:

                this.generateInstitutionalIndicators(),

            health:

                this.systemHealthCheck()

        };

    },



    //--------------------------------------------------
    // EXPORTACIÓN
    //--------------------------------------------------

    exportAnalytics() {

        Exporter.exportCustom(

            "SPAE_Analytics",

            this.generateFullAnalytics()

        );

    },



    //--------------------------------------------------
    // DEBUG
    //--------------------------------------------------

    debug() {

        console.table(

            this.generateDashboardMetrics()

        );

    }


};



/*********************************************************
EXPORTACIÓN GLOBAL
*********************************************************/

window.Analytics = Analytics;



/*********************************************************
INICIALIZACIÓN AUTOMÁTICA
*********************************************************/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        Analytics.init();

    }

);
