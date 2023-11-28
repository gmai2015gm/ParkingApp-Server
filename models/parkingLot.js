const mongoose = require('mongoose')

const ParkingLotSchema = mongoose.Schema({
    entryName:{
        type:mongoose.Schema.Types.String,
        required:true,
        unique:true
    },
    latitude:{
        type:mongoose.Schema.Types.Number,
        required:true
    },
    longitude:{
        type:mongoose.Schema.Types.Number,
        required:true
    },
    avgCleanliness:{
        type:mongoose.Schema.Types.Number,
        min:0,
        max:10,
        default:0
    },
    avgSafety:{
        type:mongoose.Schema.Types.Number,
        min:0,
        max:10,
        default:0
    },
    avgAvailibility:{
        type:mongoose.Schema.Types.Number,
        min:0,
        max:10,
        default:0
    }
})

ParkingLotSchema.virtual('ratings',{
    ref:'Rating',
    localField:'_id',
    foreignField:'parkingLot'
})
ParkingLotSchema.set('toJSON',{virtuals:true})
ParkingLotSchema.set('toObject',{virtuals:true})

const ParkingLot = mongoose.model('ParkingLot',ParkingLotSchema,"parkingLots")

module.exports = ParkingLot
