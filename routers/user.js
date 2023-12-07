
const express = require('express')
const User = require('../models/user')
const authenticateUser = require('../middleware/authenticateUser')
const router = express.Router()

//For a user to sign up
router.post('/register',async (req,res)=>{ 
     /**
      * Example of request body
      * {
      *     "userName":"check123",
      *     "email":"check@gmail.com",
      *     "password":"password12345" [Hashed by app]
      * }
      */

     console.log("Register request received...")

    //Grab the body of the request and turn it into a user
    const user = new User(req.body)

    try
    {
         //Save the user
         const u = await user.save()

         //Put the id in the session
         req.session.user_id = u._id

         //Send the success code
         res.send({success:1, sessionID:req.session.id})
 
    }
    catch(err)
    {
        //Send the failure code
        res.send({success:0, message:"Could not register the user", error:err})
    }
 
 })
 
 router.post('/login',async (req,res)=>{
     /**
      * Example of request body
      * {
      *     "loginName":"check@gmail.com" [this could be email or username],
      *     "password":"password12345" [This will be hashed]
      * }
      */

    //This is an error object that could be sent in multiple situations
    let authErr = {success:0, message:"Invalid Credentials. Please try again."}

     try
     {
        //Find the user by email
        let user = await User.findOne({email:req.body.loginName})
        if(!user)
        { 
           //If the user isn't there, lets get out of here  
           console.log("Auth error: Can't find user by email.")
           console.log("Searching by username...")

           user = await User.findOne({username:req.body.loginName})
           if(!user)
           {
               console.log("Auth error: Can't find user by username.")
               console.log("Sending Auth Error...")
               return res.send(authErr)
           }
        }
 
        const isMatch = (user.password === req.body.password)
        if(!isMatch)
        {
           //If the password doesn't match, we have a problem, so leave the situation.
           console.log("Auth error: Invalid Login")
           return res.send(authErr)
        }

        //Store the user id in the session
        req.session.user_id = user._id

        console.log("Successful Login")
        return res.send({success:1, sessionID:req.session.id})
     } 
     catch(err)
     {
        console.log("Error In login:" + err)
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

 router.get(`/allusers`, async (req,res) => {
      //Grab them all and return them without the password
      const allUsers = await User.find({})
      res.send(allUsers.map((u) => {return {id:u._id, username:u.username, email:u.email}}))
 })

 module.exports = router

 