const service = require('../services/questionService');

const getQuestions = async (req, res) => {
    //ToDo: Pagination
    try {
        const questions = await service.getQuestions();
        return res
            .status(200)
            .send({ status: 'OK', data: questions });
    } catch (err) {
        return res
            .status(err?.status || 500)
            .send({ status: 'FAILED', error: err?.message || err });
    }
}

const getQuestion = async (req, res) => {
    //ToDo: Sanitise request params
    try {
        const { questionId } = req.params;

        if (!questionId) {
            return res
                .status(400)
                .send({ status: 'FAILED', error: "Parameter ':questionId' cannot be empty" });
        }

        const question = await service.getQuestion(questionId);

        if (!question) {
            return res
                .status(404)
                .send({ status: 'FAILED', error: 'Question not found' });
        }

        return res.status(200).send({ status: 'OK', data: question });
    } catch (err) {
        return res
            .status(err?.status || 500)
            .send({ status: 'FAILED', data: { error: err?.message || err } });
    }
}

module.exports = {
    getQuestions,
    getQuestion
}