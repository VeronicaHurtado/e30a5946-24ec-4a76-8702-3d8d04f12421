const dataUtils = require('../utils/data.util');
const source = 'questions.json';

const getQuestions = async() => {
    return await dataUtils.readFile(source);
};

const getQuestion = async(questionId) => {
    const questions = await dataUtils.readFile(source);

    return questions.find(question => question.id === questionId);
};

module.exports = {
    getQuestions,
    getQuestion
}