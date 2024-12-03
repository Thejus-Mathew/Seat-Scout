const movies = require("../Model/Admin/MovieSchema")
const theatreList = require("../Model/User/theatreListSchema")

// post movie
exports.postMovie = async (req,res)=>{
    try{
        const {name,rating,format,languages,duration,type,rated,releaseDate,about,cast,crew,poster,cover}=req.body
        const admin = req.payload
        const addMovie = new movies({name,rating,format,languages,duration,type,rated,releaseDate,about,cast,crew,poster,cover,admin})
        await addMovie.save()
        const result2 = new theatreList({movieId:addMovie._id,theatres:[admin]})
        await result2.save()
        res.status(200).json(addMovie)
    }catch(err){
        res.status(500).json(err)
    }
}

// get movies for admin
exports.getMoviesForAdmin = async (req,res) => {
    try{
        const reqBody = req.body;        
        let result = await Promise.all(
            reqBody.map(async (item) => {
                const oneMovie = await movies.findOne({ _id: item.movieId });
                return oneMovie;
            })
        )
        result = result.filter((item)=>item != null)
        res.status(200).json(result)
    }catch(err){        
        res.status(500).json(err)
    }
}

// get a movie
exports.getAMovie = async (req,res)=> {
    try{
        const {movieId}=req.params
        const result = await movies.findOne({_id:movieId})
        res.status(200).json(result)
    }catch(err){
        res.status(401).json(err)
    }
}

// get all movies
exports.getAllMovies = async(req,res)=>{
    try{
        const result = await movies.find()
        res.status(200).json(result)
    }catch(err){
        res.status(401).json(err)
    }
}

// add to thetreLis
exports.addToTheatreList = async(req,res)=>{
    try{
        const {movieId} = req.params
        const theatreId = req.payload
        const data = await theatreList.findOne({movieId})
        let arr = data.theatres
        arr.push(theatreId)        
        const updatedData = {...data,theatres:arr}
        const id = data._id
        const result = await theatreList.findByIdAndUpdate({_id:id},updatedData,{new:true})        
        res.status(200).json("Successfull")
    }catch(err){
        res.status(401).json(err)
    }
}
// remove from thetreLis
exports.removeFromTheatreList = async(req,res)=>{
    try{
        const {movieId} = req.params
        const theatreId = req.payload
        const data = await theatreList.findOne({movieId})
        const d = JSON.parse(JSON.stringify(data))
        const updatedData = {...d,theatres:d.theatres.filter(item=>item!=theatreId)}
        const id = d._id
        const result = await theatreList.findByIdAndUpdate({_id:id},updatedData,{new:true})        
        res.status(200).json("Successfull")
    }catch(err){
        res.status(401).json(err)
    }
}