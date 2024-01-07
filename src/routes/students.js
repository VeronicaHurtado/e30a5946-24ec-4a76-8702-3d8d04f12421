const express = require('express');
const router = express.Router();
const dataUtils = require('../utils/dataUtils');
const source = 'students.json';
router.get('/', async function(req, res) {
    const students = await dataUtils.readFile(source);
    console.log({ students });
    res.json({ students });
});

module.exports = router;
