const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username:{type:String,unique:true},
    email:{type:String,unique:true},
    password:{type:String,required:true}
})

UserSchema.virtual('ratings',{
    ref:'Rating',
    localField:'_id',
    foreignField:'user'
})
UserSchema.set('toJSON',{virtuals:true})
UserSchema.set('toObject',{virtuals:true})

const User = mongoose.model('User',UserSchema,"users")

module.exports = User
