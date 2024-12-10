const express = require('express')
const { registerAdmin, loginAdmin, updateAdmin } = require('../Controller/adminController')
const jwtMiddleware = require('../MiddleWare/jwtMiddleWare')
const { postMovie, getMoviesForAdmin, getAMovie, getAllMovies, addToTheatreList, removeFromTheatreList } = require('../Controller/adminMovieController')
const { postBookings, getBookings } = require('../Controller/bookingsController')
const { registerUser, loginUser, getUser, updateUser } = require('../Controller/userController')
const multerConfig = require('../MiddleWare/multerMiddleware')
const router = express.Router()



// register admin
router.post("/adminRegister",registerAdmin)

// login admin
router.post('/adminLogin',loginAdmin)

// update admin
router.put('/adminUpdate',jwtMiddleware,updateAdmin)

// post movie
router.post('/addMovie',jwtMiddleware,postMovie)

//get movie for admin
router.post('/adminMovie',jwtMiddleware,getMoviesForAdmin)

// get a movie
router.get('/getAMovie/:movieId',getAMovie)

// post booking
router.post('/booking/',jwtMiddleware,postBookings)

// get booking
router.get('/booking/:adminId/:movieId/:timeId',jwtMiddleware,getBookings)

// get all movies
router.get('/getAllMovies',getAllMovies)

// add to theatreList
router.put('/addToTheatreList/:movieId',jwtMiddleware,addToTheatreList)

// remove from theatreList
router.put('/removeFromTheatreList/:movieId',jwtMiddleware,removeFromTheatreList)


// user routes --------------------------------------------------------------------------

// register user
router.post('/registerUser',registerUser)

// login user
router.post('/loginUser',loginUser)

// get user details
router.get('/getUser',jwtMiddleware,getUser)

// update user details
router.put('/updateUser',jwtMiddleware,multerConfig.single('profilePic'),updateUser)


module.exports = router