const express = require('express')
const router = express.Router()
const teacher = require('../models/teacher_model')

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
router.post('/',function(request,response){
    teacher.add(request.body,function(err,result){
        if(err){
            response.json(err)
        }else{
            response.json(request.body)
        }
    })
})
router.delete('/:id',function(request,response){
    teacher.delete(request.params.id,function(err,result){
        if(err){
            response.json(err)
        }else{
            response.json(result)
        }
    })
})
router.put('/:id',function(request,response){
    teacher.update(request.params.id,function(err,result){
        if(err){
            response.json(err)
        }else{
            response.json(result)
        }
    })
})

module.exports = router