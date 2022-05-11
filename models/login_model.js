const db = require('../database')

const login={
    //student login
    student:function(email,callback){
        return db.query('Select password from Student where email=?',[email],callback)
    },
    //teacher login
    teacher:function(email,callback){
        return db.query('select password from teacher where email=?',[email],callback)
    }
}

module.exports = login