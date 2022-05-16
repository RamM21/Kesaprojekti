const express = require('express')
const router = express.Router()
const course = require('../models/course_model')
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

//get course by id or all courses
router.get('/',passport.authenticate('jwt',{session:false}),function(request,response){
    if(request.user.id){
        course.getById(request.user.id,function(err,result){
            if(err){
                response.json(err)
            }else{
                response.json(result)
            }
        })
    }else{
        course.get(function(err,result){
            if(err){
                response.json(err)
            }else{
                response.json(result)
            }
        })
    }
})
//get all courses of teacher
router.get('/t',passport.authenticate('jwt',{session:false}),function(request,response){
    course.getTID(request.user.id,function(err,result){
        if(err){
            response.json(err)
        }else{
            response.json(result)
        }
    })
})
//get all courses of student
router.get('/s',passport.authenticate('jwt',{session:false}),function(request,response){
    course.getSID(request.user.id,function(err,result){
        if(err){
            response.json(err)
        }else{
            response.json(result)
        }
    })
})
//adding course
router.post('/',passport.authenticate('jwt',{session:false}),function(request,response){
    course.add(request.user.id,request.body,function(err,result){
        if(err){
            response.json(err)
        }else{
            response.json(request.body)
        }
    })
})
//removing course
router.delete('/',passport.authenticate('jwt',{session:false}),function(request,response){
    course.delete(request.user.id,request.body,function(err,result){
        if(err){
            response.json(err)
        }else{
            response.json(result)
        }
    })
})
//updating status
router.put('/',passport.authenticate('jwt',{session:false}),function(request,response){
    course.update(request.user.id,request.body,function(err,result){
        if(err){
            response.json(err)
        }else{
            response.json(result)
        }
    })
})
//get students status count in whole course
router.get('/CSC',passport.authenticate('jwt',{session:false}),function(request,response){
    course.getCSC(request.user.id,request.body,function(err,result){
        if(err){
            response.json(err)
        }else{
            response.json(result)
        }
    })
})
//get student status count in certain day
router.get('/DSC',passport.authenticate('jwt',{session:false}),function(request,response){
    course.getDSC(request.user.id,request.body,function(err,result){
        if(err){
            response.json(err)
        }else{
            response.json(result)
        }
    })
})
//get course day info for student
router.get('/SDS',passport.authenticate('jwt',{session:false}),function(request,response){
    course.getSDS(request.user.id,request.body,function(err,result){
        if(err){
            response.json(err)
        }else{
            response.json(result)
        }
    })
})
//get name of student with status null in certain day of course
router.post('/LS/',passport.authenticate('jwt',{session:false}),function(request,response){
    course.getLS(request.user.id,request.body,function(err,result){
        if(err){
            response.json(err)
        }else{
            response.json(result)
        }
    })
})
//get names of students with not null status in certain day of course
router.post('/OS/',passport.authenticate('jwt',{session:false}),function(request,response){
    course.getOS(request.user.id,request.body,function(err,result){
        if(err){
            response.json(err)
        }else{
            response.json(result)
        }
    })
})

module.exports = router