import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import movie22 from '../images/movies/movie22.avif'
import movie2 from '../images/movies/movie2.avif'
import { useNavigate } from 'react-router-dom'


function Movie() {
    const [isMobile] = useState(window.innerWidth<1000?true:false)
    const navigate = useNavigate()

  return (
    <div>
      <Header/>
      <div className="bgbg" style={{backgroundImage:`url(${movie22})`,height:`${isMobile?"200px":"500px"}`}}>
        <div className={`bg d-flex ${isMobile?"py-2":"p-5 py-4"}`}>
            <img src={movie2} className={`${isMobile?"ms-2":"ms-5 me-5"}`} alt="" />
            <div className="d-flex flex-column justify-content-center ms-4 text-light gap-3" style={{height:'100%'}}>
                <h1>A.R.M</h1>
                {
                    isMobile?<></>:
                    <div className='d-flex flex-column gap-3'>
                        <div><button className='btn btn-lg btn-secondary fs-5'><i className="fa-solid fa-star"></i> 8.8/10 (66.6K Votes)</button></div>
                        <span><button className='btn btn-sm btn-light'>2D,3D</button><button className='btn btn-sm btn-light ms-3'>Malayalam, Hindi, Tamil, Kannada, Telugu</button></span>
                        <p>2h 23m <i className="fa-solid fa-circle fa-2xs ms-3"></i> Action, Adventure, Drama, Period <i className="fa-solid fa-circle fa-2xs ms-3"></i> UA <i className="fa-solid fa-circle fa-2xs ms-3"></i> 12 Sep, 2024</p>
                    </div>
                }
                <div><button className={`btn ${isMobile?"":"btn-lg"} btn-danger`} onClick={()=>navigate('/bookingstart')}>Book Tickets</button></div>
            </div>
        </div>
      </div>
      <div className="container my-5">
        {
            isMobile?
            <div className='card pb-3 mb-4'>
                <div><button className='btn btn-secondary'><i className="fa-solid fa-star"></i> 8.8/10 (66.6K Votes)</button></div>
                <div>
                <button className='btn border btn-light me-3 my-1'>2D,3D</button>
                <button className='btn border btn-light'>Malayalam, Hindi, Tamil, Kannada, Telugu</button>
                <button className='btn border btn-light me-3 my-1'>2h 23m</button>
                <button className='btn border btn-light me-3 my-1'>Action, Adventure, Drama, Period</button>
                <button className='btn border btn-light me-3 my-1'>UA</button>
                <button className='btn border btn-light me-3 my-1'> 12 Sep, 2024</button>
                </div>
            </div>:<></>
        }
        <h3 className='fw-bold'>About the movie</h3>
        <p >Set in Northern Kerala across the years 1900, 1950, and 1990, this epic tale follows three generations of heroes Maniyan, Kunjikelu, and Ajayan as they strive to protect the land's most vital treasure.</p>
        <h3 className='fw-bold mt-3'>Cast</h3>
        <ul>
            <li>Tovino Thomas (as Kunjikelu, Maniyan, Ajayan)</li>
            <li>Krithy Shetty (as Lekshmi)</li>
            <li>Aishwarya Rajesh (as Chothi)</li>
        </ul>
        <h3 className='fw-bold mt-3'>Crew</h3>
        <ul>
            <li>Jithin Laal (Director)</li>
            <li>Listin Stephen (Producer)</li>
            <li>Sujith Nambyar (Writer)</li>
        </ul>
      </div>
      <Footer/>
    </div>
  )
}

export default Movie
