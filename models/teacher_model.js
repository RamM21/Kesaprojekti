const db = require('../database')

const Teacher={
    get:function(callback){
        return db.query('select TeacherID,fname,lname,email from Teacher',callback)
    },
    getById:function(id,callback){
        return db.query('select TeacherID,fname,lname,email from Teacher where TeacherID=?',[id],callback)
    },
    add:function(Teacher,callback){
        return db.query('insert into Teacher values(null,?,?,?,?)',
        [Teacher.fname,Teacher.lname,Teacher.email,Teacher.password],callback)
    },
    delete:function(id,callback){
        return db.query('delete from Teacher where TeacherID=?',[id],callback)
    },
    update:function(id,Teacher,callback){
        return db.query('update Teacher set fname=?,lname=?,email=? where TeacherID=?',
        [Teacher.fname,Teacher.lname,Teacher.email,id],callback)
    }
}

module.exports = Teacher