import './Header.css'
import favIcon from '../images/favIcon.jpg'
import { MDBInputGroup } from 'mdb-react-ui-kit'
import { useEffect, useState } from 'react'
import { Button, Modal, Offcanvas } from 'react-bootstrap'
import avatar from '../images/avatar.png'
import { useNavigate } from 'react-router-dom'
import ahmedabad from '../images/ahmedabad.avif'
import banglore from '../images/banglore.png'
import chandigarh from '../images/chandigarh.png'
import chennai from '../images/chennai.avif'
import delhi from '../images/delhi.avif'
import hyderabad from '../images/hyderabad.png'
import kochi from '../images/kochi.avif'
import kolkata from '../images/kolkata.avif'
import mumbai from '../images/mumbai.png'
import pune from '../images/pune.png'
import { Flip, toast ,ToastContainer} from 'react-toastify'
import { allCities } from '../assets/allCities'
import { getMovieNamesApi, getTheatreNamesApi } from '../Services/allAPI'


function Header() {
    const[logged,setLogged]=useState(sessionStorage.getItem("token")?true:false)
    const [isMobile] = useState(window.innerWidth<1000?true:false)
    const navigate = useNavigate()
    const [showOC, setShowOC] = useState(false);

    const handleCloseOC = () => setShowOC(false);
    const handleShowOC = () => setShowOC(true);

    const [showM, setShowM] = useState(false);

    const handleCloseM = () => {
      if(city){
        setShowM(false)
      }
    };


    const [cities]=useState(allCities)
    const [city,setCity]=useState(sessionStorage.getItem("city")??"")
    const[searchCity,setSearchCity] = useState("")
    const[searchvalue,setSearchValue]=useState("")
    

    const handleShowM = () => {
      setShowM(true)
    }


    const changeCity = (item)=>{
      setCity(item)
      setSearchCity("")
      setShowM(false)
      sessionStorage.setItem("city",item)
    }


    const getLocation =async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if(!position.coords.latitude && !position.coords.longitude){
              toast.info("location cannot be obtained")
            }else{
              setShowM(false)
              fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=5&appid=b9b35dd7c967c2a9827580e8c51cbe91`)
              .then(response=>response.json())
              .then(data=>setCity(data[0].name))
              .catch(err=>console.log(err))
            }
          },
          (error) => {
            toast.info("location cannot be obtained")
          }
        )
      } else {
        toast.info("location cannot be obtained")
      }
    }

    useEffect(()=>{
      if(!city){
        setShowM(true)
      }
      setShowOC(false)
    },[city])



    const toAdmin = () => {
      sessionStorage.clear()
      navigate('/admin')
    }

    const handleSignOut = () => {
      setLogged(false)
      sessionStorage.removeItem("token")
      sessionStorage.removeItem("profilePic")
      sessionStorage.removeItem("name")
      navigate('/')
    }

    const [movieNames,setMovieNames]=useState([])
    const [theatreNames,setTheatreNames]=useState([])
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
            }else{
                toast.warn("Failed to fetch Movie details")
                console.log("Failed to fetch Movie details")
            }
        }catch(err){
            toast.warn("Failed to fetch Movie details")
            console.log("Failed to fetch Movie details",err)
        }
    }
    const getTheatreNames = async () => {
        try{ 
            const result = await getTheatreNamesApi()
            if(result.status==200){
                setTheatreNames(result.data)
            }else{
                toast.warn("Failed to fetch Theatre details")
                console.log("Failed to fetch Theatre details")
            }
        }catch(err){
            toast.warn("Failed to fetch Theatre details")
            console.log("Failed to fetch Theatre details",err)
        }
    }
    useEffect(()=>{
      getMovieNames()
      getTheatreNames()
    },[])

    const navigation = (id) => {
      if(sessionStorage.getItem("token")){
        navigate(`/theatre/${id}`)
      }else{
        toast.info("Please login to proceed booking")
      }
    }

  return (
    <div>
      <ToastContainer position="top-center" theme="colored" transition={Flip} autoClose={2500} />
      <div className={`container d-flex ${isMobile?"flex-wrap":""} align-items-center py-3 border-bottom`}>
        <div className="logo fs-3 d-flex align-items-center" style={{cursor:"pointer"}} onClick={()=>navigate('/')}>
            <span>Seat</span>
            <img src={favIcon} className='m-1 my-2' width={'40px'} alt="" />
            <span>Scout</span>
        </div>
        <div className={`d-flex align-items-center justify-content-between container ${isMobile?"mt-3":""}`}>
            <MDBInputGroup noBorder className='w-75' textBefore={<i className="fa-solid fa-magnifying-glass fa-xl"></i>}>
                <input className='form-control' type='text' placeholder='Search Movies or Theatres' value={searchvalue} onChange={(e)=>setSearchValue(e.target.value)}/>
                <br />
                <div className="position-absolute z-index-10 w-75 mt-5 ms-5">
                  {
                    movieNames.length>0?
                    movieNames
                    .filter(item=>!searchvalue?false:true)
                    .filter(item=>item.name.toLowerCase().includes(searchvalue.toLowerCase()))
                    .slice(0,3)
                    .map((item,index)=>(
                      <div key={index} className="form-control pointer" onClick={()=>navigate(`/movie/${item?._id}`)}>
                        {item?.name}
                      </div>
                    ))
                    :<></>
                  }
                  {
                    theatreNames.length>0?
                    theatreNames
                    .filter(item=>!searchvalue?false:true)
                    .filter(item=>item.theatreName.toLowerCase().includes(searchvalue.toLowerCase()) || item.city.toLowerCase().includes(searchvalue.toLowerCase()))
                    .slice(0,3)
                    .map((item,index)=>(
                      <div key={index} className="form-control pointer" onClick={()=>navigation(item._id)}>
                        {item?.theatreName}, {item?.city}
                      </div>
                    ))
                    :<></>
                  }
                </div>
            </MDBInputGroup>
            {
                isMobile?<button className='btn' onClick={handleShowOC}><i className="fa-solid fa-bars fa-xl"></i></button>
                :<div className='d-flex align-items-center'>
                <div className="place">
                    <button className='btn shadow-0' style={{width:"170px"}} onClick={handleShowM}>{city} <i className="fa-solid fa-angle-down"></i></button>
                </div>
                {
                    logged?
                    <div className="profile d-flex align-items-center" onClick={handleShowOC}>
                        <button className='btn ms-2 btn-lg ' style={{width:"170px"}}><i className="fa-solid fa-user fa-xl me-3"></i> {sessionStorage.getItem("name").split(" ")[0]}</button>
                    </div>:
                    <div className="profile d-flex align-items-center">
                        <button className='btn btn-dark ms-2' style={{width:"120px"}} onClick={()=>navigate('/auth')}>Sign In</button>
                        <button className='btn px-3 ms-2' onClick={handleShowOC}><i className="fa-solid fa-bars fa-xl"></i></button>
                    </div>
                }
                </div>
            }
        </div>
      </div>


      <Offcanvas show={showOC} onHide={handleCloseOC} placement='end'>
        <Offcanvas.Header closeButton={isMobile} className='border-bottom'>
          <Offcanvas.Title>
            {
              logged?
              <div className='d-flex justify-content-between align-items-center gap-3'>
                <div className="avatar">
                  <img src={sessionStorage.getItem("profilePic")?sessionStorage.getItem("profilePic"):avatar} width={"50px"} height={"50px"} alt="profile" className='mb-2' style={{borderRadius:"50%"}} />
                </div>
                <div className="name">
                  <h2 className='fs-4'>{sessionStorage.getItem("name")}</h2>
                  <p className='fs-6' style={{cursor:"pointer"}} onClick={()=>navigate('/profile')}>Edit Profile <i className="fa-solid fa-angle-right"></i></p>
                </div>
              </div>
              :
              <div className='d-flex flex-column gap-1'>
                <>Hey!</>
                <button className='btn btn-dark' onClick={()=>navigate('/auth')}>Register / Login</button>
              </div>
            }
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="place d-flex align-items-center border-bottom pb-3">
            Location <button className='btn shadow-0' onClick={handleShowM}>{city} <i className="fa-solid fa-angle-down"></i></button>
          </div>
          <div className='border-bottom py-3' onClick={()=>navigate("/movies")} style={{cursor:"pointer"}}>
            Movies
          </div>
          <div className='border-bottom py-3 ' onClick={()=>navigate("/theatres")} style={{cursor:"pointer"}}>
            Theatres
          </div>
          <div className='border-bottom py-3' onClick={()=>navigate("/bookings")} style={{cursor:"pointer"}}>
            Bookings
          </div>
          <div className='border-bottom py-3' onClick={toAdmin} style={{cursor:"pointer"}}>
            Admin Section
          </div>
          
          {
            logged?<div className='text-center mt-5'><button className='btn btn-outline-danger w-75' onClick={()=>handleSignOut()}>Sign Out</button></div>:<></>
          }
        </Offcanvas.Body>
      </Offcanvas>



      <Modal show={showM} onHide={handleCloseM} size={"xl"}>
        <Modal.Header>
          <Modal.Title style={{width:"100%"}}>
            <MDBInputGroup noBorder textBefore={<i className="fa-solid fa-magnifying-glass fa-xl"></i>}>
                <input className='form-control' type='text' placeholder='Search for your City' value={searchCity} onChange={(e)=>setSearchCity(e.target.value)} />
            </MDBInputGroup>
            <>
              {
                searchCity?
                <div className='position-absolute border bg-light ms-5 form-control' style={{zIndex:"4",width:"93%"}}>
                  {
                    cities.filter(item=>item.toLowerCase().search(searchCity.toLowerCase())!=-1).slice(0,7).map((item,index)=>(
                      <p key={index} onClick={()=>changeCity(item)} style={{cursor:"pointer"}}>{item}</p>
                    ))
                  }
                </div>
                :<></>
              }
            </>
            <button className='btn shadow-0 text-danger mt-3' onClick={getLocation}><i className="fa-solid fa-location-crosshairs fa-lg"></i> Detect My Location</button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="popular border-bottom pb-2">
            <p className='text-center m-0 p-0'>Popular Cities</p>
            <div className="row mt-2">
              <div className="col d-flex flex-column align-items-center" onClick={()=>changeCity("Mumbai")} style={{cursor:"pointer"}}>
                <img src={mumbai} alt="" />
                <span>Mumbai</span>
              </div>
              <div className="col d-flex flex-column align-items-center" onClick={()=>changeCity("Kochi")} style={{cursor:"pointer"}}>
                <img src={kochi} alt="" />
                <span>Kochi</span>
              </div>
              <div className="col d-flex flex-column align-items-center" onClick={()=>changeCity("Bangalore")} style={{cursor:"pointer"}}>
                <img src={banglore} alt="" />
                <span>Bangalore</span>
              </div>
              <div className="col d-flex flex-column align-items-center" onClick={()=>changeCity("Hyderabad")} style={{cursor:"pointer"}}>
                <img src={hyderabad} alt="" />
                <span>Hyderabad</span>
              </div>
              <div className="col d-flex flex-column align-items-center" onClick={()=>changeCity("Chennai")} style={{cursor:"pointer"}}>
                <img src={chennai} alt="" />
                <span>Chennai</span>
              </div>
              <div className="col d-flex flex-column align-items-center" onClick={()=>changeCity("Pune")} style={{cursor:"pointer"}}>
                <img src={pune} alt="" />
                <span>Pune</span>
              </div>
              <div className="col d-flex flex-column align-items-center" onClick={()=>changeCity("Kolkata")} style={{cursor:"pointer"}}>
                <img src={kolkata} alt="" />
                <span>Kolkata</span>
              </div>
              <div className="col d-flex flex-column align-items-center" onClick={()=>changeCity("Delhi")} style={{cursor:"pointer"}}>
                <img src={delhi} alt="" />
                <span>Delhi</span>
              </div>
              <div className="col d-flex flex-column align-items-center" onClick={()=>changeCity("Chandigarh")} style={{cursor:"pointer"}}>
                <img src={chandigarh} alt="" />
                <span>Chandigarh</span>
              </div>
              <div className="col d-flex flex-column align-items-center" onClick={()=>changeCity("Ahmedabad")} style={{cursor:"pointer"}}>
                <img src={ahmedabad} alt="" />
                <span>Ahmedabad</span>
              </div>
            </div>
          </div>
          <div className="other">
            <p className='text-center mt-3'>Other Cities</p>
            <div className="contain border d-flex flex-wrap" style={{width:"100%",height:"300px",overflow:"scroll"}}>
              {
                cities?.length>0?cities.sort().map((item,index)=>(
                  <div key={index} style={{height:"30px",cursor:"pointer"}}  className={`text-center ${isMobile?"w-50":"w-25"}`} onClick={()=>changeCity(item)}>{item}</div>
                )):<></>
              }
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" disabled={!city?true:false} onClick={handleCloseM}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


    </div>
  )
}

export default Header
