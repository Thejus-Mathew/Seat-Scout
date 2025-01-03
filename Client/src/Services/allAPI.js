import { commonAPI } from "./commonAPI";
import { serverURL } from "./serverURL";


// register admin
export const registerAdminAPI = async (reqBody)=>{
    return await commonAPI("POST",`${serverURL}/adminRegister`,reqBody,"")
}

// login admin
export const loginAdminAPI = async (reqBody)=>{
    return await commonAPI("POST",`${serverURL}/adminLogin`,reqBody,"")
}

// update admin
export const updateAdminAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${serverURL}/adminUpdate`,reqBody,reqHeader)
}

// add movie
export const addMovieAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${serverURL}/addMovie`,reqBody,reqHeader)
}

//get movies for admin
export const getMoviesAdminAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${serverURL}/adminMovie`,reqBody,reqHeader)
}

// get a movie
export const getAMovieAPI = async (id,reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/getAMovie/${id}`,"",reqHeader)
}

// get booking
export const getBookingAPI = async (adminId,movieId,timeId,reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/booking/${adminId}/${movieId}/${timeId}`,"",reqHeader)
}

// post booking
export const postBookingAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${serverURL}/booking`,reqBody,reqHeader)
}

// get All Movies
export const getAllMoviesAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/getAllMovies`,"",reqHeader)
}

// Add to theatre list
export const addToTheatreListAPI = async(movieId,reqHeader)=>{
    return await commonAPI("PUT",`${serverURL}/addToTheatreList/${movieId}`,{},reqHeader)
}

// remove from theatre list
export const removeFromTheatreListAPI = async(movieId,reqHeader)=>{
    return await commonAPI("PUT",`${serverURL}/removeFromTheatreList/${movieId}`,{},reqHeader)
}

// register user
export const registerUserApi = async (reqbody) => {
    return await commonAPI("POST",`${serverURL}/registerUser`,reqbody,"")
}

// login user
export const loginUserApi = async (reqbody) => {
    return await commonAPI("POST",`${serverURL}/loginUser`,reqbody,"")
}

// get user
export const getUserApi = async (reqHeader) => {
    return await commonAPI("GET",`${serverURL}/getUser`,"",reqHeader)
}

// update user
export const updateUserApi = async (reqBody,reqHeader) => {
    return await commonAPI("PUT",`${serverURL}/updateUser`,reqBody,reqHeader)
}

// get theatres list of movie
export const getTheatresListApi = async (movieId,reqHeader) => {
    return await commonAPI("GET",`${serverURL}/getTheatreList/${movieId}`,"",reqHeader)
}

// get all theatres
export const getAllTheatresApi = async () => {
    return await commonAPI("GET",`${serverURL}/getAllTheatres`,"","")
}

// get a theatre
export const getATheatreApi = async (theatreId,reqHeader) => {
    return await commonAPI("GET",`${serverURL}/getATheatre/${theatreId}`,"",reqHeader)
}

// get movie names
export const getMovieNamesApi = async (reqHeader) => {
    return await commonAPI("GET",`${serverURL}/getMovieNames`,"",reqHeader)
}

// get theatre names
export const getTheatreNamesApi = async () => {
    return await commonAPI("GET",`${serverURL}/getTheatreNames`,"","")
}

// check server
export const checkServerApi = async () => {
    return await commonAPI("GET",`${serverURL}/`,"","")
}

// get booking for user
export const getBookingsUserApi = async (reqHeader) => {
    return await commonAPI("GET",`${serverURL}/bookingUser`,"",reqHeader)
}

// get booking for user
export const getBookingsAdminApi = async (reqHeader) => {
    return await commonAPI("GET",`${serverURL}/bookingAdmin`,"",reqHeader)
}