const Users = require("../Model/User/UserSchema");
const jsonwebtoken = require('jsonwebtoken')

exports.registerUser = async(req,res)=>{
    try{
        const {name,email,password}=req.body
        
        const existinguser = await Users.findOne({email})
        if(existinguser){            
            res.status(401).json("email already registered")
        }else{
            newUser = new Users({name,email,password})
            await newUser.save()
            res.status(201).json(newUser)
        }

    }catch(err){
        console.log("registerUser",err);
        res.status(500).json(err)
    }
}


exports.loginUser = async(req,res)=>{
    try{
        const {email,password}=req.body
        
        const user = await Users.findOne({email,password})
        if(user){     
            const token = jsonwebtoken.sign({userId:user._id},process.env.JWTsecret)
            res.status(200).json({token,name:user.name,profilePic:user.profilePic})
        }else{
            res.status(401).json("Invalid User Credentials")
        }

    }catch(err){    
        console.log("loginUser",err);
        res.status(500).json(err)
    }
}


exports.getUser = async(req,res)=>{
    try{
        const userId=req.payload
        const user = await Users.findOne({_id:userId}).select('-password')
        res.status(200).json(user)
    }catch(err){    
        console.log("getUser",err);
        res.status(500).json(err)
    }
}

exports.updateUser = async(req,res) => {
    try{
        const{name,phone,birthday,gender,married,pincode,address1,address2,landmark,state,city,profilePic} = req.body
        console.log(profilePic);
        
        const uploadImage = req.file?req.file.filename:""
        const userId=req.payload
        let user
        if(uploadImage){
            user = await Users.findByIdAndUpdate(userId,{name,phone,birthday,gender,married,pincode,address1,address2,landmark,state,city,profilePic:uploadImage},{new:true})
        }else{
            user = await Users.findByIdAndUpdate(userId,{name,phone,birthday,gender,married,pincode,address1,address2,landmark,state,city},{new:true})
        }
        res.status(200).json(user)
    }catch(err){
        console.log("updateUser",err);
        res.status(500).json(err)
    }
}