const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username:{type:String,unique:true},
    password:{type:String,required:true}
})

const User = mongoose.model('User',UserSchema,"users")

module.exports = User
