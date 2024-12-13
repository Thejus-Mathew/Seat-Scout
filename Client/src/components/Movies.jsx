import React, { useEffect, useState } from 'react'
import './Movies.css'
import { useNavigate } from 'react-router-dom'
import { getAllMoviesAPI } from '../Services/allAPI'
import { toast } from 'react-toastify'

function Movies() {
    const [isMobile] = useState(window.innerWidth<1000?true:false)
    const [allMovies,setAllMovies]=useState([])
    const navigate = useNavigate()

    const getAllMovies = async () => {
      try{
        const result = await getAllMoviesAPI()
        if(result.status==200){
          setAllMovies(result.data)
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
      <div className="container">
        <div className={`header text-light ${isMobile?"p-1":"p-3"} mt-5`}>
            <h2>Movies</h2>
        </div>
        <p className='text-end text-danger m-2' onClick={()=>navigate('/movies')} style={{cursor:"pointer"}}>See All <i className="fa-solid fa-angle-right fa-2xs"></i></p>
        <div className="row">
          {
            allMovies.length>0?
            allMovies.slice(0,5)
            .map((item,index)=>(
              <div key={index} className="col d-flex flex-column border rounded-5 m-1 shadow" onClick={()=>navigate(`/movie/${item?._id}`)} style={{cursor:"pointer",minWidth:isMobile?"150px":"300px",maxWidth:isMobile?"":"400px"}}>
                <img src={item?.poster} className='rounded-5' width={"100%"} alt="" />
                <h4 className={`text-center fw-bold ${isMobile?"fs-6 px-3":"fs-4"} mb-2`}>{item?.name}</h4>
              </div>
            ))
            :<></>
          }
        </div>
      </div>
    </div>
  )
}

export default Movies
