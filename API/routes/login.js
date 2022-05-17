const express = require('express')
const router = express.Router()
const login = require('../models/login_model')
const passport = require('passport')
const BasicStrategy = require('passport-http').BasicStrategy
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

passport.use(new BasicStrategy(function(username,password,done){
    if(username && password){
        if(username.includes("students.oamk.fi")){             //if student login go login student
            login.student(username,function(err,result){
                if(err){
                    return done(null,false,{message:'no user found'})
                }else{
                    if(result.length > 0){
                        bcrypt.compare(password,result[0].password,function(err,hashresult){
                            if(hashresult){
                                let user={}
                                user.id=result[0].id
                                user.email=username
                                return done(null,user)
                            }else{
                                return done(null,false,{message:'wrong password'})
                            }
                        })
                    }else{
                        return done(null,false,{message: 'no email found'})
                    }
                }
            })
        }else{                                             //if teacher login go login teacher
            login.teacher(username,function(err,result){
                if(err){
                    response.json(err)
                }else{
                    if(result.length > 0){
                        bcrypt.compare(password,result[0].password,function(err,hashresult){
                            if(hashresult){
                                let user={}
                                user.id=result[0].id
                                user.email=username
                                return done(null,user)
                            }else{
                                return done(null,false,{message:'wrong password'})
                            }
                        })
                    }else{
                        return done(null,false,{message:'email does not exist'})
                    }
                }
            })
        }
    }else{
        return done(null,false,{message:'email or password missing'})
    }

}))

//login
router.post('/',passport.authenticate('basic',{session:false}),function(request,response){
    let jwtSecretKey=require('../jwt-key.json').secret
    if(request.user.email.includes('@student.oamk.fi')){
    const body={
        id:request.user.id,
        email:request.user.email
    }
    const payload={
        user:body
    }
    const options={
        
    }
    const token=jwt.sign(payload,jwtSecretKey,options)
    response.json({token})
}else{
    const body={
        id:request.user.id,
        email:request.user.email
    }
    const payload={
        user:body
    }
    const options={
        
    }
    const token=jwt.sign(payload,jwtSecretKey,options)
    response.json({token})
}
})

module.exports = router