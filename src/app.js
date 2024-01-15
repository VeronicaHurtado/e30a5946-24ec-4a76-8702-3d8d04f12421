const inquirer = require('inquirer');
const {
    getStudent,
    getAssessment,
    getAssessmentsByStudent,
    getQuestions
} = require('./queries');
const {
    transformStudentResponses,
    transformDataToReportFormat,
    readFile,
    setReportVariables
} = require('./utils/report.util');
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
    const assessment = await getAssessment(studentAssessments[0].assessmentId);
    const questions = await getQuestions();
    const { studentScores, scoreByAssessment} = transformStudentResponses(studentAssessments, questions.length);
    const reportData = transformDataToReportFormat({ student, assessment, studentScores, scoreByAssessment });
    const template = await readFile(path.join(templatesPath, 'progress.txt'));
    const report = setReportVariables(template, { ...reportData, scoreByAssessment });

    console.info('**************************************    Progress report    **********************************');
    console.info(report);
    console.info('***********************************************************************************************');
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