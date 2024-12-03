const admin = require("../Model/Admin/AdminSchema")
const jsonwebtoken = require('jsonwebtoken')

exports.registerAdmin = async (req,res) => {
    try{
        const {theatreName,email,password}=req.body
        const exitingAdmin = await admin.findOne({email})
        if(exitingAdmin){
            res.status(403).json("Email already registered")
        }else{
            const newAdmin = new admin({theatreName,email,password})
            await newAdmin.save()
            res.status(200).json(newAdmin)
        }
    }catch(err){
        res.status(401).json(err)
    }
}


exports.loginAdmin = async (req,res)=>{
    try{
        const {email,password}=req.body
        const existingAdmin = await admin.findOne({email,password})
        if(existingAdmin){
            const token = jsonwebtoken.sign({userId:existingAdmin._id},process.env.JWTsecret)
            res.status(200).json({existingAdmin,token})
        }else{
            res.status(403).json("Invalid User Credentials")
        }
    }catch(err){
        res.status(500).json(err)
    }
}

exports.updateAdmin = async (req,res)=>{
    try{
        const updated = await admin.findByIdAndUpdate({_id:req.payload},req.body,{new:true})
        res.status(200).json(updated)
    }catch(err){
        res.status(500).json(err)
    }
}