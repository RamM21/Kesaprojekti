const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const cors = require('cors')

const loginRouter = require('./routes/login');
const studentRouter = require('./routes/student');
const teacherRouter = require('./routes/teacher');
const courseRouter = require('./routes/course');
const statusRouter = require('./routes/checkstatus')


const app = express();
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(cors())
app.options('*',cors())

app.use('/',statusRouter)
app.use('/login',loginRouter);
app.use('/student',studentRouter);
app.use('/teacher',teacherRouter);
app.use('/course',courseRouter);


module.exports = app;