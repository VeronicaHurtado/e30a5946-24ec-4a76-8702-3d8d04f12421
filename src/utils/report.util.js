const fs = require('node:fs/promises');

const feedbackByQuestionTemplate = '' +
    'Question: [stem]\n' +
    'Your answer: [selected]\n' +
    'Right answer: [correct]\n' +
    'Hint: [hint]';

const scoreByQuestionTemplate = '\nDate: [assignedDate], Raw Score: [rawScore] out of [assessmentTotalScore]';

const replacementVariables = [
    'studentName',
    'assessmentTitle',
    'assessmentCompletedDateTime',
    'assessmentAttempts',
    'assessmentTotalScore',
    'scoreStatement',
    'assignedDate',
    'rawScore',
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

const transformResponses = (responses, questions) => {
    const correctAnswers = [];
    const incorrectAnswers = [];
    const questionsObject = arrayToObject(questions);
    let feedbackByQuestion = '';

    responses.map(({ questionId, response }) => {
        const {stem, strand, config} = questionsObject[questionId];
        const {key, hint} = config;
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

const transformStudentResponses = (studentResponses, assessmentTotalScore) => {
    const studentScores = [];
    let scoreByAssessment = '';

    studentResponses.map(({ assigned, results }) => {
        const { rawScore } = results;
        const score = {
            assignedDate: assigned,
            rawScore,
            assessmentTotalScore
        }
        studentScores.push(score);
        scoreByAssessment = scoreByAssessment + setReportVariables(scoreByQuestionTemplate, score);
    })

    return { studentScores, scoreByAssessment }
};

const transformDataToReportFormat = ({ student, assessment, studentAssessment = {}, questions = [], studentScores = [] }) => {
    const { firstName, lastName } = student;
    const { name } = assessment;
    const { completed, responses = [] } = studentAssessment;
    const scoreDiff = studentScores.length && (studentScores[studentScores.length - 1].rawScore - studentScores[0].rawScore);
    const scoreStatement = scoreDiff > 0? `${scoreDiff} more correct` : `${scoreDiff} less correct`;
    const {
        correctAnswers,
        incorrectAnswers,
        feedbackByQuestion
    } = responses.length && transformResponses(responses, questions) || {};

    return {
        assessmentTitle: name,
        assessmentCompletedDateTime: completed, //FixMe: format
        correctAnswersNumber: correctAnswers && correctAnswers.length,
        incorrectAnswers,
        questionsNumber: responses.length,
        feedbackByQuestion,
        studentName: `${ firstName } ${ lastName }`,
        assessmentAttempts: studentScores.length,
        scoreStatement
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
    transformStudentResponses,
    transformDataToReportFormat,
    readFile,
    setReportVariables
}