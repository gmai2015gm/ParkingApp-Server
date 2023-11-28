const express = require('express')
const ParkingLot = require('../models/parkingLot')
const authenticateUser = require('../middleware/authenticateUser')
const router = express.Router()

router.post(`/lots/add`, async (req, res)=>{
    /**
      * Example of request body
      * {
      *     entryName:"Random Lot #425"
      *     latitude:36.2456789
      *     longitude: 48.3217895
      * }
      */

    res.send({success:1,message:"Adding lot..."})
});

router.post(`/lots/delete`, async (req, res)=>{
    /**
      * Example of request body
      * {
      *     _id:(The objectID)
      * }
      */

    res.send({success:1,message:"Deleting lot..."})
});

router.get(`/lots/get`, async (req, res)=>{
    /**
      * Example of request body
      * {
      *     _id:(The objectID)
      * }
      */

    res.send({success:1,message:"Returning lot..."})
});

router.get(`/lots/search`, async (req, res)=>{
    /**
      * Query needs to contain:
      * - searchString : a string
      */

    res.send({success:1,message:"Searching lot..."})
});

module.exports = router