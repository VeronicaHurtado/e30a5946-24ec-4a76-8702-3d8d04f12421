const globalConfig = require('../config/global.config');
const querystring = require('node:querystring');
const getStudents = () =>
    fetch(`${globalConfig.serverApi}/students`)
        .then(response => response.json())
        .then(body => body.data)
        .catch(error => console.error('Error:', error));

const getStudent = (studentId) =>
    fetch(`${globalConfig.serverApi}/students/${studentId}`)
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
    getStudents,
    getStudent,
    getAssessmentsByStudent
}