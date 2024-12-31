import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import Footer from '../components/Footer'
import { getBookingsAdminApi } from '../Services/allAPI'
import { InfinitySpin } from 'react-loader-spinner'

function AdminBookings() {
    const [bookings,setbookings]=useState([])
    const [loading,setloading]=useState(true)
  
  
    const getBookings = async () => {
      try{
        const token = sessionStorage.getItem("token")
        const reqHeader = {
          "Authorization":`Bearer ${token}`,
          "Content-Type":"application/json"
        }
        const result  = await getBookingsAdminApi(reqHeader)
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
                <th className='text-center'>User</th>
                <th className='text-center'>Date</th>
                <th className='text-center'>Seats</th>
                <th className='text-center'>Booking Id</th>
              </tr>
            </thead>
            <tbody className='bg-shade'>
              {
                bookings.length>0?
                bookings.map((item,index)=>(
                  <tr key={index} style={{border:"1px white solid"}}>
                    <td className="text-center p-3">{item?.movieId[0]?.name}</td>
                    <td className="text-center p-3">{item?.userId[0]?.name}</td>
                    <td className="text-center p-3">{item?.timeId.split("-").join(" ")}</td>
                    <td className="text-center p-3">{item?.seat.join(", ")}</td>
                    <td className="text-center p-3">{item?._id}</td>
                  </tr>
                )):<></>
              }
            </tbody>
          </table>
        </div>
      }
      <Footer/>
    </div>
  )
}

export default AdminBookings
