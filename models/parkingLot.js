const mongoose = require('mongoose')

const ParkingLotSchema = mongoose.Schema({
    entryName:{type:mongoose.Schema.Types.String},
    latitude:{type:mongoose.Schema.Types.Number},
    longitude:{type:mongoose.Schema.Types.Number},
    avgCleanliness:{
        type:mongoose.Schema.Types.Number,
        min:1,
        max:10
    },
    avgSafety:{
        type:mongoose.Schema.Types.Number,
        min:1,
        max:10
    },
    avgAvailibility:{
        type:mongoose.Schema.Types.Number,
        min:1,
        max:10
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
