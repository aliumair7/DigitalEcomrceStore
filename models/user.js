var mongoose=require('mongoose')
const { unsubscribe } = require('../app')
var Joi = require('@hapi/joi');
const PasswordComplexity = require("joi-password-complexity");
var user_schema=new mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    password:String,
    role:{
        type:String,
        default:"user",
    },
    Date:{
        type:Date,
        default:Date.now()

    },
    resetToken:String,
    expireToken:Date


})
function validateuser(data){
    const schema=Joi.object({
        firstname:Joi.string().min(3).max(8).required(),
        lastname:Joi.string().min(3).max(8).required(),
        email:Joi.string().min(5).max(40).required().email(),
        password:Joi.string().min(5).max(5).lowercase().uppercase().required(),
        
    })
    return schema.validate(data,{abortEarly:false})
}

var user_model=mongoose.model("users",user_schema)

module.exports.Validate=validateuser;
module.exports.User =user_model;
