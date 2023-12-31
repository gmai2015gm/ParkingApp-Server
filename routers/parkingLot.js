const express = require('express')
const User = require('../models/user')
const Rating = require('../models/rating')
const ParkingLot = require('../models/parkingLot')
const authenticateUser = require('../middleware/authenticateUser')
const router = express.Router()

router.post(`/lots/add`,authenticateUser, async (req, res)=>{
    /**
      * Example of request body
      * {
      *     entryName:"Random Lot #425"
      *     latitude:36.2456789
      *     longitude: 48.3217895
      * }
      */

    const newLot = new ParkingLot(req.body)
    try 
    {
      //Save the lot and and return the ID and the success code
        const l = await newLot.save()
        res.send({success:1, lotID:l.id})
    }
    catch (err) 
    {
      //Log the error and send the fail code
        console.log("Error creating Parking lot -- " + err)
        res.send({success:0})
    }
});

router.delete(`/lots/delete/:lotID`,authenticateUser, async (req, res)=>{
    /**
      * Example of request body
      * {
      *     id:(The objectID)
      * }
      */

    const r = await Rating.deleteMany({parkingLot:req.params.lotID})

    //Try to delete the thing
    const d = await ParkingLot.deleteOne({_id:req.params.lotID})

    //Did it work and did it find anything?
    if(d.acknowledged && d.deletedCount > 0)
    {
      res.send({success:1})
    }
    //Did it work?
    else if(d.acknowledged)
    {
      res.send({success:0, message:"No lot found to delete."})
    }

    
});


router.get(`/lots/search`,authenticateUser, async (req, res)=>{
    /**
      * Query needs to contain:
      * - term : a string
      */

    //Find the thing
    try 
    {
      //Return the thing
      const results = await ParkingLot.find({entryName:{$regex : req.query.term}})
      res.send({success:1, results:results})
    } 
    catch (err) 
    {
      //On the off chance that thing messes up,
      //we need to inform the user and bail.
      res.send({success:0, message:"Found Nothing"})
    }
    
});

router.get(`/lots`,authenticateUser, async (req, res)=>{

  const l = await ParkingLot.find({})

  if(l) //Make sure that something exists
  {
    if(l.length > 0) //Make sure that there are actual items there.
    {
      //Send it back
      res.send({success:1, lots:l})
      return
    }
  }
  
  //Welp, If we've made it this far, we got nothin. 
  //So tell the user.
  res.send({success:0, message:"Found Nothing"})  
});

router.get(`/lots/:lotID`,authenticateUser, async (req, res)=>{
    /**
      * Example of params
      * -lotID : the object ID of the lot
      */

    try 
    {
      //Find the lot
      const l = await ParkingLot.findById(req.params.lotID)
      res.send({success:1, lot:l})
    } 
    catch (err) 
    {
      //If we got here, something doesn't exist.
      res.send({success:0, message:"Could not find by that ID."})
    }
});

module.exports = router