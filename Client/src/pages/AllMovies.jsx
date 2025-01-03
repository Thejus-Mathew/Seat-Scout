import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Carousel from '../components/Carousel'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import { getAllMoviesAPI } from '../Services/allAPI'
import { toast } from 'react-toastify'
import { InfinitySpin } from 'react-loader-spinner'


function AllMovies() {
    const [isMobile] = useState(window.innerWidth<1000?true:false)
    const [allMovies,setAllMovies]=useState([])
    const [loading,setLoading]=useState(true)

    const navigate = useNavigate()

    const getAllMovies = async () => {
        try{
            const result = await getAllMoviesAPI()
            if(result.status==200){
            setAllMovies(result.data)
            setLoading(false)
            }else{
            toast.warn("Failed to fetch all movies")
            }
        }catch(err){
            toast.warn("Failed to fetch all movies")
            console.log("Failed to fetch all movies",err);
        }
    }

    useEffect(()=>{
    getAllMovies()
    },[])

  return (
    <div>
      <Header/>
      <Carousel/>
      <div className="container my-5">
        <div className="row mb-3 px-3">
        <h3 className='fw-bold col'>Movies in {sessionStorage.getItem("city")}</h3>
        </div>
        <div className="row">
        {
          loading?
            <div className='d-flex justify-content-center align-items-center' style={{height:"50dvh"}}><InfinitySpin visible={true} width="200" color="#000000" ariaLabel="infinity-spin-loading"/></div>:
            allMovies.length>0?
            allMovies.map((item,index)=>(
              <div key={index} className="col d-flex flex-column border rounded-5 m-1 shadow" onClick={()=>navigate(`/movie/${item?._id}`)} style={{cursor:"pointer",minWidth:isMobile?"150px":"300px",maxWidth:isMobile?"":"400px"}}>
                <img src={item?.poster} className='rounded-5' width={"100%"} alt="" />
                <h4 className={`text-center fw-bold ${isMobile?"fs-6 px-3":"fs-4"} mb-2`}>{item?.name}</h4>
              </div>
            ))
            :<></>
        }
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default AllMovies
