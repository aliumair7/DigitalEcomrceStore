var express = require('express');
var {Product,validate}=require('../models/product')
var Cart=require('../models/cart')


var router = express.Router();

//get all carts products
router.get('/',async function(req, res) {
    let cartsproducts=await Cart.find()
   res.send(cartsproducts)
   });

   //remove everything from cart table
router.get('/cartsallremove',async function(req,res){
    let removeall=await Cart.remove({})
    res.send(removeall)
    })


  //delete carts products
router.delete('/delcarts/:id',async function(req, res) {
    let products=await Cart.findByIdAndDelete(req.params.id)
    res.send("Delete successfully cart item")
  });


  // increase quantity in carts
router.put('/cartqtyinc/:id',async function(req,res){
    let product=await Cart.findById(req.params.id)
    product.quantity=product.quantity+1
    await product.save()
    res.send(product)
  })
  //decrease  quantity in carts
  router.put('/cartqtydec/:id',async function(req,res){
    let product=await Cart.findById(req.params.id)
    product.quantity=product.quantity-1
    await product.save()
    res.send(product)
  })
  
  /* Add products to cart */
  router.post('/:id',async function(req,res){
   let Products=await Product.findById(req.params.id);
    const carts=new Cart()
    carts.name=Products.name;
    carts.price=Products.price;
    carts.quantity=Products.quantity;

    await carts.save()
    console.log(carts)
     res.send(carts)
  
  })




  module.exports=router;