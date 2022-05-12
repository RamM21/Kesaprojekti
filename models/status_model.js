const db = require('../database')

const status={
    //get students who have null status and late answer
    checkdate:function(date,callback){
        return db.query('select distinct email ,fname,lname,name from student join course on course.studentid=student.studentid where date<? and status is null',
        [date],callback)
    },
    //get course end status
    EndStatus:function(date,course,callback){
        return db.query('select name ,count(1) as count,status,email from teacher join course on course.TeacherID=teacher.TeacherID where teacher.TeacherID=? and name=? and (select max(date) from course where TeacherID=? and name=?)<? group by name,status',
        [course.teacherid,course.name,course.teacherid,course.name,date],callback)
    }
}

module.exports = status