const service = require('../services/assessmentService');

const getAssessments = async (req, res) => {
    //ToDo: Pagination
    try {
        const assessments = await service.getAssessments();
        return res
            .status(200)
            .send({ status: 'OK', data: assessments });
    } catch (err) {
        return res
            .status(err?.status || 500)
            .send({ status: 'FAILED', error: err?.message || err });
    }
}

const getAssessment = async (req, res) => {
    //ToDo: Sanitise request params
    try {
        const { assessmentId } = req.params;

        if (!assessmentId) {
            return res
                .status(400)
                .send({ status: 'FAILED', error: "Parameter ':assessmentId' cannot be empty" });
        }

        const assessment = await service.getAssessment(assessmentId);

        if (!assessment) {
            return res
                .status(404)
                .send({ status: 'FAILED', error: 'Assessment not found' });
        }

        return res.status(200).send({ status: 'OK', data: assessment });
    } catch (err) {
        return res
            .status(err?.status || 500)
            .send({ status: 'FAILED', error: err?.message || err });
    }
}

const getAssessmentsByStudent = async (req, res) => {
    //ToDo: Sanitise request params
    try {
        const { studentId } = req.params;
        const { sortByDate, lastRecordOnly } = req.query;

        if (!studentId) {
            return res
                .status(400)
                .send({ status: 'FAILED', error: "Parameter ':studentId' cannot be empty" });
        }

        const studentResponses = await service.getAssessmentsByStudent(studentId, { sortByDate, lastRecordOnly });

        return res.status(200).send({ status: 'OK', data: studentResponses });
    } catch (err) {
        return res
            .status(err?.status || 500)
            .send({ status: 'FAILED', error: err?.message || err });
    }
}

module.exports = {
    getAssessments,
    getAssessment,
    getAssessmentsByStudent
}