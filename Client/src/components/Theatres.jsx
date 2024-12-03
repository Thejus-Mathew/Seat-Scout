import React, { useState } from 'react'
import './Movies.css'
import { useNavigate } from 'react-router-dom'

function Theatres() {
    const [isMobile] = useState(window.innerWidth<1000?true:false)
    const navigate = useNavigate()
  return (
    <div>
    <div className="container py-5">
      <div className={`header text-light ${isMobile?"p-1":"p-3"} mt-5`}>
          <h2>Theatres</h2>
      </div>
      <p className='text-end text-danger m-2' onClick={()=>navigate('/theatres')} style={{cursor:"pointer"}}>See All <i className="fa-solid fa-angle-right fa-2xs"></i></p>
      <div className="row gap-2 px-3">
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
      </div>
    </div>
  </div>
  )
}

export default Theatres
