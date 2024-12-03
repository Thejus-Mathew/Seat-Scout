const mongoose = require('mongoose')

const bookingsSchemma = mongoose.Schema({
    timeId:{
        type:String,
        required:true
    },
    movieId:{
        type:String,
        required:true
    },
    adminId:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    seat:{
        type:String,
        required:true
    }
})

const bookings = mongoose.model("bookings",bookingsSchemma)

module.exports = bookings