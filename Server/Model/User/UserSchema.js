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
    },
    married: {
        type: Boolean,
    },
    pincode:{
        type:String,
        default:""
    },
    address1:{
        type:String,
        default:""
    },
    address2:{
        type:String,
        default:""
    },
    landmark:{
        type:String,
        default:""
    },
    state:{
        type:String,
        default:""
    },
    city:{
        type:String,
        default:""
    },
    profilePic:{
        type:String,
        default:""
    }
})

const Users = mongoose.model("users",userSchema)

module.exports = Users