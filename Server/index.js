require('dotenv').config()
require("./DB/connection")

const express = require('express')
const cors = require('cors')
const path = require('path');


const router = require('./Router/router')
const server = express()


server.use(cors())
server.use(express.json())
server.use(router)
// server.use('/uploads',express.static('./uploads'))
server.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));


const PORT =process.env.PORT || 3000


server.listen(PORT,()=>{
    console.log(`Server started running at http://localhost:${PORT}/`);
})

// server.get("/",(req,res)=>{
//     res.status(200).send("<h1>Server started running</h1>")
// })

server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html')); // Send the main HTML file for all dynamic routes
});