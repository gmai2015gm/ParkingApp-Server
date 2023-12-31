const mongoose = require('mongoose')

const RatingSchema = mongoose.Schema({
    username:{
        type:mongoose.Schema.Types.String
    },
    parkingLot:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ParkingLot'
    },
    cleanliness:{
        type:mongoose.Schema.Types.Number,
        min:1,
        max:10
    },
    safety:{
        type:mongoose.Schema.Types.Number,
        min:1,
        max:10
    },
    availability:{
        type:mongoose.Schema.Types.Number,
        min:1,
        max:10
    },
    notes:{
        type:mongoose.Schema.Types.String,
        maxLength:2000
    },
    timestamp: { 
        type:Date,
        default:Date.now
    }
})

const Rating = mongoose.model('Rating',RatingSchema,"ratings")

module.exports = Rating
