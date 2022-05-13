const express = require('express')
const router = express.Router()
const course = require('../models/course_model')

//get course by id or all courses
router.get('/:id?',function(request,response){
    if(request.params.id){
        course.getById(request.params.id,function(err,result){
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
router.get('/t/:id',function(request,response){
    course.getTID(request.params.id,function(err,result){
        if(err){
            response.json(err)
        }else{
            response.json(result)
        }
    })
})
//get all courses of student
router.get('/s/:id',function(request,response){
    course.getSID(request.params.id,function(err,result){
        if(err){
            response.json(err)
        }else{
            response.json(result)
        }
    })
})
//adding course
router.post('/',function(request,response){
    course.add(request.body,function(err,result){
        if(err){
            response.json(err)
        }else{
            response.json(request.body)
        }
    })
})
//removing course
router.delete('/:id',function(request,response){
    course.delete(request.params.id,request.body,function(err,result){
        if(err){
            response.json(err)
        }else{
            response.json(result)
        }
    })
})
//updating status
router.put('/:id',function(request,response){
    course.update(request.params.id,request.body,function(err,result){
        if(err){
            response.json(err)
        }else{
            response.json(result)
        }
    })
})
//get students status count in whole course
router.get('/CSC/:id',function(request,response){
    course.getCSC(request.params.id,request.body,function(err,result){
        if(err){
            response.json(err)
        }else{
            response.json(result)
        }
    })
})
//get student status count in certain day
router.get('/DSC/:id',function(request,response){
    course.getDSC(request.params.id,request.body,function(err,result){
        if(err){
            response.json(err)
        }else{
            response.json(result)
        }
    })
})
//get course day info for student
router.get('/SDS/:id',function(request,response){
    course.getSDS(request.params.id,request.body,function(err,result){
        if(err){
            response.json(err)
        }else{
            response.json(result)
        }
    })
})
//get name of student with status null in certain day of course
router.post('/LS/',function(request,response){
    course.getLS(request.body,function(err,result){
        if(err){
            response.json(err)
        }else{
            response.json(result)
        }
    })
})
//get names of students with not null status in certain day of course
router.post('/OS/',function(request,response){
    course.getOS(request.body,function(err,result){
        if(err){
            response.json(err)
        }else{
            response.json(result)
        }
    })
})

module.exports = router