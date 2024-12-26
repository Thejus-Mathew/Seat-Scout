const admin = require("../Model/Admin/AdminSchema")
const movies = require('../Model/Admin/MovieSchema')


exports.getAllTheatres = async (req,res) => {
    try{
        const theatres = await admin.find().select("theatreName pinCode address landmark state city")
        res.status(200).json(theatres)
    }catch(err){
        res.status(500).json({err,message:"error in theatreContriollee/getAlltheatres"})
        console.log(err,"error in theatreContriollee/getAlltheatres");
        
    }
}

exports.getATheatre = async (req,res) => {
    try{
        const {theatreId}=req.params
        const theatre = await admin.findOne({_id:theatreId}).select("theatreName pinCode address landmark state city movies seats")
        res.status(200).json(theatre)
    }catch(err){
        res.status(500).json({err,message:"error in theatreContriollee/getAtheatres"})
        console.log(err,"error in theatreContriollee/getAtheatres");
    }
}

exports.getMovieName = async (req,res)=>{
    try{
        const theatres = await movies.find().select("name rated")
        res.status(200).json(theatres)
    }catch(err){
        res.status(500).json({err,message:"error in theatreContriollee/getMovieName"})
        console.log(err,"error in theatreContriollee/getMovieName");
        
    }
}

exports.getTheatreName = async (req,res)=>{
    try{
        const theatres = await admin.find().select("theatreName city")
        res.status(200).json(theatres)
    }catch(err){
        res.status(500).json({err,message:"error in theatreContriollee/getTheatreName"})
        console.log(err,"error in theatreContriollee/getTheatreName");
        
    }
}