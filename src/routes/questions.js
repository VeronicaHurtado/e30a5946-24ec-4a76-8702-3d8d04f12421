const express = require('express');
const router = express.Router();
const dataUtils = require('../utils/dataUtils');
const source = 'questions.json';
router.get('/', async function(req, res) {
    const questions = await dataUtils.readFile(source);
    console.log({ questions });
    res.json({ questions });
});

module.exports = router;
