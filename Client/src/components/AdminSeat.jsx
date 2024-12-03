import React, { useContext, useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import screen from '../images/screen.png'
import { adminContext } from '../Context/Context'
import { toast } from 'react-toastify'
import { getBookingAPI } from '../Services/allAPI'




function AdminSeat({time,price,movieId,seat,timeId}) {
    const{admin,setAdmin}=useContext(adminContext)
    const uniqueId = timeId.day+"-"+timeId.month+"-"+timeId.year+"-"+time

    const [isMobile] = useState(window.innerWidth<1000?true:false)
    const[bookedSeats,setBookedSeats]=useState([])
    useEffect(()=>{
        getBooking()
    },[])
    

    const getBooking = async () =>{
        try{
            const token = sessionStorage.getItem("token")
            const reqHeader = {
                "Authorization":`Bearer ${token}`,
                "Content-Type":"application/json"
            }
            const result = await getBookingAPI(admin._id,movieId,uniqueId,reqHeader)            
            if(result.status==200){
                setBookedSeats(result.data)                
            }else{
                toast.warn(result.message)
            }
        }catch(err){
            toast.warn(err)
        }
    }

    const [show, setShow] = useState(false);

    const [seats,setSeats] = useState(seat?.seats)


    useEffect(()=>{
        if(bookedSeats.length>0){
            bookedSeats.forEach((item)=>{
                let key1 = item.split(" ")[0]
                let key2 = item.split(" ")[1]
                setSeats((pre)=>{
                    return {...pre,[key1]:{...pre[key1],[key2]:1}}
                })
            })
        }
    },[bookedSeats])

    


    const selectSeat = (item,item1)=>{

        // if (seats[item][item1]==0){
        //     setSeats(()=>{
        //         return {...seats,[item]:{...seats[item],[item1]:2}}
        //     })
        // }else if(seats[item][item1]==2){
        //     setSeats(()=>{
        //         return {...seats,[item]:{...seats[item],[item1]:0}}
        //     })
        // }
    }
  return (
    <div>
        <button className='btn text-success fs-6 mx-1' onClick={()=>setShow(true)}>
            <div>{time}</div>
            <div>₹ {price}</div>
        </button>




        <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h2 className='fw-bold'>A.R.M</h2>
            <p className='fs-6'>Cinepolis: Centre Square Mall, Kochi | Tue 24 Oct | 09:00pm | English | 3D</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div style={{width:isMobile?"70vw":"",minWidth:isMobile?"870px":""}}>
                <p className='text-center mt-3'>All eyes this way please</p>
                <div className='d-flex justify-content-center'><img src={screen} style={{minWidth:"300px",aspectRatio:"7/1"}} alt="" /></div>
                <div className="seats d-flex align-items-center flex-column my-5" >
                    {
                        Object?.keys(seats).map((item,index)=>(
                            <div key={index} className="d-flex justify-content-between mb-1" style={{width:"70vw",minWidth:"870px"}}>
                                        <div className="bg-light d-flex justify-content-center align-items-center" style={{width:`${80/27}%`,aspectRatio:"1/1",fontSize:isMobile?"15px":"20px"}}>
                                            {item}
                                        </div>
                                {
                                    Object.keys(seats[item]).map((item1,index1)=>(
                                        <div key={index1} className={`border ${seats[item][item1]==1?"bg-danger text-light":seats[item][item1]==0?"bg-light":seats[item][item1]==2?"bg-success text-light":"border-0 text-light"} d-flex justify-content-center align-items-center`} style={{width:`${80/27}%`,cursor:"pointer",aspectRatio:"1/1",fontSize:isMobile?"10px":"15px"}} onClick={()=>selectSeat(item,item1)}>
                                            {item1}
                                        </div>
                                    ))
                                }
                                <div className="bg-light d-flex justify-content-center align-items-center" style={{width:`${80/27}%`,aspectRatio:"1/1",fontSize:isMobile?"15px":"20px"}}>
                                    {item}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default AdminSeat
