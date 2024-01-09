const express = require('express');
const router = express.Router();
const {
    getStudents,
    getStudent
} = require('../controllers/studentController');

router.get('/', getStudents);

router.get('/:studentId', getStudent);

module.exports = router;
