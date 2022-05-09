const express = require('express')
const app = express()
const bodyparser = require('body-parser')

const loginRouter = require('./routes/login')
const studentRouter = require('./routes/student')
const teacherRouter = require('./routes/teacher')
const courseRouter = require('./routes/course')

app.use(bodyparser.json())

app.use('/login',loginRouter)
app.use('/student',studentRouter)
app.use('/teacher',teacherRouter)
app.use('/course',courseRouter)


module.exports = app