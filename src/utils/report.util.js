const fs = require('node:fs/promises');
const feedbackByQuestionTemplate = '' +
    'Question: [stem]\n' +
    'Your answer: [selected]\n' +
    'Right answer: [correct]\n' +
    'Hint: [hint]';

const replacementVariables = [
    'studentName',
    'assessmentCount',
    'assessmentTitle',
    'assessmentCompletedDateTime',
    'correctAnswersNumber',
    'questionsNumber',
    'feedbackByQuestion',
    'feedbackByStrand',
    'scoreByAssessment',
    'stem',
    'selected',
    'correct',
    'hint'
];

const arrayToObject = (array) =>
    array.reduce((obj, item) => {
        obj[item.id] = item
        return obj
    }, {});

const transformStudentResponses = (studentResponses, questions) => {
    const correctAnswers = [];
    const incorrectAnswers = [];
    const questionsObject = arrayToObject(questions);
    let feedbackByQuestion = '';

    studentResponses.map(({ questionId, response }) => {
        const { stem, strand, config } = questionsObject[questionId];
        const { key, hint } = config;
        const question = {
            stem,
            strand,
            correct: key,
            hint,
            selected: response
        }

        if (key === response) {
            correctAnswers.push(question);
        } else {
            feedbackByQuestion = feedbackByQuestion + setReportVariables(feedbackByQuestionTemplate, question);
            incorrectAnswers.push(question);
        }
    });

    return { correctAnswers, incorrectAnswers, feedbackByQuestion };
};
const transformDataToReportFormat = ({ student, assessment, studentAssessment, questions }) => {
    const { firstName, lastName } = student;
    const { name } = assessment;
    const { completed, responses } = studentAssessment;

    const { correctAnswers, incorrectAnswers, feedbackByQuestion } = transformStudentResponses(responses, questions);

    return {
        assessmentTitle: name,
        assessmentCompletedDateTime: completed, //FixMe: format
        correctAnswersNumber: correctAnswers.length,
        incorrectAnswers,
        questionsNumber: responses.length,
        feedbackByQuestion,
        studentName: `${ firstName } ${ lastName }`
    };
};

const readFile = async (filePath) => {
    return await fs.readFile(filePath).then(data => {
        return data.toString();
    }).catch(error => {
        console.log(error);
    });
};

const setReportVariables = (template, reportData) => {
    let content = template;

    replacementVariables.map((variable) =>
        content = content.replaceAll(`[${variable}]`, reportData[variable])
    );

    return content;
};

module.exports = {
    transformDataToReportFormat,
    readFile,
    setReportVariables
}