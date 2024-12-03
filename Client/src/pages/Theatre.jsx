import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import {  Modal } from 'react-bootstrap'
import screen from '../images/screen.png'

function Theatre() {
    const [isMobile] = useState(window.innerWidth<1000?true:false)
    const date1 = new Date()
    const date2 = new Date(Number(date1)+(1000*60*60*24))
    const date3 = new Date(Number(date1)+(1000*60*60*24*2))
    const date4 = new Date(Number(date1)+(1000*60*60*24*3))

    
    const[day1] = useState({
        time:Number(date1),
        week:date1.toString().slice(0,3),
        day:date1.toString().slice(4,7),
        month:date1.toString().slice(8,10),
    })
    const[day2] = useState({
        time:Number(date2),
        week:date2.toString().slice(0,3),
        day:date2.toString().slice(4,7),
        month:date2.toString().slice(8,10),
    })
    const[day3] = useState({
        time:Number(date3),
        week:date3.toString().slice(0,3),
        day:date3.toString().slice(4,7),
        month:date3.toString().slice(8,10),
    })
    const[day4] = useState({
        time:Number(date4),
        week:date4.toString().slice(0,3),
        day:date4.toString().slice(4,7),
        month:date4.toString().slice(8,10),
    })

    const [choseDate,setChoseDate]=useState(1)

    const navigate = useNavigate()


    const [show, setShow] = useState(false);
    const [seats,setSeats] = useState(()=>{
        let obj = {}
        for(let i=65;i<82;i++){
            obj[String.fromCharCode(i)] ={}
            for (let j=1;j<28;j++){
                obj[String.fromCharCode(i)][`${j}`]=0
            }
        } 
        return obj
    })
    const [seatCount,setSeatCount] = useState(0)

    const selectSeat = (item,item1)=>{

        if (seats[item][item1]==0){
            setSeats(()=>{
                return {...seats,[item]:{...seats[item],[item1]:2}}
            })
            setSeatCount(seatCount+1)
        }else if(seats[item][item1]==2){
            setSeats(()=>{
                return {...seats,[item]:{...seats[item],[item1]:0}}
            })
            setSeatCount(seatCount-1)
        }
    }
        

  return (
    <div>
      <Header/>
      <div className="container mt-5">
        <h2 className='fw-bold'>PVR: Lulu, Kochi</h2>
        <p>Lulu International Shopping Mall, Edappally, Nethaji Nagar, Kochi, Kerala 682024, India</p>
      </div>
      <div className="container mb-5 card shadow-5 border border-3">
        <div className="row border py-3">
            <div className="col-4 gap-2 d-flex position-relative">
                <button className={`btn rounded-5 px-3 ${choseDate==1?"btn-danger":""}`} onClick={()=>setChoseDate(1)}>
                    <div>{day1.week}</div>
                    <div>{day1.day}</div>
                    <div>{day1.month}</div>
                </button>
                <button className={`btn rounded-5 px-3 ${choseDate==2?"btn-danger":""}`} onClick={()=>setChoseDate(2)}>
                    <div>{day2.week}</div>
                    <div>{day2.day}</div>
                    <div>{day2.month}</div>
                </button>
                <button className={`btn rounded-5 px-3 ${choseDate==3?"btn-danger":""}`} onClick={()=>setChoseDate(3)}>
                    <div>{day3.week}</div>
                    <div>{day3.day}</div>
                    <div>{day3.month}</div>
                </button>
                <button className={`btn rounded-5 px-3 ${choseDate==4?"btn-danger":""}`} onClick={()=>setChoseDate(4)}>
                    <div>{day4.week}</div>
                    <div>{day4.day}</div>
                    <div>{day4.month}</div>
                </button>
            </div>
        </div>
        <div className="row mt-3 shadow py-3">
            <div className="col-4">
                <p className='m-0 ' style={{cursor:"pointer"}} onClick={()=>navigate('/movie')}>Bougainvillea (UA)</p>
                <p className='m-0' style={{fontSize:"13px"}}>malayalam, 2D</p>
            </div>
            <div className="col-8 d-flex gap-1">
                <button className='btn text-success' onClick={()=>setShow(true)}>
                    <div>12:00pm</div>
                    <div>₹ 150</div>
                </button>
                <button className='btn text-success' onClick={()=>setShow(true)}>
                    <div>06:00pm</div>
                    <div>₹ 150</div>
                </button>
                <button className='btn text-success' onClick={()=>setShow(true)}>
                    <div>09:00pm</div>
                    <div>₹ 150</div>
                </button>
            </div>
        </div>
        <div className="row mt-3 shadow py-3">
        <div className="col-4">
                <p className='m-0 ' style={{cursor:"pointer"}} onClick={()=>navigate('/movie')}>Bougainvillea (UA)</p>
                <p className='m-0' style={{fontSize:"13px"}}>malayalam, 2D</p>
            </div>
            <div className="col-8 d-flex gap-1">
                <button className='btn text-success' onClick={()=>setShow(true)}>
                    <div>12:00pm</div>
                    <div>₹ 150</div>
                </button>
                <button className='btn text-success' onClick={()=>setShow(true)}>
                    <div>06:00pm</div>
                    <div>₹ 150</div>
                </button>
                <button className='btn text-success' onClick={()=>setShow(true)}>
                    <div>09:00pm</div>
                    <div>₹ 150</div>
                </button>
            </div>
        </div>
        <div className="row mt-3 shadow py-3">
        <div className="col-4">
                <p className='m-0 ' style={{cursor:"pointer"}} onClick={()=>navigate('/movie')}>Bougainvillea (UA)</p>
                <p className='m-0' style={{fontSize:"13px"}}>malayalam, 2D</p>
            </div>
            <div className="col-8 d-flex gap-1">
                <button className='btn text-success' onClick={()=>setShow(true)}>
                    <div>12:00pm</div>
                    <div>₹ 150</div>
                </button>
                <button className='btn text-success' onClick={()=>setShow(true)}>
                    <div>06:00pm</div>
                    <div>₹ 150</div>
                </button>
                <button className='btn text-success' onClick={()=>setShow(true)}>
                    <div>09:00pm</div>
                    <div>₹ 150</div>
                </button>
            </div>
        </div>
        <div className="row mt-3 shadow py-3">
        <div className="col-4">
                <p className='m-0 ' style={{cursor:"pointer"}} onClick={()=>navigate('/movie')}>Bougainvillea (UA)</p>
                <p className='m-0' style={{fontSize:"13px"}}>malayalam, 2D</p>
            </div>
            <div className="col-8 d-flex gap-1">
                <button className='btn text-success' onClick={()=>setShow(true)}>
                    <div>12:00pm</div>
                    <div>₹ 150</div>
                </button>
                <button className='btn text-success' onClick={()=>setShow(true)}>
                    <div>06:00pm</div>
                    <div>₹ 150</div>
                </button>
                <button className='btn text-success' onClick={()=>setShow(true)}>
                    <div>09:00pm</div>
                    <div>₹ 150</div>
                </button>
            </div>
        </div>
      </div>
      <Footer/>


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
                            (item == "D" || item == "N" )?
                            <div key={index} className="d-flex justify-content-between mb-1" style={{width:"70vw",minWidth:"870px"}}>
                                {
                                    Object.keys(seats[item]).map((item1,index1)=>(
                                        <div key={index1} className="d-flex justify-content-center align-items-center" style={{width:`${80/27}%`,aspectRatio:"1/1"}}>
                                        </div>
                                    ))
                                }
                            </div>
                            :
                            <div key={index} className="d-flex justify-content-between mb-1" style={{width:"70vw",minWidth:"870px"}}>
                                        <div className="bg-light d-flex justify-content-center align-items-center" style={{width:`${80/27}%`,aspectRatio:"1/1",fontSize:isMobile?"15px":"20px"}}>
                                            {item}
                                        </div>
                                {
                                    Object.keys(seats[item]).map((item1,index1)=>(
                                        item1==8 || item1==19?
                                        <div key={index1} className=" d-flex justify-content-center align-items-center" style={{width:`${80/27}%`,aspectRatio:"1/1",fontSize:isMobile?"10px":"15px"}}>  
                                        </div>:
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
                        <button className='btn btn-danger' onClick={()=>navigate('/payment')}>Pay ₹{seatCount*150}</button>
                    </div>:<></>
                }
            </div>
        </Modal.Body>
      </Modal>


    </div>
    
  )
}

export default Theatre
