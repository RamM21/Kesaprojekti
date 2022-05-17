const express = require('express')
const router = express.Router()
const student = require('../models/student_model')
const jwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt
const passport = require('passport')

let jwtSecretKey=null
if(process.env.JWTKEY === undefined){
    jwtSecretKey=require('../jwt-key.json').secret
}else{
    jwtSecretKey=process.env.JWTKEY
}
let options={}

options.jwtFromRequest=extractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey=jwtSecretKey

passport.use(new jwtStrategy(options,function(jwt_payload,done){
    done(null,jwt_payload.user)
}))

//get all students or student by id
router.get('/:id?',passport.authenticate('jwt',{session:false}),function(request,response){
    if(request.params.id){
        student.getById(request.params.id,function(err,result){
            if(err){
                response.json(err)
            }else{
                response.json(result)
            }
        })
    }else{
        student.get(function(err,result){
            if(err){
                response.json(err)
            }else{
                response.json(result)
            }
        })
    }
})
//add student
router.post('/',function(request,response){
    student.add(request.body,function(err,count){
        if(err){
            response.json(err)
        }else{
            response.json(request.body)
        }
    })
})
//remove student
router.delete('/:id',passport.authenticate('jwt',{session:false}),function(request,response){
    student.delete(request.params.id,function(err,count){
        if(err){
            response.json(err)
        }else{
            response.json(count)
        }
    })
})
//update student
router.put('/:id',passport.authenticate('jwt',{session:false}),function(request,response){
    student.update(request.params.id,request.body,function(err,result){
        if(err){
            response.json(err)
        }else{
            response.json(result)
        }
    })
})

module.exports = router