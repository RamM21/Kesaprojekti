const db = require('../database')

const student={
    //get all student info
    get:function(callback){
        return db.query('select StudentID,Fname,lname,class,email from Student',callback)
    },
    //get all info of certain student
    getById:function(id,callback){
        return db.query('select StudentID,Fname,lname,class,email from Student where StudentID=?',[id],callback)
    },
    //add student
    add:function(student,callback){
        return db.query('insert into Student values(null,?,?,?,?,?)',
        [student.fname,student.lname,student.class,student.email,student.password],callback)
    },
    //remove student
    delete:function(id,callback){
        return db.query('delete from Student where StudentID=?',[id],callback)
    },
    //update new info on student
    update:function(id,student,callback){
        return db.query('update Student set fname=?,lname=?,class=?,email=? where StudentID=?',
        [student.fname,student.lname,student.class,student.email,id],callback)
    }
}

module.exports = student