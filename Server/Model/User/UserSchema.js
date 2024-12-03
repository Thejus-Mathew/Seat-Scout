const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
    },
    birthday:{
        type:Date,
    },
    gender: {
        type: Boolean,
        default: null
    },
    married: {
        type: Boolean,
        default: null
    },
    pincode:{
        type:String,
    },
    address1:{
        type:String,
    },
    address2:{
        type:String,
    },
    landmark:{
        type:String,
    },
    state:{
        type:String,
    },
    city:{
        type:String,
    },
    profilePic:{
        type:String,
        default:""
    }
})

const Users = mongoose.model("users",userSchema)

module.exports = Users