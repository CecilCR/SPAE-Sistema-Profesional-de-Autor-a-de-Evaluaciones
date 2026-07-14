/*==========================================================
 SPAE
 Sistema Profesional de Autoría de Evaluaciones

 js/case-generator.js
 Release 1.0

 Motor de generación de casos profesionales
==========================================================*/

const SPAECaseGenerator = (() => {

"use strict";

/*==========================================================
 CONFIGURACIÓN
==========================================================*/

const CONFIG = {

    version: "1.0.0",

    minimumContextLength: 120,

    maximumContextLength: 850

};

/*==========================================================
 ESTADO
==========================================================*/

const state = {

    course: null,

    question: null,

    template: null,

    context: "",

    variables: {},

    generatedCase: null

};

/*==========================================================
 PLANTILLAS
==========================================================*/

const templates = {

    decision: {

        id: "decision",

        title: "Toma de decisiones"

    },

    conflict: {

        id: "conflict",

        title: "Conflicto organizacional"

    },

    leadership: {

        id: "leadership",

        title: "Liderazgo"

    },

    change: {

        id: "change",

        title: "Gestión del cambio"

    },

    customer: {

        id: "customer",

        title: "Servicio al cliente"

    },

    operations: {

        id: "operations",

        title: "Operaciones"

    }

};

/*==========================================================
 INICIALIZACIÓN
==========================================================*/

function init(course = null) {

    state.course = course;

    reset();

}

function reset() {

    state.question = null;

    state.template = null;

    state.context = "";

    state.variables = {};

    state.generatedCase = null;

}

/*==========================================================
 CONFIGURACIÓN DEL CASO
==========================================================*/

function setCourse(course) {

    state.course = course;

}

function setQuestion(question) {

    state.question = structuredClone(question);

}

function setTemplate(templateId) {

    state.template =

        templates[templateId] ||

        null;

}

function currentTemplate() {

    return state.template;

}

function availableTemplates() {

    return Object.values(templates);

}

/*==========================================================
 VARIABLES
==========================================================*/

function setVariable(name, value) {

    state.variables[name] = value;

}

function getVariable(name) {

    return state.variables[name];

}

function variables() {

    return structuredClone(

        state.variables

    );

}

/*==========================================================
 CONTEXTO
==========================================================*/

function setContext(text) {

    state.context = text.trim();

}

function currentContext() {

    return state.context;

}

/*==========================================================
 GENERACIÓN BASE
==========================================================*/

function generateBaseContext() {

    const role =

        state.variables.role ||

        "coordinador";

    const organization =

        state.variables.organization ||

        "organización";

    const area =

        state.variables.area ||

        "operaciones";

    return `Usted se desempeña como ${role} en una ${organization}. Durante las últimas semanas el área de ${area} ha presentado situaciones que requieren análisis, priorización y toma de decisiones por parte del equipo responsable. La dirección solicita evaluar la situación antes de implementar acciones concretas.`;

}
/*==========================================================
 GENERADORES ESPECIALIZADOS
==========================================================*/

function generateDecisionCase() {

    const context = generateBaseContext();

    const department =

        getVariable("department") ||

        "Gestión";

    const problem =

        getVariable("problem") ||

        "una disminución en los indicadores de desempeño";

    return `${context}

El departamento de ${department} enfrenta actualmente ${problem}. Existen diversas alternativas de acción, pero cada una implica beneficios, riesgos y restricciones. La dirección solicita elaborar una recomendación sustentada antes de tomar una decisión definitiva.`;

}

function generateLeadershipCase() {

    const context = generateBaseContext();

    const team =

        getVariable("team") ||

        "equipo multidisciplinario";

    return `${context}

El ${team} presenta diferencias respecto a las prioridades del proyecto, generando retrasos en la coordinación de actividades. El responsable del área debe intervenir para fortalecer la colaboración, mejorar la comunicación y orientar al equipo hacia el cumplimiento de los objetivos institucionales.`;

}

function generateConflictCase() {

    const context = generateBaseContext();

    const actors =

        getVariable("actors") ||

        "dos áreas funcionales";

    return `${context}

Entre ${actors} se ha originado un conflicto relacionado con la asignación de responsabilidades y el uso de recursos compartidos. La situación comienza a afectar el clima laboral y la productividad, por lo que la gerencia solicita identificar la alternativa de intervención más adecuada.`;

}

function generateChangeCase() {

    const context = generateBaseContext();

    const change =

        getVariable("change") ||

        "la implementación de un nuevo sistema";

    return `${context}

La organización iniciará ${change}. Aunque la dirección considera que el proyecto aportará beneficios importantes, parte del personal manifiesta incertidumbre y resistencia frente al proceso. Será necesario seleccionar acciones que favorezcan una implementación exitosa.`;

}

function generateCustomerCase() {

    const context = generateBaseContext();

    const customer =

        getVariable("customer") ||

        "clientes estratégicos";

    return `${context}

Durante el último trimestre se registró un incremento significativo de reclamos provenientes de ${customer}. La organización requiere identificar la alternativa que permita recuperar la satisfacción del cliente sin afectar la sostenibilidad de la operación.`;

}

function generateOperationsCase() {

    const context = generateBaseContext();

    const process =

        getVariable("process") ||

        "proceso operativo";

    return `${context}

Los indicadores asociados al ${process} muestran desviaciones respecto de las metas establecidas. La dirección solicita analizar la información disponible para seleccionar la decisión que contribuya a optimizar la eficiencia del proceso y reducir los riesgos operacionales.`;

}

/*==========================================================
 MOTOR PRINCIPAL
==========================================================*/

function generate() {

    if (!state.template) {

        return null;

    }

    switch (state.template.id) {

        case "decision":

            state.generatedCase =

                generateDecisionCase();

            break;

        case "leadership":

            state.generatedCase =

                generateLeadershipCase();

            break;

        case "conflict":

            state.generatedCase =

                generateConflictCase();

            break;

        case "change":

            state.generatedCase =

                generateChangeCase();

            break;

        case "customer":

            state.generatedCase =

                generateCustomerCase();

            break;

        case "operations":

            state.generatedCase =

                generateOperationsCase();

            break;

        default:

            state.generatedCase =

                generateBaseContext();

    }

    return state.generatedCase;

}

/*==========================================================
 VALIDACIÓN
==========================================================*/

function validateCase(text = state.generatedCase) {

    const errors = [];

    if (!text) {

        errors.push(

            "No existe un caso generado."

        );

    }

    if (

        text.length <

        CONFIG.minimumContextLength

    ) {

        errors.push(

            "El caso es demasiado breve."

        );

    }

    if (

        text.length >

        CONFIG.maximumContextLength

    ) {

        errors.push(

            "El caso supera la longitud recomendada."

        );

    }

    return {

        valid: errors.length === 0,

        errors

    };

} 
/*==========================================================
 ADAPTACIÓN AL CURSO
==========================================================*/

function adaptToCourse() {

    if (!state.course || !state.generatedCase) {

        return state.generatedCase;

    }

    const courseName = state.course.name || "";
    const program = state.course.program || "";

    let intro = "";

    if (program) {

        intro += `Contexto del programa: ${program}. `;

    }

    if (courseName) {

        intro += `Curso: ${courseName}. `;

    }

    state.generatedCase =

        `${intro}${state.generatedCase}`;

    return state.generatedCase;

}

/*==========================================================
 PERSONALIZACIÓN
==========================================================*/

function personalize(options = {}) {

    if (!state.generatedCase) {

        return null;

    }

    let text = state.generatedCase;

    Object.entries(options).forEach(([key, value]) => {

        const pattern =

            new RegExp(`\\{${key}\\}`, "g");

        text = text.replace(pattern, value);

    });

    state.generatedCase = text;

    return state.generatedCase;

}

/*==========================================================
 EXPORTACIÓN
==========================================================*/

function exportCase() {

    return {

        template:

            state.template,

        variables:

            structuredClone(state.variables),

        context:

            state.generatedCase,

        generatedAt:

            new Date().toISOString()

    };

}

function exportJSON() {

    return JSON.stringify(

        exportCase(),

        null,

        2

    );

}

/*==========================================================
 RESUMEN
==========================================================*/

function summary() {

    return {

        template:

            state.template?.title || "",

        length:

            state.generatedCase

                ? state.generatedCase.length

                : 0,

        words:

            state.generatedCase

                ? state.generatedCase

                    .split(/\s+/)

                    .filter(Boolean)

                    .length

                : 0

    };

}

/*==========================================================
 API PÚBLICA
==========================================================*/

return {

    init,

    reset,

    setCourse,

    setQuestion,

    setTemplate,

    currentTemplate,

    availableTemplates,

    setVariable,

    getVariable,

    variables,

    setContext,

    currentContext,

    generate,

    generateBaseContext,

    generateDecisionCase,

    generateLeadershipCase,

    generateConflictCase,

    generateChangeCase,

    generateCustomerCase,

    generateOperationsCase,

    adaptToCourse,

    personalize,

    validateCase,

    exportCase,

    exportJSON,

    summary

};

})();

/*==========================================================
 INICIALIZACIÓN
==========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        SPAECaseGenerator.init();

    }

);  
