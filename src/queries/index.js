const globalConfig = require('../config/global.config');
const querystring = require('node:querystring');
const getQuestions = () =>
    fetch(`${globalConfig.serverApi}/questions`)
        .then(response => response.json())
        .then(body => body.data)
        .catch(error => console.error('Error:', error));

const getStudent = (studentId) =>
    fetch(`${globalConfig.serverApi}/students/${studentId}`)
        .then(response => response.json())
        .then(body => body.data)
        .catch(error => console.error('Error:', error));

const getAssessment = (assessmentId) =>
    fetch(`${globalConfig.serverApi}/assessments/${assessmentId}`)
        .then(response => response.json())
        .then(body => body.data)
        .catch(error => console.error('Error:', error));

const getAssessmentsByStudent = async (studentId, queryParams = {}) => {
    const encodedQueryParams = queryParams? `?${ querystring.encode(queryParams) }` : '';

    return await fetch(`${globalConfig.serverApi}/assessments/student/${studentId}${encodedQueryParams}`)
        .then(response => response.json())
        .then(body => body.data)
        .catch(error => console.error('Error:', error));
}


module.exports = {
    getQuestions,
    getStudent,
    getAssessment,
    getAssessmentsByStudent
}