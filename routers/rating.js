const express = require('express')
const User = require('../models/user')
const Rating = require('../models/rating')
const ParkingLot = require('../models/parkingLot')
const authenticateUser = require('../middleware/authenticateUser')
const router = express.Router()

router.post(`/ratings/add`, async (req, res)=>{
    /**
      * Example of request body
      * {
      *     "username":"check123",
      *     "parkingLot":"656570fa7cc587a01cc864f8"
      *     "cleanliness":8
      *     "safety":9
      *     "availability":1
      *     "notes": "This is a nice lot but everyone knows it so it's always full"
      * }
      */

    try 
    {
      const lot = await ParkingLot.findById(req.body.parkingLot)
      const user = await User.find({username:req.body.username})

      if (lot && user)
      {
        const rating = new Rating(req.body)
        const i = await rating.save()
        res.send({success:1})
      }
      else
      {
        res.send({success:0,message:"Either the lot or the user does not exist."})
      }
      
    } 
    catch (err) 
    {
      res.send({success:0,message:"Unable to add rating.", error:err})
    }

    
});

router.delete(`/ratings/delete`, async (req, res)=>{
    /**
     * DO WE NEED THIS?
     * -Maybe they should have to be authenticated before they delete it.
     *  So like you can delete your own ratings but not someone elses.
     *  (Disclaimer: I'm not doing an in app admin)
     * 
      * Example of request body
      * {
      *     "requestorID": "1234567890"
      *     "ratingID": "3456789012"
      * }
      */

    try 
    {
      //Grab the rating and the requestor
      const rating = await Rating.findById(req.body.ratingID)
      const requestor = await User.findById(req.body.requestorID)

      if(!rating)
      {
        return res.send({success:0,message:"Rating doesn't exist"})
      }

      if(rating.username === requestor.username)
      {
        const d = await Rating.deleteOne({id:rating.id})
        // console.log(d)

        if(d && d.acknowledged && deletedCount >= 1)
        {
          res.send({success:1})
        }
        else res.send({success:0, message:"Cannot delete."})
      }
      else
      {
        res.send({success:0,message:"You cannot delete this rating."})
      }
    }
    catch (err)
    {
      res.send({success:0,message:"Cannot delete rating.", error:err})
    }

    
});

router.get(`/ratings/get/:ratingID`, async (req, res)=>{
    /**
      * Query includes
      * ratingID = Object ID of the rating
      * 
      * Returns Individual Rating
      */

    console.log(req.params)

    res.send({success:1,message:"Returning rating..."})
});

router.get(`/ratings/getAll/:lotID`, async (req, res) => {
    /**
      * Params includes
      * lotID = Object ID of the the parking lot that we're grabbing ratings for
      * 
      * Returns array of Ratings objects
      */

    console.log(req.params)

    res.send({success:1,message:"Returning all the ratings for this ID:..."})
})

module.exports = router