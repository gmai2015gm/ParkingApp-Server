const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    email:{type:String,unique:true},
    username:{type:String,unique:true},
    password:{type:String,required:true}
})

const User = mongoose.model('User',UserSchema,"users")

module.exports = User
