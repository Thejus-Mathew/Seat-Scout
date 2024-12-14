const bookings = require("../Model/Admin/BookingsSchema")
const mongoose = require('mongoose')

exports.postBookings = async (req,res)=>{
    try{
        const {timeId,adminId,movieId,seat}=req.body
        const userId=req.payload
        const newSeat = new bookings({timeId,userId,adminId,movieId,seat})
        await newSeat.save()
        res.status(200).json(newSeat)
    }catch(err){
        res.status(500).json(err)
    }
}

exports.getBookings = async (req,res)=>{
    try{
        const {adminId,movieId,timeId}=req.params
        const seats = await bookings.find({movieId,adminId,timeId})
        result=seats.map(item=>item.seat)
        
        res.status(200).json(result.flat())
    }catch(err){
        res.status(500).json(err)
    }
}

exports.getBookingsForUser = async (req,res)=>{
    try{
        const userId = new mongoose.Types.ObjectId(req.payload)
        console.log(userId);
        
        const result = await bookings.aggregate([
            { "$match": { userId } },
            {"$lookup":{
                "from":"admins",
                "localField":"adminId",
                "foreignField":"_id",
                "as":"adminId",
                "pipeline":[
                    {
                        "$project":{
                            "_id":0,
                            "theatreName":1,
                            "city":1,
                        }
                    }
                ]
            }},
            {"$lookup":{
                "from":"movies",
                "localField":"movieId",
                "foreignField":"_id",
                "as":"movieId",
                "pipeline":[
                    {
                        "$project":{
                            "_id":0,
                            "name":1,
                            "poster":1,
                            "cover":1,
                            "releaseDate":1,
                        }
                    }
                ]
            }},
        ])  
        res.status(200).json(result)
    }catch(err){
        console.log(err);
        
        res.status(500).json(err)
    }
}