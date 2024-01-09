const express = require('express');
const router = express.Router();
const {
    getAssessments,
    getAssessmentsByStudent
} = require('../controllers/assessmentController');

router.get('/', getAssessments);

router.get('/student/:studentId', getAssessmentsByStudent);

module.exports = router;
