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
      *     
      * }
      */

    res.send("Adding rating...")
});

router.post(`/ratings/delete`, async (req, res)=>{
    /**
      * Example of request body
      * {
      *     
      * }
      */

    res.send("Deleting rating...")
});

router.get(`/ratings/get`, async (req, res)=>{
    /**
      * Example of request body
      * {
      *     
      * }
      */

    res.send("Returning rating...")
});

module.exports = router