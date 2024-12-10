import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Carousel from '../components/Carousel'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import { getAllMoviesAPI } from '../Services/allAPI'
import { toast } from 'react-toastify'


function AllMovies() {
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
        {
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
