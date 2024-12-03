import React, { useState } from 'react'
import './Movies.css'
import movie1 from '../images/movies/movie1.avif'
import movie2 from '../images/movies/movie2.avif'
import movie3 from '../images/movies/movie3.avif'
import movie4 from '../images/movies/movie4.avif'
import movie5 from '../images/movies/movie5.avif'
import { useNavigate } from 'react-router-dom'

function Movies() {
    const [isMobile] = useState(window.innerWidth<1000?true:false)
    const navigate = useNavigate()
  return (
    <div>
      <div className="container">
        <div className={`header text-light ${isMobile?"p-1":"p-3"} mt-5`}>
            <h2>Movies</h2>
        </div>
        <p className='text-end text-danger m-2' onClick={()=>navigate('/movies')} style={{cursor:"pointer"}}>See All <i className="fa-solid fa-angle-right fa-2xs"></i></p>
        <div className="row">
            <div className="col d-flex flex-column border rounded-5 m-1 shadow" onClick={()=>navigate("/movie")} style={{cursor:"pointer"}}>
                <img src={movie1} className='rounded-5' width={"100%"} alt="" />
                <h4 className={`text-center fw-bold ${isMobile?"fs-6 px-3":"fs-4"} mb-2`}>Venom</h4>
            </div>
            <div className="col d-flex flex-column border rounded-5 m-1 shadow" onClick={()=>navigate("/movie")} style={{cursor:"pointer"}}>
                <img src={movie2} className='rounded-5' width={"100%"} alt="" />
                <h4 className={`text-center fw-bold ${isMobile?"fs-6 px-3":"fs-4"} mb-2`}>A.R.M</h4>
            </div>
            <div className="col d-flex flex-column border rounded-5 m-1 shadow" onClick={()=>navigate("/movie")} style={{cursor:"pointer"}}>
                <img src={movie3} className='rounded-5' width={"100%"} alt="" />
                <h4 className={`text-center fw-bold ${isMobile?"fs-6 px-3":"fs-4"} mb-2`}>Salaar</h4>
            </div>
            <div className="col d-flex flex-column border rounded-5 m-1 shadow" onClick={()=>navigate("/movie")} style={{cursor:"pointer"}}>
                <img src={movie4} className='rounded-5' width={"100%"} alt="" />
                <h4 className={`text-center fw-bold ${isMobile?"fs-6 px-3":"fs-4"} mb-2`}>Kishkindha Kaandam</h4>
            </div>
            <div className="col d-flex flex-column border rounded-5 m-1 shadow" onClick={()=>navigate("/movie")} style={{cursor:"pointer"}}>
                <img src={movie5} className='rounded-5' width={"100%"} alt="" />
                <h4 className={`text-center fw-bold ${isMobile?"fs-6 px-3":"fs-4"} mb-2 pb-2`}>Bougainvillea</h4>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Movies
