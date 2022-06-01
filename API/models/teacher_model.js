const db = require('../database')
const bcrypt = require('bcryptjs')

const saltround=7

const Teacher={
    //get all teacher info
    get:function(callback){
        return db.query('select email from Teacher',callback)
    },
    //get all info of certain teacher
    getById:function(id,callback){
        return db.query('select TeacherID,fname,lname,email from Teacher where TeacherID=?',[id],callback)
    },
    //add teacher
    add:function(Teacher,callback){
        bcrypt.hash(Teacher.password,saltround,function(err,hash){
        return db.query('insert into Teacher values(null,?,?,?,?)',
        [Teacher.fname,Teacher.lname,Teacher.email,hash],callback)
    })
    },
    //remove teacher
    delete:function(id,callback){
        return db.query('delete from Teacher where TeacherID=?',[id],callback)
    },
    //update new info on teacher
    update:function(id,Teacher,callback){
        return db.query('update Teacher set fname=?,lname=?,email=? where TeacherID=?',
        [Teacher.fname,Teacher.lname,Teacher.email,id],callback)
    }
}

module.exports = Teacher