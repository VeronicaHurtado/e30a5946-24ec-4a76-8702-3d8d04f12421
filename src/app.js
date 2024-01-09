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
    // ToDo: Handle "Student not found, please provide a diff Id"
    const student = await getStudent(studentId);
    const assessment = await getAssessmentsByStudent(studentId, { sortByDate: 'completed', lastRecordOnly: 'true' });

    console.log('diagnostic ran!', { student, assessment });
}

const feedback = async (studentId) => {
    // ToDo: Handle "Student not found, please provide a diff Id"
    const student = await getStudent(studentId);
    const studentAssessment = await getAssessmentsByStudent(studentId, { sortByDate: 'completed', lastRecordOnly: 'true' });
    const { assessmentId } = studentAssessment;
    const assessment = await getAssessment(assessmentId);
    const questions = await getQuestions();
    const reportData = transformDataToReportFormat({ student, assessment, studentAssessment, questions });
    const template = await readFile(path.join(templatesPath, 'feedback.txt'));
    const report = await setReportVariables(template, reportData);

    console.info('***********************************************************************************************');
    console.info(report);
    console.info('***********************************************************************************************');
}

const progress = async (studentId) => {
    // ToDo: Handle "Student not found, please provide a diff Id"
    const student = await getStudent(studentId);
    const assessments = await getAssessmentsByStudent(studentId);

    console.log('progress ran!', { student, assessments });
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