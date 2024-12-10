import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import movie22 from '../images/movies/movie22.avif'
import movie2 from '../images/movies/movie2.avif'
import Footer from '../components/Footer'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap'
import screen from '../images/screen.png'
import { toast } from 'react-toastify'
import { getAMovieAPI } from '../Services/allAPI'

function BookingStart() {
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

    const [movie,setMovie]=useState({})
    const {movieId} = useParams()

    const getMovie = async () => {
        try{
          const result = await getAMovieAPI(movieId)
          if(result.status==200){
            setMovie(result.data)
          }else{
            toast.warn("Failed to fetch movie data")
          }
        }catch(err){
          toast.warn("Failed to fetch movie data")
          console.log("Failed to fetch movie data",err);
        }
      }
  
      useEffect(()=>{
        getMovie()
      },[])
  
      console.log(movie);

    const navigate = useNavigate()


    const [showM, setShowM] = useState(false);
    const[language,setLanguage] = useState("")
    const[format,setFormat] = useState("")
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

    const handleCloseM = () => {
        if(format && language){
            setShowM(false)
        }
    }

    useEffect(()=>{
        if(!language || !format){
            setShowM(true)
        }
    },[language,format])


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

    useEffect(()=>{
        if(!sessionStorage.getItem("token")){
            navigate('/')
        }
    },[])
        

  return (
    <div>
      <Header/>
      <div className="bgbg" style={{backgroundImage:`url(${movie?.cover})`,height:`${isMobile?"200px":"500px"}`}}>
        <div className={`bg d-flex ${isMobile?"py-2":"p-5 py-4"}`}>
            <img src={movie?.poster} className={`${isMobile?"ms-2":"ms-5 me-5"}`} alt="" />
            <div className="d-flex flex-column justify-content-center ms-4 text-light gap-3" style={{height:'100%'}}>
                <h1>{movie?.name}</h1>
                {
                    isMobile?<>
                        <span>
                        <button className='btn btn-sm border btn-light me-2'>{movie?.rated}</button>
                        <button className='btn btn-sm border btn-light'>{movie?.format && movie?.format.join(", ")}</button>
                        </span>
                    </>:
                    <div className='d-flex flex-column gap-3'>
                        <div><button className='btn btn-lg btn-secondary fs-5'><i className="fa-solid fa-star"></i> {movie?.rating}</button></div>
                        <span><button className='btn btn-sm btn-light'>{movie?.format && movie?.format.join(", ")}</button><button className='btn btn-sm btn-light ms-3'>{movie?.languages && movie?.languages.join(", ")}</button></span>
                        <p>2h 23m <i className="fa-solid fa-circle fa-2xs ms-3"></i> {movie?.type && movie?.type.join(", ")} <i className="fa-solid fa-circle fa-2xs ms-3"></i> {movie?.rated} <i className="fa-solid fa-circle fa-2xs ms-3"></i> 12 Sep, 2024</p>
                    </div>
                }
            </div>
        </div>
      </div>
      <div className="container my-5 card shadow-5 border border-3">
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
            <div className="col-4"></div>
            <div className="col-4 d-flex align-items-center">
                <select  className='form-control me-3' onChange={(e)=>setLanguage(e.target.value)} value={language}>
                    <option value={""} disabled>Language</option>
                    {
                        movie?.languages && movie.languages.map((item,index)=>(
                            <option key={index} value={item}>{item}</option>
                        ))
                    }
                </select>
                <select  className='form-control'onChange={(e)=>setFormat(e.target.value)} value={format}>
                    <option value={""} disabled>Format</option>
                    {
                        movie?.format && movie.format.map((item,index)=>(
                            <option key={index} value={item}>{item}</option>
                        ))
                    }
                </select>
            </div>
        </div>
        <div className="row mt-3 shadow py-3">
            <div className="col-4">
                <p>Cinepolis: Centre Square Mall, Kochi</p>
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
                <p>Aashirvad Cineplexx: Perumbavoor</p>
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
                <p>Casino Talkies A/C 2K 3D DOLBY SURROUND 7.1 Aluva</p>
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
                <p>Central Talkies 2K 3D Dolby Atmos: Thrippunithura</p>
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



      <Modal show={showM} onHide={handleCloseM}>
        <Modal.Header closeButton={language && format}>
          <Modal.Title>Movie Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="d-flex flex-column gap-3">
                <select className='form-control me-3' onChange={(e)=>setLanguage(e.target.value)} value={language}>
                    <option value={""} disabled>Language</option>
                    {
                        movie?.languages && movie.languages.map((item,index)=>(
                            <option key={index} value={item}>{item}</option>
                        ))
                    }
                </select>
                <select  className='form-control' onChange={(e)=>setFormat(e.target.value)} value={format}>
                    <option value={""} disabled>Format</option>
                    {
                        movie?.format && movie.format.map((item,index)=>(
                            <option key={index} value={item}>{item}</option>
                        ))
                    }
                </select>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" disabled={!language || !format} onClick={handleCloseM}>
            Close
          </Button>
          <Button variant="primary" disabled={!language || !format} onClick={handleCloseM}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


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

export default BookingStart
