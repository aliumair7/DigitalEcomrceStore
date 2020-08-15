const { NotExtended } = require("http-errors");

function isadmin(req,res,next){

    if (req.user.role !="admin") return res.status(401).send("you are not authorized user")

    next()
}
module.exports=isadmin