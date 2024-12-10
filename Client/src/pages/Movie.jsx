import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getAMovieAPI } from '../Services/allAPI'



function Movie() {
    const [isMobile] = useState(window.innerWidth<1000?true:false)
    const navigate = useNavigate()
    const [movie,setMovie]=useState({})
    const {movieId} = useParams()

    const getMovie = async () => {
      try{
        const result = await getAMovieAPI(movieId)
        if(result.status==200){
          setMovie(result.data)
        }else{
          toast.warn("Failed to fetch movie data")
        }
      }catch(err){
        toast.warn("Failed to fetch movie data")
        console.log("Failed to fetch movie data",err);
      }
    }

    useEffect(()=>{
      getMovie()
    },[])

    const handleNavigate = () =>{
      if(sessionStorage.getItem("token")){
        navigate(`/bookingstart/${movieId}`)
      }else{
        toast.info("Signin to Book Tickets")
      }
    }
    
    

  return (
    <div>
      <Header/>
      <div className="bgbg" style={{backgroundImage:`url(${movie?.cover})`,height:`${isMobile?"200px":"500px"}`}}>
        <div className={`bg d-flex ${isMobile?"py-2":"p-5 py-4"}`}>
            <img src={movie?.poster} className={`${isMobile?"ms-2":"ms-5 me-5"}`} alt="" />
            <div className="d-flex flex-column justify-content-center ms-4 text-light gap-3" style={{height:'100%'}}>
                <h1>{movie?.name}</h1>
                {
                    isMobile?<></>:
                    <div className='d-flex flex-column gap-3'>
                        <div><button className='btn btn-lg btn-secondary fs-5'><i className="fa-solid fa-star"></i> {movie?.rating}</button></div>
                        <span><button className='btn btn-sm btn-light'>{movie?.format && movie?.format.join(", ")}</button><button className='btn btn-sm btn-light ms-3'>{movie?.languages && movie?.languages.join(", ")}</button></span>
                        <p>{movie?.duration} <i className="fa-solid fa-circle fa-2xs ms-3"></i> {movie?.type && movie?.type.join(", ")} <i className="fa-solid fa-circle fa-2xs ms-3"></i> {movie?.rated} <i className="fa-solid fa-circle fa-2xs ms-3"></i> {movie?.releaseDate}</p>
                    </div>
                }
                <div><button className={`btn ${isMobile?"":"btn-lg"} btn-danger`} onClick={()=>handleNavigate()}>Book Tickets</button></div>
            </div>
        </div>
      </div>
      <div className="container my-5">
        {
            isMobile?
            <div className='card pb-3 mb-4'>
                <div><button className='btn btn-secondary'><i className="fa-solid fa-star"></i> {movie?.rating}</button></div>
                <div>
                <button className='btn border btn-light me-3 my-1'>{movie?.format && movie?.format.join(", ")}</button>
                <button className='btn border btn-light'>{movie?.languages && movie?.languages.join(", ")}</button>
                <button className='btn border btn-light me-3 my-1'>{movie?.duration}</button>
                <button className='btn border btn-light me-3 my-1'>{movie?.type && movie?.type.join(", ")}</button>
                <button className='btn border btn-light me-3 my-1'>{movie?.rated}</button>
                <button className='btn border btn-light me-3 my-1'> {movie?.releaseDate}</button>
                </div>
            </div>:<></>
        }
        <h3 className='fw-bold'>About the movie</h3>
        <p >{movie?.about}</p>
        <h3 className='fw-bold mt-3'>Cast</h3>
        <ul>
          {
            movie?.cast &&
            movie.cast.map((item,index)=>(
              <li key={index}>{item}</li>
            ))
          }
        </ul>
        <h3 className='fw-bold mt-3'>Crew</h3>
        <ul>
          {
            movie?.crew &&
            movie.crew.map((item,index)=>(
              <li key={index}>{item}</li>
            ))
          }
        </ul>
      </div>
      <Footer/>
    </div>
  )
}

export default Movie
