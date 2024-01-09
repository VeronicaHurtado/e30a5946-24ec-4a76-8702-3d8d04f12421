const express = require('express');
const indexRouter = require('./routes/index');
const assessmentsRouter = require('./routes/assessments');
const questionsRouter = require('./routes/questions');
const studentsRouter = require('./routes/students');

const server = express();
const port = 3000;

server.use('/', indexRouter);
server.use('/assessments', assessmentsRouter);
server.use('/questions', questionsRouter);
server.use('/students', studentsRouter);

// ToDo: Guard middleware to restrict access to data

server.listen(port, () => {
    console.log(`Simple assessment reporting system listening on port ${port}`)
});

module.exports = server;