const express = require('express')
const User = require('../models/user')
const Rating = require('../models/rating')
const ParkingLot = require('../models/parkingLot')
const authenticateUser = require('../middleware/authenticateUser')
const router = express.Router()

router.post(`/ratings/add`, async (req, res)=>{

});

router.post(`/ratings/delete`, async (req, res)=>{

});

router.get(`/ratings/get`, async (req, res)=>{

});

module.exports = router