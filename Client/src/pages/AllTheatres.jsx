import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Carousel from '../components/Carousel'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import { getAllTheatresApi } from '../Services/allAPI'
import { toast } from 'react-toastify'



function AllTheatres() {
  const [isMobile] = useState(window.innerWidth<1000?true:false)
    const navigate = useNavigate()
    const [theatres,setTheatres]=useState([])
  
    const getAllTheatres = async () => {
      try{
        const result = await getAllTheatresApi()        
        if(result.status == 200){
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
      <Header/>
      <Carousel/>
      <div className="container my-5 shadow py-4 border rounded-5">
        <div>
          <h3 className='fw-bold my-3'>Theatres in {sessionStorage.getItem("city")}</h3>
        </div>
        <div className="d-flex flex-column gap-2 px-3">
          {
            theatres.length>0?
            theatres.map((item,index)=>(
              <div key={index} className="col p-3 card border shadow" style={{minWidth:isMobile?"60%":"30%",cursor:"pointer"}} onClick={()=>navigation(item?._id)}>
                <h4>{item?.theatreName}, {item?.city}</h4>
                <p>{item?.address}, {item?.landmark}, {item?.city}, {item?.state}, {item?.pinCode}, India</p>
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

export default AllTheatres
