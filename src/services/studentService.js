const dataUtils = require('../utils/data.util');
const source = 'students.json';

const getStudents = async() => {
    return await dataUtils.readFile(source);
};

const getStudent = async(studentId) => {
    const students = await dataUtils.readFile(source);

    return students.find(student => student.id === studentId);
};

module.exports = {
    getStudents,
    getStudent
}