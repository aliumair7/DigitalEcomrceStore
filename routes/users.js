var express = require('express');
var router = express.Router();
var {User}=require('../models/user')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config=require("config")
var nodemailer=require('nodemailer')
var sendgrid=require('nodemailer-sendgrid-transport')
var crypto=require('crypto');
var validateusers=require('../middlewares/uservalidater')
const { isError } = require('@hapi/joi');

const transporter=nodemailer.createTransport(sendgrid({
  auth:{
    api_key:"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"
  }
}))


//get all users
router.get('/',async function(req,res){
  let users=await User.find()
  if (!users) return res.status(400).send("not found data")

 return  res.send(users)
})

//register the user route
router.post('/register',validateusers,async function(req, res) {
  let oneuser=await User.findOne({email:req.body.email})
  if (oneuser){
    return res.status("400").send("User with given email alreday exists")

  }
  
  if(!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password){
    return res.status("401").send("Fill all fields")
  }
  
  let users= new User()
  users.firstname=req.body.firstname;
  users.lastname=req.body.lastname;
  users.email=req.body.email;
  users.password=req.body.password;
  users.password= await bcrypt.hash(req.body.password,10)
    

  await users.save()
  let token=jwt.sign({_id:users._id,firstname:users.firstname,lastname:users.lastname,role:users.role },config.get("jwtPrivateKey"))
  return  res.send(token)
  
});

//login route
router.post('/login',async function(req,res){
  let user=await User.findOne({email:req.body.email})
  if(!req.body.email || !req.body.password) return res.status(400).send("Enter all fields")
if(!user )   return res.status(401).send("Not registred")
let isvalid= await bcrypt.compare(req.body.password,user.password)

if(!isvalid) return res.status(402).send("Not valid password")

let token=jwt.sign({_id:user._id,firstname:user.firstname,lastname:user.lastname,role:user.role,email:user.email },config.get("jwtPrivateKey"))

//reset password
res.send(token)



})


router.post('/reset',async(req,res)=>{
crypto.randomBytes(32,(err,buffer)=>{
  if(err){
    console.log(err)
  }
  const token=buffer.toString('hex')
  User.findOne({email:req.body.email})
  .then(user=>{
    if(!user){
      res.status(400).send("user with given email not exists")
    }
     user.resetToken=token
     user.expireToken=Date.now() +3600000
    
      user.save().then((result)=>{
       transporter.sendMail({
         to:user.email,
         from:"digitalecomrcestore@gmail.com",
         subject:"password reset",
         html:`<p>Your request for password reset</p>
                <h5>click on the <a  href="https://digitalecomrcestore.herokuapp.com/reset/${token}">Link</a> to reset passsowrd</h5>`
         

       })
       res.send("check you email")
     })



  })


})

})


router.post('/new-password',async (req,res)=>{
  newpassword=req.body.password;
  gettoken=req.body.token

  user=await User.findOne({resetToken:gettoken,expireToken:{$gt:Date.now()}})
  if(!user) return res.status(400).send("link expired try again")

   user.passowrd=newpassword
   user.password= await bcrypt.hash(newpassword,10)
   user.resetToken=undefined
   user.expireToken=undefined

   await user.save()
   res.send("password change successfully")
})

module.exports = router;
  