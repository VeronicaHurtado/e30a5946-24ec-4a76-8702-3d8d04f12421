const express = require('express');
const indexRouter = require('./routes/index');
const assessmentsRouter = require('./routes/assessments');
const questionsRouter = require('./routes/questions');
const studentsRouter = require('./routes/students');

const app = express();
const port = 3000;

app.use('/', indexRouter);
app.use('/assessments', assessmentsRouter);
app.use('/questions', questionsRouter);
app.use('/students', studentsRouter);

// ToDo: Guard middleware to restrict access to data

app.listen(port, () => {
    console.log(`Simple assessment reporting system listening on port ${port}`)
});

module.exports = app;