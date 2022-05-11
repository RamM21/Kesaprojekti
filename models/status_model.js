const db = require('../database')

const status={
    //get students who have null status and late answer
    checkdate:function(date,callback){
        return db.query('select * from course where date<? and status is null',[date],callback)
    }
}

module.exports = status