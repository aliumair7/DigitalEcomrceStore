var express = require('express');
var {Product,validate}=require('../models/product')
var multer=require('multer');
const app = require('../app');
var auth=require('../middlewares/auth')
var isadmin=require("../middlewares/isadmin")

const Order=require('../models/oredrs')
const config=require('config')
const nodemailer=require('nodemailer')
const sendgrid=require('nodemailer-sendgrid-transport')
const validaters=require('../middlewares/validate')



//create transporter for sending mails
const transporter=nodemailer.createTransport(sendgrid({
  auth:{
    api_key:"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"
  }
}))

const stripe=require('stripe')(config.get('stripekey'))// stripe key
var router = express.Router();


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname)
  }
});

const fileFilter=(req, file, cb)=>{
 if(file.mimetype ==='image/jpeg' || file.mimetype ==='image/jpg' || file.mimetype ==='image/png'){
     cb(null,true);
 }else{
     cb(null, false);
 }

}

var upload = multer({ 
  storage:storage,
  limits:{
      fileSize: 1024 * 1024 * 5
  },
  fileFilter:fileFilter
});



/* GET all products */
router.get('/',async function(req, res) {
    let page=Number( req.query.page ? req.query.page:10); 
  let perPage=Number (req.query.perPage ? req.query.perPage :2);
  let skippage= (page-1)*perPage
  let products=await Product.find().skip(skippage).limit(perPage)
   let total=await Product.countDocuments()
  res.send({total,products})
});
//post all new products by cloudinary
router.post('/',validaters,async function(req,res){
  const {name,price,details,photo} = req.body 
   if(!name || !price || !details || !photo){
      return  res.status("400").send("Plase add all the fields")
    }
  
    
    const post = new Product()
    post.name=req.body.name
    post.price=req.body.price
    post.details=req.body.details
    post.photo=req.body.photo
    
     await post.save()
      
      res.send("Data saved successfully ")

})



//post new products with multer
/*router.post('/newproduct',upload.single('photo'), async function(req, res) {
    
    var products=new Product()
    products.name=req.body.name;
    products.price=req.body.price;
    products.details=req.body.details;
    products.photo=req.file.path
    
     await products.save()

    res.send(products)
  });


*/
//delte products
  router.delete('/:id',async function(req, res) {
    let products=await Product.findByIdAndDelete(req.params.id)
    res.send("Delete Successfully")
  });
  
  //update products

  /*router.put('/updates/:id',upload.single('photo'),async function(req, res) {
    let products=await Product.findById(req.params.id)
    products.name=req.body.name;
    products.price=req.body.price;
    products.details=req.body.details;
    products.photo=req.file.path;

    await products.save()

    
    res.send(products)
  });*/

  //update by using cloudinary for img
  router.put('/updates/:id',async function(req, res) {
    let products=await Product.findById(req.params.id)
    products.name=req.body.name;
    products.price=req.body.price;
    products.details=req.body.details;
    products.photo=req.body.image;

    await products.save()

    
    
    res.send("Update successfully")
  });



  //set cookies with carts
router.get('/carts/:id',async function(req,res){
  let products=await Product.findById(req.params.id)
  let cart=[]
  if(req.cookies.carts) cart=req.cookies.carts;
  cart.push(products)
  res.cookie("carts",cart)
  res.send(cart)
})


//delete carts from cookies
router.get('/carts/remove/:id',async function(req,res){
  let cart=[]
  if(req.cookies.carts) cart=req.cookies.carts;
  cart.splice(
      cart.findIndex((c)=>c._id ==req.params.id),1
  )
  res.cookie("carts",cart)
  res.send(cart)
})

/* stripe post method and also save data in order table  and send email to buyer*/ 
router.post('/payment',async (req,res)=>{
   console.log(req.body.amount)
   const{amount,token,products}=req.body;
   let orders=new Order()
  orders.email=token.email;
  orders.amount=amount;
  orders.name=token.card.name;
  orders.cardNo=token.card.last4;
  orders.city=token.card.address_city;
  orders.brand=token.card.brand;
  orders.country=token.card.address_country;
  orders.products=req.body.products

  await orders.save().then(orders =>{
    transporter.sendMail({
      to:token.email,
      from:"digitalecomrcestore@gmail.com",
      subject:"Your order Placed on Digital Ecomrce Store ",
      html:`<h2> You order has been placed <p>against this id ${orders._id} on DigitalEcomrce Store</p>`

    })
    res.send(orders)
  })
  

    

   stripe.customers.create({
    email: token.email,
    source: token.id
  })
    .then(customer => {
      stripe.charges.create({
        amount:parseInt(amount*100),
        currency: 'pkr',
        customer:customer.id,
        receipt_email:token.email,
        
      })
    }).then(result => res.status(200).send(result))
      .catch(err =>  res.status("401").send("Unsuccessfull payment"))



  
})

//get single product by id
router.get('/:id',async function(req,res){
  let product=await Product.findById(req.params.id)
  res.send(product)
})


module.exports = router;
