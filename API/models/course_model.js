const db = require('../database')

const course={
    get:function(callback){
        return db.query('select * from course',callback)
    },
    getById:function(id,callback){
        return db.query('select * from course where courseID=?',[id],callback)
    },
    //making course
    add:function(id,course,callback){
        return db.query('insert into course values(null,?,?,?,?,null)',
        [course.name,course.date,id,course.StudentID],callback)
    },
    //deleting old course
    delete:function(id,name,callback){
        return db.query('delete from course where teacherid=? and name=?',[id,name],callback)
    },
    //students change status of certain day
    update:function(id,course,callback){
        return db.query('update course set status=? where studentid=? and date=? and name=?',
        [course.status,id,course.date,course.name],callback)
    },
    //get all courses of teacher
    getTID:function(id,callback){
        return db.query('select distinct name,min(date) as min,max(date) as max from course where TeacherID=? group by name',[id],callback)
    },
    //get all courses of student
    getSID:function(id,callback){
        return db.query('select distinct name,min(date) as min,max(date) as max from course where StudentID=? group by name',[id],callback)
    },
    //get all status from students in course
    getCSC:function(id,name,callback){
        return db.query('select count(1) as count,status from course where TeacherID=? and Name=? group by status',[id,name],callback)
    },
    //get calendar of teacher course
    getDTC:function(id,name,callback){
        return db.query('select distinct date from course where teacherid=? and name=?',[id,name],callback)
    },
    //get certain days status from all students
    getDSC:function(id,name,date,callback){
        return db.query('select count(1) as count,status,date from course where TeacherID=? and Name=? and date=? group by status',
        [id,name,date],callback)
    },
    //get info on all course days to student
    getSDS:function(id,course,callback){
        return db.query('select * from course where studentid=? and name=?',[id,course],callback)
    },
    //get names of students with status null in certain day of course
    getLS:function(id,course,callback){
        return db.query('select fname,lname from student join course on course.studentid=student.studentid where status is null and name=? and date=? and teacherid=? group by fname,lname',
        [course.name,course.date,id],callback)
    },
    //get names of students with not null status in certain day of course
    getOS:function(id,course,callback){
        return db.query('select fname,lname from student join course on course.studentid=student.studentid where status is not null and name=? and date=? and teacherid=? group by fname,lname',
        [course.name,course.date,id],callback)
    },
    //get finished courses
    getFC:function(callback){
        return db.query('select teacherid,name,max(date) from course group by teacherid,name',callback)
    }
}

module.exports = course