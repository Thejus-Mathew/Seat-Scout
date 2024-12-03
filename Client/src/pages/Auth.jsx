import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { MDBBtn, MDBInput } from 'mdb-react-ui-kit'
import { toast } from 'react-toastify'
import { loginUserApi, registerUserApi } from '../Services/allAPI'
import { useNavigate } from 'react-router-dom'
import { serverURL } from '../Services/serverURL'

function Auth() {
  const [isMobile] = useState(window.innerWidth<1000?true:false)
  const[register,setRegister]=useState(true)
  const[userData,setUserData]=useState({
    fullname:"",
    email:"",
    password:""
  })
  const navigate = useNavigate()


  useEffect(()=>{
    setUserData({
      fullname:"",
      email:"",
      password:""
    })
  },[register])


  const handleLogin =async () => {
    try{
      const {email,password} = userData
      if(!email || !password){
        toast.info("Fill Empty fields")
      }else{
        const result = await loginUserApi({email,password})
        console.log(result);        
        if(result.status==200){
          sessionStorage.setItem("token",result.data.token)
          sessionStorage.setItem("profilePic",result.data.profilePic?`${serverURL}/uploads/${result.data.profilePic}`:"")
          sessionStorage.setItem("name",result.data.name)
          navigate('/')
        }else{
          toast.warn(result?.response?.data?result.response.data:result.message)
        }
      }

    }catch(err){
      console.log(err);
    }
  }


  const handleRegister =async () => {
    try{
      const {email,password,fullname} = userData
      if(!email || !password || !fullname){
        toast.info("Fill Empty fields")
      }else{
        const result = await registerUserApi({email,password,name:fullname})
        if(result.status != 201){
          toast.warn(result?.response?.data?result.response.data:result.message)
        }else{
          toast.success(`Welcome ${fullname}`)
          setRegister(true)
          setUserData({
            fullname:"",
            email:"",
            password:""
          })
        }
      }
    }catch(err){
      console.log(err);
    }
  }
  return (
    <div>
      <Header/>
      <div className="px-3 py-5" style={{backgroundColor:"rgb(240,240,240)"}}>
        <div className={`auth my-5 container border ${isMobile?"":"w-50"} rounded shadow ${register?"register":""}`}>
          <div className="row">
            {
              !register?
              <div className="col-6 px-4 gap-3 d-flex flex-column align-items-center justify-content-center" style={{height:isMobile?"35vh":"45vh"}}>
                <h2 className='fw-bolder'>Register</h2>
                <MDBInput label="Full Name"  type="text" size={isMobile?"sm":"md"} value={userData.fullname} onChange={(e)=>setUserData({...userData,fullname:e.target.value})}/>
                <MDBInput label="Email"  type="email" size={isMobile?"sm":"md"} value={userData.email} onChange={(e)=>setUserData({...userData,email:e.target.value})}/>
                <MDBInput label="Password"  type="password" size={isMobile?"sm":"md"} value={userData.password} onChange={(e)=>setUserData({...userData,password:e.target.value})}/>
                <MDBBtn color='dark' size={isMobile?"sm":"md"} onClick={handleRegister}>Register</MDBBtn>
              </div>:
              <div className={`col-6 gap-1 text-light d-flex align-items-center justify-content-center flex-column ${isMobile?"":"gap-3"}`} style={{height:isMobile?"35vh":"45vh"}}>
                <h1 className='p-0 m-0'>Welcome</h1>
                <p className='p-0 m-0 text-center'>Don't have an account?</p>
                <MDBBtn color='light' onClick={()=>setRegister(false)} size={isMobile?"sm":"md"}>Register here</MDBBtn>
              </div>
            }
            {
              !register?
              <div className={`col-6 gap-1 text-light d-flex align-items-center justify-content-center flex-column ${isMobile?"":"gap-3"}`}>
                <h1 className='p-0 m-0'>Welcome</h1>
                <p className='p-0 m-0 text-center'>Have an account?</p>
                <MDBBtn color='light' onClick={()=>setRegister(true)} size={isMobile?"sm":"md"}>Login here</MDBBtn>
              </div>:
              <div className="col-6 py-5 px-4 gap-3 d-flex flex-column align-items-center justify-content-center">
                <h2 className='fw-bolder'>Login</h2>
                <MDBInput label="Email"  type="email" size={isMobile?"sm":"md"} value={userData.email} onChange={(e)=>setUserData({...userData,email:e.target.value})}/>
                <MDBInput label="Password"  type="password" size={isMobile?"sm":"md"} value={userData.password} onChange={(e)=>setUserData({...userData,password:e.target.value})}/>
                <MDBBtn color='dark' size={isMobile?"sm":"md"} onClick={handleLogin}>Login</MDBBtn>
              </div>
            }
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Auth
