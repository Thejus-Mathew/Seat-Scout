import '../components/Header.css'
import favIcon from '../images/favIcon.jpg'
import { MDBInputGroup } from 'mdb-react-ui-kit'
import { useContext, useEffect, useState } from 'react'
import { Button, Modal, Offcanvas } from 'react-bootstrap'
import avatar from '../images/avatar.png'
import { useNavigate, useParams } from 'react-router-dom'
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
import AdminSeats from './AdminSeats'
import { adminContext } from '../Context/Context'
import { updateAdminAPI } from '../Services/allAPI'


function AdminHeader({auth}) {
    const{admin,setAdmin}=useContext(adminContext)
    const[logged,setLogged]=useState(true)
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
    const [city,setCity]=useState(auth?" ":admin.city?admin.city:"")
    const[searchCity,setSearchCity] = useState("")

    const handleShowM = () => {
      setShowM(true)
    }


    const changeCity = (item)=>{
      setCity(item)
      setSearchCity("")
      setShowM(false)
      setAdmin({...admin,city:item})
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

    const toUser = () => {
      sessionStorage.clear()
      setAdmin("")
      navigate("/")
    }

    const signOut=()=>{
      sessionStorage.clear()
      setAdmin("")
    }

    useEffect(()=>{
      if(!admin){
        setLogged(false)
        sessionStorage.getItem("admin")?setAdmin(JSON.parse(sessionStorage.getItem("admin"))):null
      }else{
        setCity(admin?.city)
        sessionStorage.setItem("admin",JSON.stringify(admin))
      }
    },[admin])

    const updateAdmin =async () => {
      try{
        const token = sessionStorage.getItem("token")
        const reqHeader = {
          "Authorization":`Bearer ${token}`,
          "Content-Type":"application/json"
        }
        const result = await updateAdminAPI(admin,reqHeader)
      }catch(err){
        console.log(err);
      }
    }

    useEffect(()=>{
      if(admin.email){
        updateAdmin()
      }
    },[admin])

  return (
    <>
      <ToastContainer position="top-center" theme="colored" transition={Flip} autoClose={2500} />
      <div className="container-fluid shadow">
        <div className="d-flex justify-content-between container align-items-center mt-3 pb-3 border-bottom">
            <div className="logo fs-3 d-flex align-items-center" style={{cursor:"pointer"}} onClick={()=>navigate('/admin')}>
                <span>Seat</span>
                <img src={favIcon} className='m-1 my-2' width={'40px'} alt="" />
                <span>Scout</span>
            </div>
            {
                isMobile?<button className='btn' onClick={handleShowOC}><i className="fa-solid fa-bars fa-xl"></i></button>
                :<div className='d-flex align-items-center'>
                <div className="place">
                    <button className='btn shadow-0' style={{width:"170px"}} disabled={auth} onClick={handleShowM}>{city} <i className="fa-solid fa-angle-down"></i></button>
                </div>
                {
                    logged?
                    <div className="profile d-flex align-items-center" onClick={handleShowOC}>
                        <button className='btn btn-lg '><i className="fa-solid fa-user fa-xl me-3"></i>{admin?.theatreName}</button>
                    </div>:
                    <div className="profile d-flex align-items-center">
                        <button className='btn btn-dark ms-2' style={{width:"120px"}} onClick={()=>navigate('/adminauth')}>Sign In</button>
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
                  <img src={avatar} width={"50px"} alt="profile" className='mb-2' style={{borderRadius:"50%"}} />
                </div>
                <div className="name">
                  <h2 className='fs-4'>{admin?.theatreName}</h2>
                  <p className='fs-6' style={{cursor:"pointer"}} onClick={()=>navigate('/adminprofile')}>Admin Profile<i className="fa-solid fa-angle-right"></i></p>
                </div>
              </div>
              :
              <div className='d-flex flex-column gap-1'>
                <>Hey!</>
                <button className='btn btn-dark' onClick={()=>navigate('/adminauth')}>Register / Login</button>
              </div>
            }
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="place d-flex align-items-center border-bottom pb-3">
            Location <button className='btn shadow-0' onClick={handleShowM} disabled={auth}>{city} <i className="fa-solid fa-angle-down"></i></button>
          </div>
          <div className='border-bottom py-3' onClick={()=>navigate("/adminbookings")} style={{cursor:"pointer"}}>
            Bookings
          </div>
          {
            auth?<></>
            :<AdminSeats/>
          }
          <div className='border-bottom py-3' onClick={toUser} style={{cursor:"pointer"}}>
            User Section
          </div>
          {
            logged?<div className='text-center mt-5'><button className='btn btn-outline-danger w-75' onClick={signOut}>Sign Out</button></div>:<></>
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
    </>
  )
}

export default AdminHeader
