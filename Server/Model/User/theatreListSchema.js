const mongoose = require('mongoose')

const schema = mongoose.Schema({
    movieId:{
        type:String,
        required:true,
        unique:true
    },
    theatres:{
        type:[String]
    }
})

const theatreList = mongoose.model("theatres",schema)

module.exports = theatreList