const mysql = require('mysql')
const connection = mysql.createPool({
    host:'localhost',
    user:'project',
    password:'project',
    database:'kesaprojekti'
})
module.exports = connection