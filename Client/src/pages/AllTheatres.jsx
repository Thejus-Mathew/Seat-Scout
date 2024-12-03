import React, { useState } from 'react'
import Header from '../components/Header'
import Carousel from '../components/Carousel'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'


function AllTheatres() {
  const [isMobile] = useState(window.innerWidth<1000?true:false)
    const navigate = useNavigate()
  return (
    <div>
      <Header/>
      <Carousel/>
      <div className="container my-5 shadow py-4 border rounded-5">
        <div>
          <h3 className='fw-bold my-3'>Theatres in Kochi</h3>
        </div>
        <div className="d-flex flex-column gap-2 px-3">
          <div className="col p-3 card border shadow" style={{minWidth:isMobile?"60%":"30%",cursor:"pointer"}} onClick={()=>navigate("/theatre")}>
              <h4>PVR: Lulu, Kochi</h4>
              <p>Lulu International Shopping Mall, Edappally, Nethaji Nagar, Kochi, Kerala 682024, India</p>
          </div>
          <div className="col p-3 card border shadow" style={{minWidth:isMobile?"60%":"30%",cursor:"pointer"}} onClick={()=>navigate("/theatre")}>
              <h4>PVR: Forum Mall, Kochi</h4>
              <p>3rd Floor, Forum Mall, NH-47, Vytilla Aroor Bypass, Near - Kundannur Junction, Maradu, Kochi, Kerala 682304, India</p>
          </div>
          <div className="col p-3 card border shadow" style={{minWidth:isMobile?"60%":"30%",cursor:"pointer"}} onClick={()=>navigate("/theatre")}>
              <h4>Cinepolis: Centre Square Mall, Kochi</h4>
              <p>6th floor, M.G.Rroad, Ernakulam, Near Abad Plaza Hotel, Kochi, Kerala 682035, India</p>
          </div>
          <div className="col p-3 card border shadow" style={{minWidth:isMobile?"60%":"30%",cursor:"pointer"}} onClick={()=>navigate("/theatre")}>
              <h4>PVR: Oberon Mall, Kochi</h4>
              <p>Survey no. 154/8.1, 8.3, 9A1, 9A2, 9B, NH Bypass, Edapally Junction, Ernakulam, Near Wildcraft, Kochi, Kerala 682024, India</p>
          </div>
          <div className="col p-3 card border shadow" style={{minWidth:isMobile?"60%":"30%",cursor:"pointer"}} onClick={()=>navigate("/theatre")}>
              <h4>Cinepolis: VIP Centre Square Mall, Kochi</h4>
              <p>6th Floor, M.G.Rroad, Ernakulam, Near Abad Plaza Hotel, Kochi, Kerala 682035, India</p>
          </div>
          <div className="col p-3 card border shadow" style={{minWidth:isMobile?"60%":"30%",cursor:"pointer"}} onClick={()=>navigate("/theatre")}>
              <h4>Cinepolis: Centre Square Mall, Kochi</h4>
              <p>6th floor, M.G.Rroad, Ernakulam, Near Abad Plaza Hotel, Kochi, Kerala 682035, India</p>
          </div>
          <div className="col p-3 card border shadow" style={{minWidth:isMobile?"60%":"30%",cursor:"pointer"}} onClick={()=>navigate("/theatre")}>
              <h4>PVR: Oberon Mall, Kochi</h4>
              <p>Survey no. 154/8.1, 8.3, 9A1, 9A2, 9B, NH Bypass, Edapally Junction, Ernakulam, Near Wildcraft, Kochi, Kerala 682024, India</p>
          </div>
          <div className="col p-3 card border shadow" style={{minWidth:isMobile?"60%":"30%",cursor:"pointer"}} onClick={()=>navigate("/theatre")}>
              <h4>Cinepolis: VIP Centre Square Mall, Kochi</h4>
              <p>6th Floor, M.G.Rroad, Ernakulam, Near Abad Plaza Hotel, Kochi, Kerala 682035, India</p>
          </div>
          <div className="col p-3 card border shadow" style={{minWidth:isMobile?"60%":"30%",cursor:"pointer"}} onClick={()=>navigate("/theatre")}>
              <h4>Cinepolis: Centre Square Mall, Kochi</h4>
              <p>6th floor, M.G.Rroad, Ernakulam, Near Abad Plaza Hotel, Kochi, Kerala 682035, India</p>
          </div>
          <div className="col p-3 card border shadow" style={{minWidth:isMobile?"60%":"30%",cursor:"pointer"}} onClick={()=>navigate("/theatre")}>
              <h4>PVR: Oberon Mall, Kochi</h4>
              <p>Survey no. 154/8.1, 8.3, 9A1, 9A2, 9B, NH Bypass, Edapally Junction, Ernakulam, Near Wildcraft, Kochi, Kerala 682024, India</p>
          </div>
          <div className="col p-3 card border shadow" style={{minWidth:isMobile?"60%":"30%",cursor:"pointer"}} onClick={()=>navigate("/theatre")}>
              <h4>Cinepolis: VIP Centre Square Mall, Kochi</h4>
              <p>6th Floor, M.G.Rroad, Ernakulam, Near Abad Plaza Hotel, Kochi, Kerala 682035, India</p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default AllTheatres
