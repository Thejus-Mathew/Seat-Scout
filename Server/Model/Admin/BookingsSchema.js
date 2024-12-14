const mongoose = require('mongoose')

const bookingsSchemma = mongoose.Schema({
    timeId:{
        type:String,
        required:true
    },
    movieId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "movies",
        required:true
    },
    adminId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Admins",
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "users",
        required:true
    },
    seat:{
        type:[String],
        required:true
    }
})

const bookings = mongoose.model("bookings",bookingsSchemma)

module.exports = bookings