const express = require('express')
const router = express.Router()
const teacher = require('../models/teacher_model')
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

//get all teacher info or by id
router.get('/:id?',function(request,response){
    if(request.params.id){
        teacher.getById(request.params.id,function(err,result){
            if(err){
                response.json(err)
            }else{
                response.json(result)
            }
        })
    }else{
        teacher.get(function(err,result){
            if(err){
                response.json(err)
            }else{
                response.json(result)
            }
        })
    }
})
//add teacher
router.post('/',function(request,response){
    teacher.get(function(err,result){
        if(err){
            console.log(err)
        }else{
            for (let i = 0; i < result.length; i++) {
                if(result[i].email==request.body.email){
                    response.json('email already used')
                    return
                }
            }
            teacher.add(request.body,function(err,result){
                if(err){
                    response.json(err)
                }else{
                    response.json(request.body)
                }
            })
        }
    })
    
})
//remove teacher
router.delete('/:id',passport.authenticate('jwt',{session:false}),function(request,response){
    teacher.delete(request.params.id,function(err,result){
        if(err){
            response.json(err)
        }else{
            response.json(result)
        }
    })
})
//update teacher
router.put('/:id',passport.authenticate('jwt',{session:false}),function(request,response){
    teacher.update(request.params.id,function(err,result){
        if(err){
            response.json(err)
        }else{
            response.json(result)
        }
    })
})

module.exports = router