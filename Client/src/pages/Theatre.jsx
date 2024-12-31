import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getATheatreApi, getMovieNamesApi } from '../Services/allAPI'
import UserSeat from '../components/UserSeat'
import { InfinitySpin } from 'react-loader-spinner'

function Theatre() {
    const {theatreId} = useParams()
    const [theatre,setTheatre]=useState({})
    const [movieNames,setMovieNames]=useState([])
    const [loading,setLoading]=useState(true)
    const [loading1,setLoading1]=useState(true)

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
    

    const navigate = useNavigate()

    const getTheatre = async()=>{
        try{
            const token = sessionStorage.getItem("token")
            const reqHeader = {
                "Authorization":`Bearer ${token}`,
                "Content-Type":"application/json"
            }
            const result = await getATheatreApi(theatreId,reqHeader)
            if(result.status==200){
                setTheatre(result.data)
                setLoading(false)
            }else{
                toast.warn("Failed to fetch Theatre details")
                console.log("Failed to fetch Theatre details",err)
            }

        }catch(err){
            toast.warn("Failed to fetch Theatre details")
            console.log("Failed to fetch Theatre details",err)
        }
    }


    const getMovieNames = async () => {
        try{
            const token = sessionStorage.getItem("token")
            const reqHeader = {
                "Authorization":`Bearer ${token}`,
                "Content-Type":"application/json"
            } 
            const result = await getMovieNamesApi(reqHeader)
            if(result.status==200){
                setMovieNames(result.data)
                setLoading1(false)
            }else{
                toast.warn("Failed to fetch Movie details")
                console.log("Failed to fetch Movie details",err)
            }
        }catch(err){
            toast.warn("Failed to fetch Movie details")
            console.log("Failed to fetch Movie details",err)
        }
    }

    useEffect(()=>{
        getTheatre()
        getMovieNames()
    },[])
    

  return (
    <div>
      <Header/>
      {
        loading || loading1?
        <div className='d-flex justify-content-center align-items-center' style={{height:"65dvh"}}><InfinitySpin visible={true} width="200" color="#000000" ariaLabel="infinity-spin-loading"/></div>:
        <>
      <div className="container mt-5">
        <h2 className='fw-bold'>{theatre?.theatreName}, {theatre?.city}</h2>
        <p>{theatre?.address}, {theatre?.landmark}, {theatre?.city}, {theatre?.state}, {theatre?.pinCode}, India</p>
      </div>
      <div className="container mb-5 card shadow-5 border border-3">
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
            theatre?.movies?.length>0?
            theatre?.movies.map((item,index)=>(
                <div key={index} className="row mt-3 shadow py-3">
                    <div className="col-4">
                        <p className='m-0 ' style={{cursor:"pointer"}} onClick={()=>navigate('/movie')}>{movieNames.find(movie=>movie._id==item?.movieId)?.name} ({movieNames.find(movie=>movie._id==item?.movieId)?.rated})</p>
                        <p className='m-0' style={{fontSize:"13px"}}>{item?.language}, {item?.format}</p>
                    </div>
                    <div className="col-8 d-flex gap-1 py-1" style={{overflowX:isMobile?"scroll":""}}>
                        {
                            item.timeStamp[choseDate==0?7:choseDate]
                            .map((item2)=>(
                                <UserSeat key={timeId.day+"-"+timeId.month+"-"+item2.time} time={item2.time} price={item2.price} seat={theatre?.seats} movieId={item?.movieId} theatreId={theatreId} timeId={timeId} language={item?.language} format={item?.format} movieName={movieNames.find(movie=>movie._id==item?.movieId)?.name} theatreName={`${theatre?.theatreName}, ${theatre?.city}`}/>
                            ))
                        }
                    </div>
                </div>
            ))
            :<></>   
        }    
      </div>
      </>
        }
      <Footer/>
    </div>
    
  )
}

export default Theatre
