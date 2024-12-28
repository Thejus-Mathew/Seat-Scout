import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getAMovieAPI, getTheatresListApi } from '../Services/allAPI'
import UserSeat from '../components/UserSeat'

function BookingStart() {
    const [isMobile] = useState(window.innerWidth<1000?true:false)
    const date1 = new Date()
    const weekNum = date1.getDay()
    const date2 = new Date(Number(date1)+(1000*60*60*24))
    const date3 = new Date(Number(date1)+(1000*60*60*24*2))
    const date4 = new Date(Number(date1)+(1000*60*60*24*3))
    
    
    const[day1] = useState({
        time:Number(date1),
        week:date1.toString().slice(0,3),
        day:date1.toString().slice(4,7),
        month:date1.toString().slice(8,10),
        year:date1.toString().slice(11,15),
    })
    const[day2] = useState({
        time:Number(date2),
        week:date2.toString().slice(0,3),
        day:date2.toString().slice(4,7),
        month:date2.toString().slice(8,10),
        year:date1.toString().slice(11,15),
    })
    const[day3] = useState({
        time:Number(date3),
        week:date3.toString().slice(0,3),
        day:date3.toString().slice(4,7),
        month:date3.toString().slice(8,10),
        year:date1.toString().slice(11,15),
    })
    const[day4] = useState({
        time:Number(date4),
        week:date4.toString().slice(0,3),
        day:date4.toString().slice(4,7),
        month:date4.toString().slice(8,10),
        year:date1.toString().slice(11,15),
    })

    const [choseDate,setChoseDate]=useState(weekNum)

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

    const [theatres,setTheatres]=useState([])
    
    const getTheatres = async() => {
        try{
            const token = sessionStorage.getItem("token")
            const reqHeader = {
                "Authorization":`Bearer ${token}`,
                "Content-Type":"application/json"
            }
            
            const result = await getTheatresListApi(movieId,reqHeader)
            if(result.status==200){
                setTheatres(result.data.theatres)
            }

        }catch(err){
          toast.warn("Failed to fetch theatres data")
          console.log("Failed to fetch theatres data",err);
        }
    }
    useEffect(()=>{
        getMovie()
        getTheatres()
    },[])
    
  

    const navigate = useNavigate()


    useEffect(()=>{
        if(!sessionStorage.getItem("token")){
            navigate('/')
        }
    },[])

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
        </div>
        {
            theatres.length>0?
            theatres.map((theatreItem,index1)=>(
                <div key={index1} className="row mt-3 shadow py-3">
                    <div className="col-4">
                        <p>{theatreItem?.theatreName}, {theatreItem?.city}</p>
                    </div>
                    <div className="col-8 d-flex gap-1">
                        {
                            theatreItem.movies.find(movieItem=>movieItem.movieId==movieId)
                            .timeStamp[choseDate]
                            .map((item)=>(
                                <UserSeat key={timeId.day+"-"+timeId.month+"-"+item.time+"-"+choseDate} time={item.time} price={item.price} seat={theatreItem.seats} movieId={movieId} theatreId={theatreItem._id} timeId={timeId} language={theatreItem.movies.find(movieItem=>movieItem.movieId==movieId).language} format={theatreItem.movies.find(movieItem=>movieItem.movieId==movieId).format} movieName={movie?.name} theatreName={`${theatreItem?.theatreName}, ${theatreItem?.city}`}/>
                            ))
                        }
                    </div>
                </div>
            ))
            :<></>
        }
      </div>
      <Footer/>
    </div>
    
  )
}

export default BookingStart
