import React, { useContext, useEffect, useState } from 'react'
import { MDBBtn, MDBInput } from 'mdb-react-ui-kit'
import { toast } from 'react-toastify'
import AdminHeader from '../components/AdminHeader'
import Footer from '../components/Footer'
import { loginAdminAPI, registerAdminAPI } from '../Services/allAPI'
import { json, useNavigate } from 'react-router-dom'
import { adminContext } from '../Context/Context'

function AdminAuth() {
  const{admin,setAdmin}=useContext(adminContext)
  const[loading,setLoading]=useState(false)
    const navigate = useNavigate()
    const [isMobile] = useState(window.innerWidth<1000?true:false)
    const[register,setRegister]=useState(true)
    const[userData,setUserData]=useState({
      theatreName:"",
      email:"",
      password:""
    })
  
  
    useEffect(()=>{
      setUserData({
        theatreName:"",
        email:"",
        password:""
      })
    },[register])
  
  
    const handleLogin =async () => {
      setLoading(true)
      const {email,password} = userData
      if(!email || !password ){
        toast.info("Fill Empty fields")
      }else{
        try{
          const result  = await loginAdminAPI({email,password})
          if(result.status == 200){
            sessionStorage.setItem("token",result.data.token)
            setAdmin(result.data.existingAdmin)
            sessionStorage.setItem("admin",JSON.stringify(result.data.existingAdmin))
            navigate('/admin')
          }else{
            toast.warn(result.response.data || result.message)
          }
        }catch(err){
          toast.warn(err)
        }
      }
      setLoading(false)
    }
  
  
    const handleRegister =async () => {
      setLoading(true)
      const {email,password,theatreName} = userData
      if(!email || !password || !theatreName){
        toast.info("Fill Empty fields")
      }else{
        try{
          const result  = await registerAdminAPI({email,password,theatreName})
          if(result.status == 200){
            setRegister(true)
          }else{
            toast.warn(result.response.data || result.message)
          }
        }catch(err){
          toast.warn(err)
        }
      }
      setLoading(false)
    }


  return (
    <div>
      <AdminHeader auth/>
      <div className="px-3 py-5" style={{backgroundColor:"rgb(240,240,240)"}}>
        <div className={`auth my-5 container border ${isMobile?"":"w-50"} rounded shadow ${register?"register":""}`}>
          <div className="row">
            {
              !register?
              <div className="col-6 px-4 gap-3 d-flex flex-column align-items-center justify-content-center" style={{height:isMobile?"35vh":"45vh"}}>
                <h2 className='fw-bolder'>Register</h2>
                <MDBInput label="Theatre Name"  type="text" size={isMobile?"sm":"md"} value={userData.theatreName} onChange={(e)=>setUserData({...userData,theatreName:e.target.value})}/>
                <MDBInput label="Email"  type="email" size={isMobile?"sm":"md"} value={userData.email} onChange={(e)=>setUserData({...userData,email:e.target.value})}/>
                <MDBInput label="Password"  type="password" size={isMobile?"sm":"md"} value={userData.password} onChange={(e)=>setUserData({...userData,password:e.target.value})}/>
                <MDBBtn color='dark' disabled={loading} size={isMobile?"sm":"md"} onClick={handleRegister}>Register</MDBBtn>
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
                <MDBBtn color='dark' size={isMobile?"sm":"md"} onClick={handleLogin} disabled={loading}>Login</MDBBtn>
              </div>
            }
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default AdminAuth
