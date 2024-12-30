import React, { useEffect, useState } from 'react'
import './Movies.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getAllTheatresApi } from '../Services/allAPI'
import { InfinitySpin } from 'react-loader-spinner'

function Theatres() {
    const [loading,setLoading]=useState(true)
    const [isMobile] = useState(window.innerWidth<1000?true:false)
    const navigate = useNavigate()
    const [theatres,setTheatres]=useState([])

    const getAllTheatres = async () => {
      try{
        const result = await getAllTheatresApi()        
        if(result.status == 200){
          setLoading(false)
          setTheatres(result.data)
        }else{
          toast.warn("Failed to fetch theatres")
          console.log("Failed to fetch theatres",result); 
        }
      }catch(err){
        toast.warn("Failed to fetch theatres")
        console.log("Failed to fetch theatres",err);
      }
    }

    useEffect(()=>{
      getAllTheatres()
    },[])

    const navigation = (id) => {
      if(sessionStorage.getItem("token")){
        navigate(`/theatre/${id}`)
      }else{
        toast.info("Please login to proceed booking")
      }
    }

    
  return (
    <div>
    <div className="container py-5">
      <div className={`header text-light ${isMobile?"p-1":"p-3"} mt-5`}>
          <h2>Theatres</h2>
      </div>
      <p className='text-end text-danger m-2' onClick={()=>navigate('/theatres')} style={{cursor:"pointer"}}>See All <i className="fa-solid fa-angle-right fa-2xs"></i></p>
      <div className="row gap-2 px-3">
        {
          loading?
          <div className='d-flex justify-content-center align-items-center' style={{height:"30dvh"}}><InfinitySpin visible={true} width="200" color="#000000" ariaLabel="infinity-spin-loading"/></div>:
          theatres.length>0?
          theatres.slice(0,5).map((item,index)=>(
            <div key={index} className="col p-3 card border shadow" style={{minWidth:isMobile?"60%":"30%",cursor:"pointer"}} onClick={()=>navigation(item?._id)}>
              <h4>{item?.theatreName}, {item?.city}</h4>
              <p>{item?.address}, {item?.landmark}, {item?.city}, {item?.state}, {item?.pinCode}, India</p>
            </div>
          ))
          :<></>
        }
      </div>
    </div>
  </div>
  )
}

export default Theatres
