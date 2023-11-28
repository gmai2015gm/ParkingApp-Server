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
      *     UserID: 1234567890,
      *     Parkinglot:3456789012
      *     Cleanliness:8
      *     Safety:9
      *     Availibility:1
      *     Notes: "This is a nice lot but everyone knows it so it's always full"
      * }
      */

    res.send({success:1,message:"Adding rating..."})
});

router.post(`/ratings/delete`, async (req, res)=>{
    /**
     * DO WE NEED THIS?
     * -Maybe they should have to be authenticated before they delete it.
     *  So like you can delete your own ratings but not someone elses.
     *  (Disclaimer: I'm not doing an in app admin)
     * 
      * Example of request body
      * {
      *     RequestorID: 1234567890
      *     RatingID: 3456789012
      * }
      */

    res.send({success:1,message:"Deleting rating..."})
});

router.get(`/ratings/get`, async (req, res)=>{
    /**
      * Query includes
      * ID = Object ID of the rating
      * 
      * Returns Individual Rating
      */

    res.send({success:1,message:"Returning rating..."})
});

router.get(`/ratings/getAll`, async (req, res) => {
    /**
      * Query includes
      * ID = Object ID of the the parking lot that we're grabbing ratings for
      * 
      * Returns array of Ratings objects
      */

    res.send({success:1,message:"Returning all the ratings for this ID:..."})
})

module.exports = router