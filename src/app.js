const inquirer = require('inquirer');
const {
    getStudent,
    getAssessment,
    getAssessmentsByStudent,
    getQuestions
} = require('./queries');
const { transformDataToReportFormat, readFile, setReportVariables } = require('./utils/report.util');
const path = require('path');
const templatesPath = path.join(process.cwd(), '/src/templates');

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
    const student = await getStudent(studentId);

    if (!student) {
        // ToDo: Improve "Student not found" error handling
        console.log('The given Student Id is invalid. Please restart the application and provide a new Id.');
        // eslint-disable-next-line n/no-process-exit
        process.exit();
    }

    const studentAssessment = await getAssessmentsByStudent(studentId, { sortByDate: 'completed', lastRecordOnly: 'true' });
    const { assessmentId } = studentAssessment;
    const assessment = await getAssessment(assessmentId);
    const questions = await getQuestions();
    const reportData = transformDataToReportFormat({ student, assessment, studentAssessment, questions });
    const template = await readFile(path.join(templatesPath, 'diagnostic.txt'));
    const report = setReportVariables(template, reportData);
    console.info('************************************    Diagnostic report    **********************************');
    console.info(report);
    console.info('***********************************************************************************************');
}

const feedback = async (studentId) => {
    const student = await getStudent(studentId);

    if (!student) {
        // ToDo: Improve "Student not found" error handling
        console.log('The given Student Id is invalid. Please restart the application and provide a new Id.');
        // eslint-disable-next-line n/no-process-exit
        process.exit();
    }

    const studentAssessment = await getAssessmentsByStudent(studentId, { sortByDate: 'completed', lastRecordOnly: 'true' });
    const { assessmentId } = studentAssessment;
    const assessment = await getAssessment(assessmentId);
    const questions = await getQuestions();
    const reportData = transformDataToReportFormat({ student, assessment, studentAssessment, questions });
    const template = await readFile(path.join(templatesPath, 'feedback.txt'));
    const report = setReportVariables(template, reportData);

    console.info('**************************************    Feedback report    **********************************');
    console.info(report);
    console.info('***********************************************************************************************');
}

const progress = async (studentId) => {
    const student = await getStudent(studentId);

    if (!student) {
        // ToDo: Improve "Student not found" error handling
        console.log('The given Student Id is invalid. Please restart the application and provide a new Id.');
        // eslint-disable-next-line n/no-process-exit
        process.exit();
    }

    const studentAssessments = await getAssessmentsByStudent(studentId);

    console.log('The Progress report is still work-in-progress... Ha!');
    console.log('We do apologise for the inconvenience.');
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