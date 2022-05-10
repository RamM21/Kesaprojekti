const express = require('express')
const nodemailer = require('nodemailer')
const router = express.Router()
const status = require('../models/status_model')
const stuff = require('../dev')

/*main()

async function main(){
let testAccount = await nodemailer.createTestAccount()

let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

var mailOptions = {
    from:'t0mura00@students.oamk.fi',
    to:'t0mura00@students.oamk.fi',
    subject:'test',
    text:'testing email send'
}

transporter.sendMail(mailOptions,function(err,result){
    if(err){
        console.log(err)
    }else{
        console.log(result)
    }
})
}*/

/*function checkstatus(){
    let date_ob= new Date()
    let day = ('0'+date_ob.getDate()).slice(-2)
    let month = ('0'+(date_ob.getMonth()+1)).slice(-2)
    let year = date_ob.getFullYear()
    date=(year+'-'+month+'-'+day).toString()

    status.checkdate(date,function(err,result){
        if(err){
            console.log(err)
        }else{
            let list=JSON.parse(JSON.stringify(result))
            if(list.length>0){
                list.forEach(e => {
                    
                });
            }
        }
    })
    
}
setInterval(checkstatus,10000)*/

module.exports = router