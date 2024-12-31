import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import Footer from '../components/Footer'
import { getBookingsUserApi } from '../Services/allAPI'
import { InfinitySpin } from 'react-loader-spinner'
import { Modal } from 'react-bootstrap'
import QRCode from "react-qr-code";

function AdminBookings() {
    const [bookings,setbookings]=useState([])
    const [loading,setloading]=useState(true)
    const [show, setShow] = useState(false);
    const [bookeditem,setBookedItem]=useState({})
  
  
    const getBookings = async () => {
      try{
        const token = sessionStorage.getItem("token")
        const reqHeader = {
          "Authorization":`Bearer ${token}`,
          "Content-Type":"application/json"
        }
        const result  = await getBookingsUserApi(reqHeader)
        if(result.status==200){
          setbookings(result.data.reverse())
          setloading(false)
        }else{
          console.log("failed to fetch bookings",result);
        }
      }catch(err){
        console.log("failed to fetch bookings",err);
      }
    }
  
    useEffect(()=>{
      getBookings()
    },[])
  return (
    <div>
      <AdminHeader/>
      {
        loading?
        <div className='d-flex justify-content-center align-items-center' style={{height:"50dvh"}}><InfinitySpin visible={true} width="200" color="#000000" ariaLabel="infinity-spin-loading"/></div>:
        <div className="container table-responsive" style={{minHeight:"50dvh"}}>
          <table className='w-100 my-5' style={{minWidth:"700px"}}>
            <thead className='bg-secondary text-light'>
              <tr>
                <th className='text-center py-3'>Movie</th>
                <th className='text-center'>Theatre</th>
                <th className='text-center'>Date</th>
                <th className='text-center'>Seats</th>
                <th className='text-center'></th>
              </tr>
            </thead>
            <tbody className='bg-shade'>
              {
                bookings.length>0?
                bookings.map((item,index)=>(
                  <tr key={index} style={{border:"1px white solid"}}>
                    <td className="text-center p-3">{item?.movieId[0]?.name}</td>
                    <td className="text-center p-3">{item?.adminId[0]?.theatreName}, {item?.adminId[0]?.city}</td>
                    <td className="text-center p-3">{item?.timeId.split("-").join(" ")}</td>
                    <td className="text-center p-3">{item?.seat.join(", ")}</td>
                    <td className="text-center p-3"><button className='btn text-info' onClick={()=>{setShow(true); setBookedItem({...item}) }}><i className="fa-solid fa-arrow-up-right-from-square"></i></button></td>
                  </tr>
                )):<></>
              }
            </tbody>
          </table>
        </div>
      }
      <Footer/>

      <Modal show={show} size='lg' onHide={() =>{setShow(false); setBookedItem({})}}>
        <Modal.Header closeButton>
          <Modal.Title>Booking details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-sm-12 col-md-6 d-flex justify-content-center align-items-center p-3 position-relative flex-column">
              <img src={bookeditem.movieId && bookeditem.movieId[0].poster} alt="" width={"100%"} />
              <div className='position-absolute backgroundBnW text-light fs-3 fw-bolder d-flex justify-content-center align-items-end pb-3'>
                {bookeditem.movieId && bookeditem.movieId[0].name}
              </div>
            </div>
            <div className="col-sm-12 col-md-6 p-1 py-5 d-flex flex-column justify-content-between">
              <div>
                <div className='fs-2 fw-bold'>{bookeditem.adminId && bookeditem.adminId[0].theatreName}, {bookeditem.adminId && bookeditem?.adminId[0]?.city}</div>
                <div className='fs-5'>Date: {bookeditem.timeId && bookeditem?.timeId.split("-").join(" ").slice(0,11)}</div>
                <div className='fs-5'>Time: {bookeditem.timeId && bookeditem?.timeId.split("-").join(" ").slice(11)}</div>
                <div className='fs-5'>Seats: <span className='fw-bolder'>{bookeditem.seat && bookeditem?.seat.join(", ")}</span></div>
              </div>
              <div className="mt-5 pt-5 d-flex justify-content-evenly">
                <span>Scan QR Code: </span>
                <QRCode style={{ height: "auto", maxWidth: "40%", width: "40%" }} value={`${sessionStorage.getItem("name")} --- ${bookeditem.adminId && bookeditem?.movieId[0]?.name} --- ${bookeditem.adminId && bookeditem?.adminId[0]?.theatreName}, ${bookeditem.adminId && bookeditem?.adminId[0]?.city} --- ${bookeditem.adminId && bookeditem?.timeId.split("-").join(" ")} --- ${bookeditem.adminId && bookeditem?.seat.join(", ")} --- ${bookeditem.adminId && bookeditem?._id}`}/>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default AdminBookings
