const express = require('express')
const ParkingLot = require('../models/parkingLot')
const authenticateUser = require('../middleware/authenticateUser')
const router = express.Router()

router.post(`/lots/add`, async (req, res)=>{

});

router.post(`/lots/delete`, async (req, res)=>{

});

router.get(`/lots/get`, async (req, res)=>{

});

module.exports = router