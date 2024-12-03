const jsonwebtoken = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    try{       
        const token = req.headers["authorization"].split(" ")[1]
        if(token){
            const jwtResponse = jsonwebtoken.verify(token,process.env.JWTsecret)
            req.payload = jwtResponse.userId
            next()
        }else{
            res.status(403).json("Please Login")
        }
    }catch(err){
        res.status(401).json(err)
    }
}

module.exports = jwtMiddleware