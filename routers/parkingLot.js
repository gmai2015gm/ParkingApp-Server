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

    console.log(req.body)

    res.send({success:1,message:"Adding lot..."})
});

router.delete(`/lots/delete`, async (req, res)=>{
    /**
      * Example of request body
      * {
      *     id:(The objectID)
      * }
      */



    res.send({success:1,message:"Deleting lot..."})
});


router.get(`/lots/search`, async (req, res)=>{
    /**
      * Query needs to contain:
      * - searchString : a string
      */
    
    console.log(req.query)

    res.send({success:1,message:"Searching lot..."})
});


router.get(`/lots/:lotID`, async (req, res)=>{
    /**
      * Example of params
      * -lotID : the object ID of the lot
      */
    console.log(req.params)

    res.send({success:1,message:"Returning lot..."})
});

module.exports = router