const service = require('../services/studentService');
const getStudents = async (req, res, next) => {
    //ToDo: Pagination
    try {
        res.json(await service.getStudents());
    } catch (err) {
        console.error('Error getting students', err.message);
        next(err);
    }
}

const getStudent = async (req, res, next) => {
    //ToDo: Sanitise request params
    try {
        //ToDo: Handle student not found
        res.json(await service.getStudent(req.params.studentId));
    } catch (err) {
        console.error('Error getting student', err.message);
        next(err);
    }
}

module.exports = {
    getStudents,
    getStudent
}