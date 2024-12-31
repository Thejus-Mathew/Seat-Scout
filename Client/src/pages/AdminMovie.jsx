import React, { useContext, useEffect, useState } from 'react'
import Footer from '../components/Footer'
import AdminHeader from '../components/AdminHeader'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { getAMovieAPI, removeFromTheatreListAPI } from '../Services/allAPI'
import { adminContext } from '../Context/Context'
import AdminSeat from '../components/AdminSeat'
import { InfinitySpin } from 'react-loader-spinner'


function AdminMovie() {
  const [loading,setLoading]=useState(true)
  const{admin,setAdmin}=useContext(adminContext)
    const {movieId} = useParams()
    const [movieIndex]=useState(admin.movies.findIndex((item)=>item.movieId==movieId))
    const[gotMovie,setGotMovie]=useState({
      name:"",
      rating:"",
      format:[],
      languages:[],
      duration:"",
      type:[],
      rated:"",
      releaseDate:"",
      about:"",
      cast:[],
      crew:[],
      poster:"",
      cover:""
    })

    const [isMobile] = useState(window.innerWidth<1000?true:false)

    const date1 = new Date()
    const weekNum = date1.getDay()
    const date2 = new Date(Number(date1)+(1000*60*60*24))
    const date3 = new Date(Number(date1)+(1000*60*60*24*2))
    const date4 = new Date(Number(date1)+(1000*60*60*24*3))

    
    const[day1] = useState({
        time:Number(date1),
        week:date1.toString().slice(0,3),
        month:date1.toString().slice(4,7),
        day:date1.toString().slice(8,10),
        year:date4.toString().slice(11,15)
    })
    const[day2] = useState({
        time:Number(date2),
        week:date2.toString().slice(0,3),
        month:date2.toString().slice(4,7),
        day:date2.toString().slice(8,10),
        year:date4.toString().slice(11,15)
    })
    const[day3] = useState({
        time:Number(date3),
        week:date3.toString().slice(0,3),
        month:date3.toString().slice(4,7),
        day:date3.toString().slice(8,10),
        year:date4.toString().slice(11,15)
    })
    const[day4] = useState({
        time:Number(date4),
        week:date4.toString().slice(0,3),
        month:date4.toString().slice(4,7),
        day:date4.toString().slice(8,10),
        year:date4.toString().slice(11,15)
    })
    

    const [choseDate,setChoseDate]=useState(weekNum)

      const navigate = useNavigate()


      const[selectedWeak,setSelectedWeak]=useState(1)
      const[timeStamp,setTimeStamp]=useState(admin?.movies[admin.movies.findIndex((item)=>item.movieId==movieId)]?.timeStamp)

      const[time,settime]=useState("")
      const[price,setPrice]=useState("")
      const [movieLanguage,setMovieLanguage]=useState(admin?.movies[admin.movies.findIndex((item)=>item.movieId==movieId)]?.language)
      const [movieFormat,setMovieFormat]=useState(admin?.movies[admin.movies.findIndex((item)=>item.movieId==movieId)]?.format)

      const addTime = ()=>{        
        if (!time || !price || !movieFormat || !movieLanguage){
            toast.info("Fill empty fields")
        }else if(!admin.seats){
          toast.info("Please arrange seat format in the settings")
        }else{
            setTimeStamp({...timeStamp,[selectedWeak]:[...timeStamp[selectedWeak],{price,time}]})
        }
      }
      
      

      const deleteTime = (index) => {
        let array = timeStamp[selectedWeak]
        array.splice(index,1)
        setTimeStamp({...timeStamp,[selectedWeak]:array})
      }

      const getMovie = async () => {
        const token = sessionStorage.getItem("token")
        if(token){
          try{
            const reqHeader = {
              "Authorization":`Bearer ${token}`,
              "Content-Type":"application/json"
            }
            const result = await getAMovieAPI(movieId,reqHeader)
            if(result.status==200){
              setGotMovie(result.data)
              setLoading(false)
            }
          }catch(err){
            toast.warn(err)
          }
        }else{
          toast.warn("login again")
        }
      }


      useEffect(()=>{
        getMovie()
      },[])

      useEffect(()=>{
        var act = true
        var act2 = false
        if(!movieFormat || !movieLanguage){
          act = false
        }
        var array = Object.values(timeStamp)

        array.forEach((item)=>{
          if(item.length>0){            
            act2 = true
            return
          }
        })
        
        if(act && act2){
        let index = admin.movies.findIndex((item)=>item.movieId==movieId)
        let obj = {...admin?.movies[index]}
        obj = {...obj,timeStamp,language:movieLanguage,format:movieFormat}
        let movies = [...admin.movies]
        movies[index]=obj
        setAdmin({...admin,movies})
        }
        

      },[timeStamp,movieLanguage,movieFormat])

      const[timeId,setTimeId]=useState(day1)

      useEffect(()=>{
        if(choseDate == weekNum){
          setTimeId(day1)
        }
        else if(choseDate == (weekNum+1>7?weekNum+1-7:weekNum+1)){
          setTimeId(day2)
        }
        else if(choseDate == (weekNum+2>7?weekNum+2-7:weekNum+2)){
          setTimeId(day3)
        }
        else if(choseDate == (weekNum+3>7?weekNum+3-7:weekNum+3)){
          setTimeId(day4)
        }
      },[choseDate])

      const handleDeleteMovie = async() => {
        setAdmin({...admin,movies:admin.movies.filter(item=>item.movieId!=movieId)})
        try{
          const token = sessionStorage.getItem("token")
          const reqHeader = {
            "Authorization":`Bearer ${token}`,
            "Content-Type":"application/json"
          }
          const result = await removeFromTheatreListAPI(movieId,reqHeader)
        }catch(err){
          console.log(err);
          
        }   
        navigate('/admin')
      }
      

  return (
    <div>
      <AdminHeader/>
      {
        loading?
          <div className='d-flex justify-content-center align-items-center' style={{height:"50dvh"}}><InfinitySpin visible={true} width="200" color="#000000" ariaLabel="infinity-spin-loading"/></div>:
          <>
      <div className="bgbg" style={{backgroundImage:`url(${gotMovie?.cover})`,height:`${isMobile?"200px":"500px"}`}}>
        <div className={`bg d-flex ${isMobile?"py-2":"p-5 py-4"}`}>
            <img src={gotMovie?.poster} className={`${isMobile?"ms-2":"ms-5 me-5"}`} alt="" />
            <div className="d-flex flex-column justify-content-center ms-4 text-light gap-3" style={{height:'100%'}}>
                <h1>{gotMovie?.name}</h1>
                {
                    isMobile?<></>:
                    <div className='d-flex flex-column gap-3'>
                        <div><button className='btn btn-lg btn-secondary fs-5'><i className="fa-solid fa-star"></i>{gotMovie?.rating}</button></div>
                        <span>
                          <button className='btn btn-sm btn-light'>
                            {gotMovie?.format.map((item)=>(
                              `${item}, `
                            ))}
                          </button>
                          <button className='btn btn-sm btn-light ms-3'>
                            {gotMovie?.languages.map((item)=>(
                              `${item}, `
                            ))}
                          </button>
                        </span>
                        <p>{gotMovie?.duration}<i className="fa-solid fa-circle fa-2xs ms-3 me-2"></i>{gotMovie?.type.map((item)=>(`${item}, `))}<i className="fa-solid fa-circle fa-2xs ms-3"></i> {gotMovie?.rated} <i className="fa-solid fa-circle fa-2xs ms-3 me-2"></i>{gotMovie?.releaseDate}</p>
                    </div>
                }
                <div><button className={`btn ${isMobile?"":"btn-lg"} btn-danger`} onClick={handleDeleteMovie}>Delete Movie</button></div>
            </div>
        </div>
      </div>

      <div className="container shadow py-5 pt-3 my-3">
      <div className="d-flex row justify-content-end mb-3">
        <div className={isMobile?"col-4":"col-3"}>
          <select name="" defaultValue={""} className='form-control' id="" value={movieLanguage} onChange={(e)=>setMovieLanguage(e.target.value)}>
            <option disabled value="">Select Language</option>
            {
              gotMovie?.languages.map((item,index)=>(
                <option key={index} value={item}>{item}</option>
              ))
            }
          </select>
        </div>
        <div className={isMobile?"col-4":"col-3"}>
          <select name="" defaultValue={""} className='form-control' id="" value={movieFormat} onChange={(e)=>setMovieFormat(e.target.value)}>
            <option disabled value="">Select Format</option>
            {
              gotMovie?.format.map((item,index)=>(
                <option key={index} value={item}>{item}</option>
              ))
            }
          </select>
        </div>
      </div>
      <div className="d-flex gap-2">
                <button className={`btn rounded-5 px-3 ${selectedWeak==1?"btn-danger":""}`} onClick={()=>setSelectedWeak(1)}>
                    <div>Mon</div>
                </button>
                <button className={`btn rounded-5 px-3 ${selectedWeak==2?"btn-danger":""}`} onClick={()=>setSelectedWeak(2)}>
                    <div>Tue</div>
                </button>
                <button className={`btn rounded-5 px-3 ${selectedWeak==3?"btn-danger":""}`} onClick={()=>setSelectedWeak(3)}>
                    <div>Wed</div>
                </button>
                <button className={`btn rounded-5 px-3 ${selectedWeak==4?"btn-danger":""}`} onClick={()=>setSelectedWeak(4)}>
                    <div>Thu</div>
                </button>
                <button className={`btn rounded-5 px-3 ${selectedWeak==5?"btn-danger":""}`} onClick={()=>setSelectedWeak(5)}>
                    <div>Fri</div>
                </button>
                <button className={`btn rounded-5 px-3 ${selectedWeak==6?"btn-danger":""}`} onClick={()=>setSelectedWeak(6)}>
                    <div>Sat</div>
                </button>
                <button className={`btn rounded-5 px-3 ${selectedWeak==7?"btn-danger":""}`} onClick={()=>setSelectedWeak(7)}>
                    <div>Sun</div>
                </button>
            </div>
            <div className="row mt-5 align-items-center">
                <div className={`${isMobile?"col-3":"col-2"}`}>
                    <input type="number" className='form-control'  placeholder='Ticket Price' value={price} onChange={(e)=>setPrice(e.target.value)} />
                </div>
                <div className={`${isMobile?"col-2":"col-2"}`}>
                    <input type="time" className='form-control' value={time} onChange={(e)=>settime(e.target.value)}/>
                </div>
                <div className={`btn btn-success ${isMobile?"col-4":"col-2"}`} onClick={addTime}>Add Time Slot</div>
            </div>
            <div className="d-flex flex-wrap gap-4 mt-4">
                {
                    timeStamp[selectedWeak].map((item,index)=>(
                        <div key={index} className='shadow ps-3 d-flex align-items-center gap-3 py-2 text-success'>
                            <div>
                                <div>{item?.time}</div>
                                <div>₹ {item?.price}</div>
                            </div>
                            <button className='btn shadow-0 m-0' onClick={()=>deleteTime(index)}><i className="text-danger fa-solid fa-trash"></i></button>
                        </div>
                    ))
                }
            </div>
      </div>


        <div className="container shadow mt-5 px-3 py-3">
            <div className="col-4 gap-2 d-flex position-relative">
                <button className={`btn rounded-5 px-3 ${choseDate==weekNum?"btn-danger":""}`} onClick={()=>setChoseDate(weekNum)}>
                    <div>{day1.week}</div>
                    <div>{day1.day}</div>
                    <div>{day1.month}</div>
                </button>
                <button className={`btn rounded-5 px-3 ${choseDate==(weekNum+1>7?weekNum+1-7:weekNum+1)?"btn-danger":""}`} onClick={()=>setChoseDate(weekNum+1>7?weekNum+1-7:weekNum+1)}>
                    <div>{day2.week}</div>
                    <div>{day2.day}</div>
                    <div>{day2.month}</div>
                </button>
                <button className={`btn rounded-5 px-3 ${choseDate==(weekNum+2>7?weekNum+2-7:weekNum+2)?"btn-danger":""}`} onClick={()=>setChoseDate(weekNum+2>7?weekNum+2-7:weekNum+2)}>
                    <div>{day3.week}</div>
                    <div>{day3.day}</div>
                    <div>{day3.month}</div>
                </button>
                <button className={`btn rounded-5 px-3 ${choseDate==(weekNum+3>7?weekNum+3-7:weekNum+3)?"btn-danger":""}`} onClick={()=>setChoseDate(weekNum+3>7?weekNum+3-7:weekNum+3)}>
                    <div>{day4.week}</div>
                    <div>{day4.day}</div>
                    <div>{day4.month}</div>
                </button>
            </div>
            <div className="row mt-3 py-3">
                <div className="col-8 d-flex gap-1 py-1" style={{overflowX:isMobile?"scroll":""}}>
                    {
                      admin.movies[movieIndex]?.timeStamp[choseDate==0?7:choseDate]?.map((item)=>(
                        <AdminSeat key={item.time+timeId.month+"-"+timeId.day} time={item.time} price={item.price} seat={admin.seats} movieId={movieId} timeId={timeId} language={admin.movies[movieIndex]?.language} format={admin.movies[movieIndex]?.format} movieName={gotMovie?.name} theatreName={`${admin?.theatreName}, ${admin?.city}`}/>
                      ))
                    }
                </div>
            </div>
        </div>
      <div className="container my-5">
        {
            isMobile?
            <div className='card pb-3 mb-4'>
                <div><button className='btn btn-secondary'><i className="fa-solid fa-star"></i> {gotMovie?.rating}</button></div>
                <div>
                <button className='btn border btn-light me-3 my-1'>{gotMovie?.format.map((item)=>`${item}, `)}</button>
                <button className='btn border btn-light'>{gotMovie?.languages.map((item)=>`${item}, `)}</button>
                <button className='btn border btn-light me-3 my-1'>{gotMovie?.duration}</button>
                <button className='btn border btn-light me-3 my-1'>{gotMovie?.type.map((item)=>`${item}, `)}</button>
                <button className='btn border btn-light me-3 my-1'>{gotMovie?.rated}</button>
                <button className='btn border btn-light me-3 my-1'> {gotMovie?.releaseDate}</button>
                </div>
            </div>:<></>
        }
        <h3 className='fw-bold'>About the movie</h3>
        <p >{gotMovie?.about}</p>
        <h3 className='fw-bold mt-3'>Cast</h3>
        <ul>
          {
            gotMovie?.cast.map((item,index)=>(
              <li key={index}>{item}</li>
            ))
          }
        </ul>
        <h3 className='fw-bold mt-3'>Crew</h3>
        <ul>
          {
            gotMovie?.crew.map((item,index)=>(
              <li key={index}>{item}</li>
            ))
          }
        </ul>
      </div>
      </>
      }
      <Footer/>
    </div>
  )
}

export default AdminMovie
