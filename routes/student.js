const express = require('express')
const { request, response } = require('../app')
const router = express.Router()
const student = require('../models/student_model')

router.get('/:id?',function(req,res){
    if(req.params.id){
        student.getById(req.params.id,function(err,result){
            if(err){
                res.json(err)
            }else{
                res.json(result)
            }
        })
    }else{
        student.get(function(err,result){
            if(err){
                res.json(err)
            }else{
                res.json(result)
            }
        })
    }
})
router.post('/',function(req,res){
    student.add(req.body,function(err,count){
        if(err){
            res.json(err)
        }else{
            res.json(req.body)
        }
    })
})
router.delete('/:id',function(req,res){
    student.delete(req.params.id,function(err,count){
        if(err){
            res.json(err)
        }else{
            res.json(count)
        }
    })
})
router.put('/:id',function(req,res){
    student.update(req.params.id,req.body,function(err,result){
        if(err){
            res.json(err)
        }else{
            res.json(result)
        }
    })
})

module.exports = router