import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Carousel from '../components/Carousel'
import Movies from '../components/Movies'
import Theatres from '../components/Theatres'
import Footer from '../components/Footer'
import { checkServerApi } from '../Services/allAPI'

function Home() {
  const[loading,setLoading]=useState(true)

  const checkServer = async () => {
    console.log("Checking Server");
    try{
      const result = await checkServerApi()
      if(result.status==200){
        setLoading(false)
      }else{
        setLoading(true)
      }
    }catch(err){
      console.log("Server is down",err);
      setLoading(true)
    }
  }

  useEffect(()=>{
    if(loading){
      checkServer()
    }
  },[loading])

  return (
    <div>
      {
        loading?
        <div className="d-flex justify-content-center align-items-center flex-column" style={{height:"100dvh"}}>
          <div>Connecting to sever <i class=" fa-solid fa-circle-notch fa-spin"></i></div>
          <div>It may take upto 50 seconds or more. Due to inactivity</div>
        </div> :
        <>
          <Header/>
          <Carousel/>
          <Movies/>
          <Theatres/>
          <Footer/>
        </>
      }
    </div>
  )
}

export default Home
