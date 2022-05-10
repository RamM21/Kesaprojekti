const db = require('../database')

const status={
    checkdate:function(date,callback){
        return db.query('select * from course where date<? and status is null',[date],callback)
    }
}

module.exports = status