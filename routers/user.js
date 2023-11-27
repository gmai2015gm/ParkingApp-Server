
const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const authenticateUser = require('../middleware/authenticateUser')
const router = express.Router()

//For a user to sign up
router.post('/register',async (req,res)=>{ 
     /**
      * Example of request body
      * {
      *     userName:"check123",
      *     email:"check@gmail.com",
      *     password:"password12345"
      * }
      */

    //Grab the body of the request
    const user = new User(req.body)
    try
    {
        //Store the hashed password
         const hashedPW = await bcrypt.hash(user.password,process.env.BCRYPTNUM)
         user.password = hashedPW

         //Save the user
         const u = await user.save()

         //Put the id in the session
         req.session.user_id = u._id

         //Send the success code
         res.send({success:1})
 
    }
    catch(err)
    {
        //Send the failure code
        res.send({success:0, message:"Could not register the user", error:err})
    }
 
 })
 
 router.post('/login',async (req,res)=>{
     /**
      * Example of request body (NEEDS CONFIRMED)
      * {
      *     email:"check@gmail.com",
      *     password:"password12345"
      * }
      */

    //This is an error object that could be sent in multiple situations
    let authErr = {success:0, message:"Invalid Credentials. Please try again."}

     try
     {
        //Find the user
        const user = await User.findOne({email:req.body.email})
        if(!user)
        { 
           //If the user isn't there, lets get out of here  
           console.log("Auth error")
           return res.send(authErr)
        }
 
        const isMatch = await bcrypt.compare(req.body.password,user.password)
        if(!isMatch)
        {
           //If the password doesn't match, we have a problem, so leave the situation.
           console.log("Auth error")
           return res.send(authErr)
        }
        req.session.user_id = user._id
        return res.send({success:1})

 
     } 
     catch(err)
     {
        console.log("Login error")
        return res.send({success:0, message:"Could not login.", error:err})
     }
 })
 
 router.post('/logout',authenticateUser,(req,res)=>{
     req.session.destroy(()=>
     {
        console.log('Logged out successfully')
        return res.send({success:1})
     })
 })

 module.exports = router

 