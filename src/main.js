const inquirer = require('inquirer');

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

const diagnostic = () => {
    console.log('diagnostic ran!');
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
    console.log({ studentId, reportNumber });
    reports[reportNumber.toLowerCase()]();
};

const init = () => {
    inquirer.prompt(questions)
        .then(answers => processAnswers(answers))
        .catch(err => console.log(err));
};

module.exports = {
    init
};