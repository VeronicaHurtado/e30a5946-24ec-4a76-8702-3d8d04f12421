const service = require('../services/studentService');
const getStudents = async (req, res) => {
    //ToDo: Pagination
    try {
        const students = await service.getStudents();
        return res
            .status(200)
            .send({ status: 'OK', data: students });
    } catch (err) {
        return res
            .status(err?.status || 500)
            .send({ status: 'FAILED', error: err?.message || err });
    }
}

const getStudent = async (req, res) => {
    //ToDo: Sanitise request params
    try {
        const { studentId } = req.params;

        if (!studentId) {
            return res
                .status(400)
                .send({ status: 'FAILED', error: "Parameter ':studentId' cannot be empty" });
        }

        const student = await service.getStudent(studentId);

        if (!student) {
            return res
                .status(404)
                .send({ status: 'FAILED', error: 'Student not found' });
        }

        return res.status(200).send({ status: 'OK', data: student });
    } catch (err) {
        return res
            .status(err?.status || 500)
            .send({ status: 'FAILED', data: { error: err?.message || err } });
    }
}

module.exports = {
    getStudents,
    getStudent
}