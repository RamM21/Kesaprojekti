const express = require('express')
const router = express.Router()
const student = require('../models/student_model')

//get all students or student by id
router.get('/:id?',function(request,response){
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
router.delete('/:id',function(request,response){
    student.delete(request.params.id,function(err,count){
        if(err){
            response.json(err)
        }else{
            response.json(count)
        }
    })
})
//update student
router.put('/:id',function(request,response){
    student.update(request.params.id,request.body,function(err,result){
        if(err){
            response.json(err)
        }else{
            response.json(result)
        }
    })
})

module.exports = router