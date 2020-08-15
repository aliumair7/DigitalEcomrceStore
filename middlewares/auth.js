
var jwt=require("jsonwebtoken")
var config=require("config")
var User=require("../models/user")
async function auth(req,res,next){

   let token=req.header("x-auth-token")
   if(!token) return res.status(400).send("Not token provided")
   let user=jwt.verify(token,config.get("jwtPrivateKey"))
   let users=await User.findById(user._id)
   req.user=users;

   next()


}
module.exports =auth;