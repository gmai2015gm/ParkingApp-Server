const User = require('../models/user')

async function authenticateUser(req,res,next){
    if(!req.session.user_id){
        console.log("This page requires authentication")
        return res.send({success:0, message:"This call requires authentication"})

    }
    req.user = await User.findById(req.session.user_id)

    next()
}

module.exports= authenticateUser