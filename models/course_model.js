const db = require('../database')

const course={
    get:function(callback){
        return db.query('select * from course',callback)
    },
    getById:function(id,callback){
        return db.query('select * from course where courseID=?',[id],callback)
    },
    //making course
    add:function(course,callback){
        return db.query('insert into course values(null,?,?,?,?,null)',
        [course.name,course.date,course.TeacherID,course.StudentID],callback)
    },
    //deleting old course
    delete:function(id,callback){
        return db.query('delete from course where courseID=?',[id],callback)
    },
    //students change status of certain day
    update:function(id,course,callback){
        return db.query('update course set status=? where studentid=? and date=? and name=?',
        [course.status,id,course.date,course.name],callback)
    },
    //get all courses of teacher
    getTID:function(id,callback){
        return db.query('select distinct name,min(date),max(date) from course where TeacherID=? group by name',[id],callback)
    },
    //get all courses of student
    getSID:function(id,callback){
        return db.query('select distinct name,min(date),max(date) from course where StudentID=? group by name',[id],callback)
    },
    //get all status from students in course
    getCSC:function(id,course,callback){
        return db.query('select count(1),status from course where TeacherID=? and Name=? group by status',[id,course.name],callback)
    },
    //get certain days status from all students
    getDSC:function(id,course,callback){
        return db.query('select count(1),status from course where TeacherID=? and Name=? and date=? group by status',
        [id,course.name,course.date],callback)
    },
    //get info on all course days to student
    getSDS:function(id,course,callback){
        return db.query('select * from course where studentid=? and name=?',[id,course.name],callback)
    },
    //get names of students with status null in certain day of course
    getLS:function(course,callback){
        return db.query('select fname,lname from student join course on course.studentid=student.studentid where status is null and name=? and date=?',
        [course.name,course.date],callback)
    },
    //get names of students with not null status in certain day of course
    getOS:function(course,callback){
        db.query('select fname,lname from student join course on course.studentid=student.studentid where status is not null and name=? and date=?',
        [course.name,course.date],callback)
    },
    //get finished courses
    getFC:function(callback){
        return db.query('select teacherid,name,max(date) from course group by teacherid,name',callback)
    }
}

module.exports = course