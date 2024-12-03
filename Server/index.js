require('dotenv').config()
require("./DB/connection")

const express = require('express')
const cors = require('cors')


const router = require('./Router/router')
const server = express()


server.use(cors())
server.use(express.json())
server.use(router)
server.use('/uploads',express.static('./uploads'))


const PORT = 3000


server.listen(PORT,()=>{
    console.log("Server started running at http://localhost:3000/");
})

server.get("/",(req,res)=>{
    res.status(200).send("<h1>Server started running</h1>")
})