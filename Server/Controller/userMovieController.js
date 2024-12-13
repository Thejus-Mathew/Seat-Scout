const movies = require("../Model/Admin/MovieSchema")
const theatreList = require("../Model/User/theatreListSchema")


exports.getTheatreForMovie = async (req,res) => {
    try{
        const {movieId}=req.params
        const result = await theatreList.findOne({movieId}).populate({path:'theatres',select:'theatreName city movies'})
        res.status(200).json(result)
    }catch(err){
        console.log("userMovieController/getTheatreForMovie",err);
        res.status(500).json(err)
    }
}
