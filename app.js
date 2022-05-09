const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');

const loginRouter = require('./routes/login');
const studentRouter = require('./routes/student');
const teacherRouter = require('./routes/teacher');
const courseRouter = require('./routes/course');

const app = express();
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login',loginRouter);
app.use('/student',studentRouter);
app.use('/teacher',teacherRouter);
app.use('/course',courseRouter);


module.exports = app;