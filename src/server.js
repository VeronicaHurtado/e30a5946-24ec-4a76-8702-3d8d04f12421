const express = require('express');
const indexRouter = require('./routes/index');
const assessmentsRouter = require('./routes/assessments');
const questionsRouter = require('./routes/questions');
const studentsRouter = require('./routes/students');
const bodyParser = require('body-parser');

const server = express();
const port = 3000;

server.use(bodyParser.json());

server.use('/', indexRouter);
server.use('/assessments', assessmentsRouter);
server.use('/questions', questionsRouter);
server.use('/students', studentsRouter);

// ToDo: Guard middleware to restrict access to data

server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});

module.exports = server;