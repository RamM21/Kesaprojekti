const express = require('express')
const router = express.Router()
const login = require('../models/login_model')

//login
router.post('/',function(request,response){
    if(request.body.email && request.body.password){
        const email = request.body.email
        const password = request.body.password
        if(email.includes("students.oamk.fi")){             //if student login go login student
            login.student(email,function(err,result){
                if(err){
                    response.json(err)
                }else{
                    if(result.length > 0){
                        if(password==result[0].password){
                            response.send(true)
                        }else{
                            response.send(false)
                            console.log("wrong password")
                        }
                        response.end()
                    }else{
                        response.send(false)
                        console.log("email doesn't exist")
                    }
                }
            })
        }else{                                             //if teacher login go login teacher
            login.teacher(email,function(err,result){
                if(err){
                    response.json(err)
                }else{
                    if(result.length > 0){
                            if(password==result[0].password){
                                response.send(true)
                            }else{
                                response.send(false)
                                console.log("wrong password")
                            }
                            response.end()
                    }else{
                        response.send(false)
                        console.log("email doesn't exist")
                    }
                }
            })
        }
    }else{
        console.log("email or password missing")
        response.send(false)
    }
})

module.exports = router