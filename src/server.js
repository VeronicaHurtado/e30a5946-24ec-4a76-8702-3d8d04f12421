const express = require('express');
const assessmentsRouter = require('./routes/assessments');
const questionsRouter = require('./routes/questions');
const studentsRouter = require('./routes/students');
const bodyParser = require('body-parser');

const server = express();

server.use(bodyParser.json());

server.use('/assessments', assessmentsRouter);
server.use('/questions', questionsRouter);
server.use('/students', studentsRouter);

// ToDo: Guard middleware to restrict access to data

module.exports = server;