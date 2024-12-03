const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    theatreName:{
        type:"String",
        required:true
    },
    email:{
        type:"String",
        required:true,
        unique:true
    },
    password:{
        type:"String",
        required:true
    },
    movies:{
        type:[Object]
    },
    phone:{
        type:"String"
    },
    pinCode:{
        type:"String"
    },
    address:{
        type:"String"
    },
    landmark:{
        type:"String",
    },
    state:{
        type:"String"
    },
    city:{
        type:"String"
    },
    seats:{
        type:"Object"
    }
})

const admin = mongoose.model("Admins",adminSchema)

module.exports = admin