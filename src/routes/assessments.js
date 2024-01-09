const express = require('express');
const router = express.Router();
const dataUtils = require('../utils/data.util');
const source = 'assessments.json';
router.get('/', async function(req, res) {
    const assessments = await dataUtils.readFile(source);
    console.log({ assessments });
    res.json({ assessments });
});

module.exports = router;
