var mongoose=require('mongoose')
var Joi = require('@hapi/joi');
const { number } = require('@hapi/joi');

var product_schema=new mongoose.Schema({
    name:String,
    price:Number,
    details:String,
    photo:String,
    quantity:{
        type:Number,
        default:1,
    }
})
function vaidateproduct(data){
    const schema=Joi.object({
        name:Joi.string().min(3).max(15).required(),
        price:Joi.number().min(0).required(),
        details:Joi.string().min(3),
        photo:Joi.string()
    })
    return schema.validate(data,{abortEarly:false})
}

var product_model= mongoose.model("products",product_schema)
module.exports.validate=vaidateproduct;
module.exports.Product = product_model;