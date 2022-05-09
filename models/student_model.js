const db = require('../database')

const student={
    get:function(callback){
        return db.query('select * from student',callback)
    },
    getById:function(id,callback){
        return db.query('select * from student where StudentID=?',[id],callback)
    },
    add:function(student,callback){
        return db.query('insert into student values(null,?,?,?,?,?)',
        [student.fname,student.lname,student.class,student.email,student.password],callback)
    },
    delete:function(id,callback){
        return db.query('delete from student where studentID=?',[id],callback)
    },
    update:function(id,student,callback){
        return db.query('update student set fname=?,lname=?,class=?,email=? where studentID=?',
        [student.fname,student.lname,student.class,student.email,id],callback)
    }
}

module.exports = student