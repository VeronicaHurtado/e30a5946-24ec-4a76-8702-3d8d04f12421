const express = require('express');
const router = express.Router();
const {
    getAssessments,
    getAssessment,
    getAssessmentsByStudent
} = require('../controllers/assessmentController');

router.get('/', getAssessments);

router.get('/:assessmentId', getAssessment);

router.get('/student/:studentId', getAssessmentsByStudent);

module.exports = router;
