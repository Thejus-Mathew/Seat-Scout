import React, { useState } from 'react'
import Header from '../components/Header'
import Carousel from '../components/Carousel'
import movie1 from '../images/movies/movie1.avif'
import movie2 from '../images/movies/movie2.avif'
import movie3 from '../images/movies/movie3.avif'
import movie4 from '../images/movies/movie4.avif'
import movie5 from '../images/movies/movie5.avif'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'

function AllMovies() {
  const [isMobile] = useState(window.innerWidth<1000?true:false)
    const navigate = useNavigate()


  return (
    <div>
      <Header/>
      <Carousel/>
      <div className="container my-5">
        <div className="row mb-3 px-3">
        <h3 className='fw-bold col'>Movies in Kochi</h3>
        <select defaultValue={""} className='form-control col'>
          <option value="" disabled>Languages</option>
          <option value="malayalam">Malayalam</option>
        </select>
        </div>
        <div className="row">
            <div className="col d-flex flex-column border rounded-5 m-1 mb-3 shadow" onClick={()=>navigate("/movie")} style={{cursor:"pointer",minWidth:isMobile?"":"300px",maxWidth:isMobile?"":"600px"}}>
                <img src={movie1} className='rounded-5' width={"100%"} alt="" />
                <h4 className={`text-center fw-bold ${isMobile?"fs-6 px-3":"fs-4"} mb-2 py-1`}>Venom</h4>
            </div>
            <div className="col d-flex flex-column border rounded-5 m-1 mb-3 shadow" onClick={()=>navigate("/movie")} style={{cursor:"pointer",minWidth:isMobile?"":"300px",maxWidth:isMobile?"":"500px"}}>
                <img src={movie2} className='rounded-5' width={"100%"} alt="" />
                <h4 className={`text-center fw-bold ${isMobile?"fs-6 px-3":"fs-4"} mb-2 py-1`}>A.R.M</h4>
            </div>
            <div className="col d-flex flex-column border rounded-5 m-1 mb-3 shadow" onClick={()=>navigate("/movie")} style={{cursor:"pointer",minWidth:isMobile?"":"300px",maxWidth:isMobile?"":"500px"}}>
                <img src={movie3} className='rounded-5' width={"100%"} alt="" />
                <h4 className={`text-center fw-bold ${isMobile?"fs-6 px-3":"fs-4"} mb-2 py-1`}>Salaar</h4>
            </div>
            <div className="col d-flex flex-column border rounded-5 m-1 mb-3 shadow" onClick={()=>navigate("/movie")} style={{cursor:"pointer",minWidth:isMobile?"":"300px",maxWidth:isMobile?"":"500px"}}>
                <img src={movie4} className='rounded-5' width={"100%"} alt="" />
                <h4 className={`text-center fw-bold ${isMobile?"fs-6 px-3":"fs-4"} mb-2 py-1`}>Kishkindha Kaandam</h4>
            </div>
            <div className="col d-flex flex-column border rounded-5 m-1 mb-3 shadow" onClick={()=>navigate("/movie")} style={{cursor:"pointer",minWidth:isMobile?"":"300px",maxWidth:isMobile?"":"500px"}}>
                <img src={movie5} className='rounded-5' width={"100%"} alt="" />
                <h4 className={`text-center fw-bold ${isMobile?"fs-6 px-3":"fs-4"} mb-2 py-1`}>Bougainvillea</h4>
            </div>
            <div className="col d-flex flex-column border rounded-5 m-1 mb-3 shadow" onClick={()=>navigate("/movie")} style={{cursor:"pointer",minWidth:isMobile?"":"300px",maxWidth:isMobile?"":"500px"}}>
                <img src={movie3} className='rounded-5' width={"100%"} alt="" />
                <h4 className={`text-center fw-bold ${isMobile?"fs-6 px-3":"fs-4"} mb-2 py-1`} style={{width:"100%"}}>Salaar</h4>
            </div>
            <div className="col d-flex flex-column border rounded-5 m-1 mb-3 shadow" onClick={()=>navigate("/movie")} style={{cursor:"pointer",minWidth:isMobile?"":"300px",maxWidth:isMobile?"":"500px"}}>
                <img src={movie4} className='rounded-5' width={"100%"} alt="" />
                <h4 className={`text-center fw-bold ${isMobile?"fs-6 px-3":"fs-4"} mb-2 py-1`}>Kishkindha Kaandam</h4>
            </div>
            <div className="col d-flex flex-column border rounded-5 m-1 mb-3 shadow" onClick={()=>navigate("/movie")} style={{cursor:"pointer",minWidth:isMobile?"":"300px",maxWidth:isMobile?"":"500px"}}>
                <img src={movie5} className='rounded-5' width={"100%"} alt="" />
                <h4 className={`text-center fw-bold ${isMobile?"fs-6 px-3":"fs-4"} mb-2 py-1`}>Bougainvillea</h4>
            </div>
            <div className="col d-flex flex-column border rounded-5 m-1 mb-3 shadow" onClick={()=>navigate("/movie")} style={{cursor:"pointer",minWidth:isMobile?"":"300px",maxWidth:isMobile?"":"500px"}}>
                <img src={movie3} className='rounded-5' width={"100%"} alt="" />
                <h4 className={`text-center fw-bold ${isMobile?"fs-6 px-3":"fs-4"} mb-2 py-1`} style={{width:"100%"}}>Salaar</h4>
            </div>
            <div className="col d-flex flex-column border rounded-5 m-1 mb-3 shadow" onClick={()=>navigate("/movie")} style={{cursor:"pointer",minWidth:isMobile?"":"300px",maxWidth:isMobile?"":"500px"}}>
                <img src={movie4} className='rounded-5' width={"100%"} alt="" />
                <h4 className={`text-center fw-bold ${isMobile?"fs-6 px-3":"fs-4"} mb-2 py-1`}>Kishkindha Kaandam</h4>
            </div>
            <div className="col d-flex flex-column border rounded-5 m-1 mb-3 shadow" onClick={()=>navigate("/movie")} style={{cursor:"pointer",minWidth:isMobile?"":"300px",maxWidth:isMobile?"":"500px"}}>
                <img src={movie5} className='rounded-5' width={"100%"} alt="" />
                <h4 className={`text-center fw-bold ${isMobile?"fs-6 px-3":"fs-4"} mb-2 py-1`}>Bougainvillea</h4>
            </div>
            <div className="col d-flex flex-column border rounded-5 m-1 mb-3 shadow" onClick={()=>navigate("/movie")} style={{cursor:"pointer",minWidth:isMobile?"":"300px",maxWidth:isMobile?"":"500px"}}>
                <img src={movie3} className='rounded-5' width={"100%"} alt="" />
                <h4 className={`text-center fw-bold ${isMobile?"fs-6 px-3":"fs-4"} mb-2 py-1`} style={{width:"100%"}}>Salaar</h4>
            </div>
            <div className="col d-flex flex-column border rounded-5 m-1 mb-3 shadow" onClick={()=>navigate("/movie")} style={{cursor:"pointer",minWidth:isMobile?"":"300px",maxWidth:isMobile?"":"500px"}}>
                <img src={movie4} className='rounded-5' width={"100%"} alt="" />
                <h4 className={`text-center fw-bold ${isMobile?"fs-6 px-3":"fs-4"} mb-2 py-1`}>Kishkindha Kaandam</h4>
            </div>
            <div className="col d-flex flex-column border rounded-5 m-1 mb-3 shadow" onClick={()=>navigate("/movie")} style={{cursor:"pointer",minWidth:isMobile?"":"300px",maxWidth:isMobile?"":"500px"}}>
                <img src={movie5} className='rounded-5' width={"100%"} alt="" />
                <h4 className={`text-center fw-bold ${isMobile?"fs-6 px-3":"fs-4"} mb-2 py-1`}>Bougainvillea</h4>
            </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default AllMovies
