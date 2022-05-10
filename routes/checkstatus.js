const express = require('express')
const router = express.Router()
const status = require('../models/status_model')

let date_ob = new Date()

let date = (date_ob.getDate())
console.log(date)

module.exports = router