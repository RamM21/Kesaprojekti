const db = require('../database')

const login={
    //student login
    student:function(email,callback){
        return db.query('Select password,studentid as id from Student where email=?',[email],callback)
    },
    //teacher login
    teacher:function(email,callback){
        return db.query('select password,teacherid as id from teacher where email=?',[email],callback)
    }
}

module.exports = login