var express = require('express');
const Order=require('../models/oredrs')



var router = express.Router();






//get by date last 4 days

router.get('/fourdays',async function(req,res){

  let pro=await Order.aggregate([
    {$match: { 'Date':{
      $gte: new Date((new Date().getTime() - (30 * 24 * 60 * 60 * 1000)))
  } }},
    {$project: { _id: 0, products: 1 } },
    {$unwind: "$products" },
    {$group: { _id: "$products", quantity: { $sum: "$quantity" } }},
    {$project: { _id: 0,products: "$_id", quantity: 1 } },
    {$sort: { tags: -1 } }
  ])
  res.send(pro)

})



//get all data to orders

router.get('/getorders',async function(req,res){
    let all_products=await Order.find().sort({Date:-1})
  
    res.send(all_products)
  
  })
  //get specfic order in last month or last 15 days
  router.get('/getspecificorders',async (req,res)=>{
  
    let speci_orders=await Order.find({'Date':{
      $gte: new Date((new Date().getTime() - (2 * 24 * 60 * 60 * 1000)))
  }}).sort({Date:-1})
  res.send(speci_orders)
  })
  
  //get total amount deposit last day
  router.get('/getlastdaydeposit',async (req,res)=>{
   let lastsales=await Order.find({'Date':{
    $gte: new Date((new Date().getTime() - (1 * 12 * 60 * 60 * 1000)))
  }})
  
   res.send(lastsales)
  
  })
  //get total amount last 10 days
  
  router.get('/gettendaydeposit',async (req,res)=>{
    let lastsales=await Order.find({'Date':{
     $gte: new Date((new Date().getTime() - (10 * 12 * 60 * 60 * 1000)))
   }})
   
    res.send(lastsales)
   
   })
  
  //get total amount last 20 days
  router.get('/gettewenty',async (req,res)=>{
    let lastsales=await Order.find({'Date':{
     $gte: new Date((new Date().getTime() - (20 * 12 * 60 * 60 * 1000)))
   }})
   
    res.send(lastsales)
   
   })
  
   //get total last 30
   router.get('/getthirty',async (req,res)=>{
    let lastsales=await Order.find({'Date':{
     $gte: new Date((new Date().getTime() - (30 * 12 * 60 * 60 * 1000)))
   }})
   
    res.send(lastsales)
   
   })
   //get total last 40 days
   router.get('/getforty',async (req,res)=>{
    let lastsales=await Order.find({'Date':{
     $gte: new Date((new Date().getTime() - (40 * 12 * 60 * 60 * 1000)))
   }})
   
    res.send(lastsales)
   
   })
   //get total last 50 days
   router.get('/getfifty',async (req,res)=>{
    let lastsales=await Order.find({'Date':{
     $gte: new Date((new Date().getTime() - (50 * 12 * 60 * 60 * 1000)))
   }})
   
    res.send(lastsales)
   
   })
  
   // get total last 60 days
  
   router.get('/getsixety',async (req,res)=>{
    let lastsales=await Order.find({'Date':{
     $gte: new Date((new Date().getTime() - (60 * 12 * 60 * 60 * 1000)))
   }})
   
    res.send(lastsales)
   
   })
  
  
  
  
  
  module.exports=router;