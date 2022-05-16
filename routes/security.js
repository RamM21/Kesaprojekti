const express = require('express')
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
