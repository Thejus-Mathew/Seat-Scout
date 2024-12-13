const mongoose = require('mongoose')

const schema = mongoose.Schema({
    movieId:{
        type:String,
        required:true,
        unique:true
    },
    theatres:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admins"
    }]
})

const theatreList = mongoose.model("theatres",schema)

module.exports = theatreList