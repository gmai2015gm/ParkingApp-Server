
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
      *     password:"password12345" [Hashed by app]
      * }
      */

    //Grab the body of the request
    const user = new User(req.body)
    try
    {
        //Ensure that username and email are not in system
        let userByName = await User.findOne({username:req.body.loginName})
        let userByEmail = await User.findOne({email:req.body.loginName})

        if (userByName)
        {
            console.log("Auth Error: A new user just tried to create an account with an existing username.")
            return res.send({success:0, message: "Username already exists in system."})
        }

        if (userByEmail)
        {
            console.log("Auth Error: A new user just tried to create an account with an existing email.")
            return res.send({success:0, message: "Email already exists in system."})
        }

      //   //Store the hashed password
      //    const hashedPW = await bcrypt.hash(user.password,process.env.BCRYPTNUM)
      //    user.password = hashedPW

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
      * Example of request body
      * {
      *     loginName:"check@gmail.com" [this could be email or username],
      *     password:"password12345" [This will be hashed]
      * }
      */

    //This is an error object that could be sent in multiple situations
    let authErr = {success:0, message:"Invalid Credentials. Please try again."}

     try
     {
        //Find the user by email
        const user = await User.findOne({email:req.body.loginName})
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
 
        const isMatch = (user.password === req.body.password)//await bcrypt.compare(req.body.password,user.password)
        if(!isMatch)
        {
           //If the password doesn't match, we have a problem, so leave the situation.
           console.log("Auth error: Invalid Login")
           return res.send(authErr)
        }
        req.session.user_id = user._id
        return res.send({success:1})
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

 module.exports = router

 