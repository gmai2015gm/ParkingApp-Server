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
      *     "UserName":"check123",
      *     "ParkinglotID":3456789012
      *     "Cleanliness":8
      *     "Safety":9
      *     "Availibility":1
      *     "Notes": "This is a nice lot but everyone knows it so it's always full"
      * }
      */
    console.log(req.body)

    res.send({success:1,message:"Adding rating..."})
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
      *     "RequestorID": 1234567890
      *     "RatingID": 3456789012
      * }
      */

    console.log(req.body)

    res.send({success:1,message:"Deleting rating..."})
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