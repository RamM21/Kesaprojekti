const db = require('../database')

const student={
    get:function(callback){
        return db.query('select StudentID,Fname,lname,class,email from Student',callback)
    },
    getById:function(id,callback){
        return db.query('select StudentID,Fname,lname,class,email from Student where StudentID=?',[id],callback)
    },
    add:function(student,callback){
        return db.query('insert into Student values(null,?,?,?,?,?)',
        [student.fname,student.lname,student.class,student.email,student.password],callback)
    },
    delete:function(id,callback){
        return db.query('delete from Student where StudentID=?',[id],callback)
    },
    update:function(id,student,callback){
        return db.query('update Student set fname=?,lname=?,class=?,email=? where StudentID=?',
        [student.fname,student.lname,student.class,student.email,id],callback)
    }
}

module.exports = student