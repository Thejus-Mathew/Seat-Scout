const bookings = require("../Model/Admin/BookingsSchema")

exports.postBookings = async (req,res)=>{
    try{
        const {timeId,userId,adminId,movieId,seat}=req.body
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
        res.status(200).json(result)
    }catch(err){
        res.status(500).json(err)
    }
}