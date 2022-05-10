const db = require('../database')

const course={
    get:function(callback){
        return db.query('select * from course',callback)
    },
    getById:function(id,callback){
        return db.query('select * from course where courseID=?',[id],callback)
    },
    add:function(course,callback){
        return db.query('insert into course values(null,?,?,?,?,null)',
        [course.name,course.date,course.TeacherID,course.StudentID],callback)
    },
    delete:function(id,callback){
        return db.query('delete from course where courseID=?',[id],callback)
    },
    update:function(id,course,callback){
        return db.query('update course set status=? where courseID=?',
        [course.status,id],callback)
    },
    getTID:function(id,callback){
        return db.query('select * from course where TeacherID=?',[id],callback)
    },
    getSID:function(id,callback){
        return db.query('select * from course where StudentID=?',[id],callback)
    },
}

module.exports = course