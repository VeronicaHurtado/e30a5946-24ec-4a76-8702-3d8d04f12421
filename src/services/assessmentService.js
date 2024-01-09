const dataUtils = require('../utils/data.util');
const assessmentsFile = 'assessments.json';
const studentResponsesFile = 'student-responses.json';

const getAssessments = async() => {
    return await dataUtils.readFile(assessmentsFile);
};
const getAssessmentsByStudent = async(studentId, options = {}) => {
    const allStudentsResponses = await dataUtils.readFile(studentResponsesFile);
    const thisStudentResponses = allStudentsResponses.filter((studentResponses) => {
        const { student, completed } = studentResponses;
        return (student.id === studentId) && completed;
    });

    if (options && thisStudentResponses) {
        const { sortByDate, lastRecordOnly } = options;
        let filteredResponses = thisStudentResponses;

        if (sortByDate) {
            filteredResponses = dataUtils.sortArrayByObjectDateProperty(filteredResponses, sortByDate);
        }

        if (lastRecordOnly && lastRecordOnly === 'true') {
            return filteredResponses[filteredResponses.length - 1];
        }

        return filteredResponses;
    }


    return thisStudentResponses;
};

module.exports = {
    getAssessments,
    getAssessmentsByStudent
}