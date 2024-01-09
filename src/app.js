const inquirer = require('inquirer');
const {
    getStudent,
    getAssessmentsByStudent
} = require('./queries');

const questions = [
    {
        type: 'input',
        name: 'studentId',
        message: 'Please type the Student Id',
    },
    {
        type: 'list',
        name: 'reportNumber',
        message: 'Please select the Report you wish to generate',
        choices: ['Diagnostic', 'Progress', 'Feedback'],
    },
];

const diagnostic = async (studentId) => {
    // ToDo: Handle "Student not found, please provide a diff Id"
    const student = await getStudent(studentId);
    const assessments = await getAssessmentsByStudent(studentId, queryParams);

    console.log('diagnostic ran!', { student, assessments });
}

const feedback = () => {
    console.log('feedback ran!');
}

const progress = () => {
    console.log('progress ran!');
}

const reports = {
    'diagnostic': diagnostic,
    'progress': progress,
    'feedback': feedback,
};

const processAnswers = (answers) => {
    const { studentId, reportNumber } = answers;
    //ToDo: Validate studentId
    reports[reportNumber.toLowerCase()](studentId);
};

const init = () => {
    inquirer.prompt(questions)
        .then(answers => processAnswers(answers))
        .catch(err => console.log(err));
};

init();

// module.exports = {
//     init
// };