const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
    name:{
        type:"String",
        required:true
    },
    rating:{
        type:"String",
        required:true
    },
    format:{
        type:[String],
        required:true
    },
    languages:{
        type:[String],
        required:true
    },
    duration:{
        type:"String",
        required:true
    },
    type:{
        type:[String],
        required:true
    },
    rated:{
        type:"String",
        required:true
    },
    releaseDate:{
        type:"String",
        required:true
    },
    about:{
        type:"String",
        required:true
    },
      cast:{
        type:[String],
        required:true
    },
      crew:{
        type:[String],
        required:true
    },
    poster:{
        type:String,
        required:true
    },
    cover:{
        type:"String",
        required:true
    },
    admin:{
        type:"String",
        required:true
    }
})

const movies = mongoose.model("movies",movieSchema)

module.exports = movies