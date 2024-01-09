const express = require('express');
const router = express.Router();
const {
    getQuestions,
    getQuestion
} = require('../controllers/questionController');

router.get('/', getQuestions);

router.get('/:questionId', getQuestion);

module.exports = router;
