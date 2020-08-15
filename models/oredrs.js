const mongoose=require('mongoose');
const { array } = require('@hapi/joi');

var schema_order=mongoose.Schema({
    email:String,
    name:String,
    cardNo:Number,
    city:String,
    country:String,
    amount:Number,
    brand:String,
    products:Array,
    Date:{
        type:Date,
        default:Date.now()

    }


})

var order_model=mongoose.model("Orders",schema_order)
module.exports=order_model;