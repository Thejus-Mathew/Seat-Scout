import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import screen from '../images/screen.png'
import { toast } from 'react-toastify'
import { getBookingAPI, postBookingAPI } from '../Services/allAPI'

function UserSeat({time,price,movieId,seat,timeId,theatreId, format, language, movieName, theatreName}) {
    const uniqueId = timeId.day+"-"+timeId.month+"-"+timeId.year+"-"+time
        
    const [isMobile] = useState(window.innerWidth<1000?true:false)
    const[bookedSeats,setBookedSeats]=useState([])
    useEffect(()=>{
        getBooking()
    },[])
    const [seatCount,setSeatCount] = useState(0)
    const [selectedSeats,setSelectedSeats] = useState([])
    const [loading,setLoading]=useState(false)
    
    
    
    
    

    const getBooking = async () =>{
        try{
            const token = sessionStorage.getItem("token")
            const reqHeader = {
                "Authorization":`Bearer ${token}`,
                "Content-Type":"application/json"
            }
            const result = await getBookingAPI(theatreId,movieId,uniqueId,reqHeader)
            
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
    
        if (seats[item][item1]==0){
            setSeats(()=>{
                return {...seats,[item]:{...seats[item],[item1]:2}}
            })
            setSeatCount(seatCount+1)
            setSelectedSeats((data)=>{
                data.push(`${item} ${item1}`)
                return data
            })
        }else if(seats[item][item1]==2){
            setSeats(()=>{
                return {...seats,[item]:{...seats[item],[item1]:0}}
            })
            setSeatCount(seatCount-1)
            setSelectedSeats(selectedSeats.filter((a)=>a != `${item} ${item1}`))
        }
    }

    const handlePayment = async () => {
        setLoading(true)
        try{
            const token = sessionStorage.getItem("token")
            const reqHeader = {
                "Authorization":`Bearer ${token}`,
                "Content-Type":"application/json"
            }
            const result = await postBookingAPI({timeId:uniqueId,adminId:theatreId,movieId:movieId,seat:selectedSeats},reqHeader)
            toast.success("Selected Seats have been booked successfully")
            getBooking()
            setSeatCount(0)
            setSelectedSeats([])
        }catch(err){
            toast.warn(err)
        }
        setLoading(false)
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
            <h2 className='fw-bold'>{movieName}</h2>
            <p className='fs-6'>{theatreName} | {timeId?.week} {timeId?.month} {timeId?.day} | {time} | {language} | {format}</p>
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
                {
                    seatCount>0?
                    <div className="text-center bg-light border p-3 shadow" style={{position:"sticky",bottom:"0px"}}>
                        <button className='btn btn-danger' onClick={()=>handlePayment()}>{loading?<i class="fa-solid fs-4 px-3 fa-circle-notch fa-spin"></i>:`Pay ₹${seatCount*price}`}</button>
                    </div>:<></>
                }
            </div>
        </Modal.Body>
        </Modal>
    </div>
  )
}

export default UserSeat
