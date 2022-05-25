const express = require('express')
const nodemailer = require('nodemailer')
const router = express.Router()
const status = require('../models/status_model')
const course = require('../models/course_model')
const stuff = require('../dev')
const { response } = require('express')

//setInterval(checkstatus,10000)

/*
function checkstatus(){
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
                    studentMail(e.email,e.name)
                });
            }
        }
    })
    getEndStatus()
}


async function getEndStatus(){
    let date_ob= new Date()
    let day = ('0'+date_ob.getDate()).slice(-2)
    let month = ('0'+(date_ob.getMonth()+1)).slice(-2)
    let year = date_ob.getFullYear()
    date=(year+'-'+month+'-'+day).toString()

    course.getFC(function(err,result){
        if(err){
            console.log(err)
        }else{
            let check=JSON.parse(JSON.stringify(result))
            check.forEach(e=>{
                status.EndStatus(date,e,function(err,result){
                    if(err){
                        console.log(err)
                    }else{
                        let list=JSON.parse(JSON.stringify(result))
                        if(list.length>0){
                            teacherMail(list)
                        }
                    }
                })
            })
        }
    })
}

async function teacherMail(info){

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port:465,
    auth: {
      user: stuff.s,
      pass: stuff.ss
    },
    tls:{
        ciphers:'SSLv3'
    },
    requireTLS:true
  });

  let text=""
  info.forEach(e => {
      text+=("Status "+e.status+" count "+e.count+"\n")
  });

var mailOptions = {
    from:'ramiilmari@gmail.com',
    to:info[0].email,
    subject:'test',
    text:'final status count in course '+info[0].name+"\n"+text
}

transporter.sendMail(mailOptions,function(err,result){
    if(err){
        console.log(err)
    }else{
        console.log(result)
    }
})
}


async function studentMail(mail,course){

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port:465,
    auth: {
      user: stuff.s,
      pass: stuff.ss
    },
    tls:{
        ciphers:'SSLv3'
    },
    requireTLS:true
  });

var mailOptions = {
    from:'ramiilmari@gmail.com',
    to:mail,
    subject:'test',
    text:'you have not answered to studying status in '+course+' go fill in late anwered days'
}

transporter.sendMail(mailOptions,function(err,result){
    if(err){
        console.log(err)
    }else{
        console.log(result)
    }
})
}*/

module.exports = router