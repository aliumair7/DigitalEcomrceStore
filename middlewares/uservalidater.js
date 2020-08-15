var {Validate}=require("../models/user")
async function uservalidater(req,res,next){
    let {error}= await Validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    next()

}
module.exports=uservalidater;