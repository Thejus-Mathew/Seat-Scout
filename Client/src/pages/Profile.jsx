import React, { useEffect, useState } from 'react'
import avatar from '../images/avatar-edit.png'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getUserApi, updateUserApi } from '../Services/allAPI'
import { toast } from 'react-toastify'
import { serverURL } from '../Services/serverURL'
import { useNavigate } from 'react-router-dom'
import { InfinitySpin } from 'react-loader-spinner'

function Profile() {
  const [isMobile] = useState(window.innerWidth<1000?true:false)
  const[gender,setGender] = useState("dummy")
  const[married,setMarried] = useState("dummy")
  const[first,setFirst]=useState("")
  const[second,setSecond]=useState("")
  const[birthday,setBirthday] = useState("")
  const[phone,setPhone]=useState("")
  const[profilePic,setProfilePic] = useState("")
  const[pincode,setPincode]=useState("")
  const[address1,setAddress1]=useState("")
  const[address2,setAddress2]=useState("")
  const[preview,setPreview]=useState("")
  const[landmark,setLandmark]=useState("")
  const[state,setState]=useState("")
  const[city,setCity]=useState("")
  const[email,setEmail]=useState("")
  const[currentPic,setCurrentPic]=useState("")
  const[loading,setLoading]=useState(true)

  const navigate = useNavigate()


  useEffect(()=>{
    if(!profilePic){
      setPreview("")
    }else{
      setPreview(URL.createObjectURL(profilePic))
    }
  },[profilePic])

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      getUserDetails()
    }else{
      navigate('/')
    }
  },[])

  const getUserDetails = async () => {
    try{
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Authorization":`Bearer ${token}`,
        "Content-Type":"application/json"
      }

      const result = await getUserApi(reqHeader)
      if(result.status==200){
        setGender(result.data.gender)
        setMarried(result.data.married)
        setFirst(result.data.name?.split(" ")[0])
        setSecond(result.data.name?.split(" ")[1])
        setBirthday(result.data.birthday?.split("T")[0])
        setPhone(result.data.phone)
        setCurrentPic(result.data.profilePic?`${serverURL}/uploads/${result.data.profilePic}`:"")
        setEmail(result.data.email)
        setPincode(result.data.pincode)
        setAddress1(result.data.address1)
        setAddress2(result.data.address2)
        setLandmark(result.data.landmark)
        setState(result.data.state)
        setCity(result.data.city)
        setLoading(false)
      }else{
        toast.warn(result?.response?.data?result.response.data:result.message)
      }
    }catch(err){
      console.log(err);
    }
  }

  const handleUpdateUser =async () => {
    setLoading(true)
    try{
      if(!first || !second || !phone || !birthday || married == null || married == null){
        toast.info("Fill required fields")
      }else{
        const token = sessionStorage.getItem("token")
        const reqBody = new FormData
        reqBody.append("name",first+" "+second)
        reqBody.append("phone",phone)
        reqBody.append("birthday",birthday)
        reqBody.append("gender",gender)
        reqBody.append("married",married)
        reqBody.append("pincode",pincode)
        reqBody.append("address1",address1)
        reqBody.append("address2",address2)
        reqBody.append("landmark",landmark)
        reqBody.append("state",state)
        reqBody.append("city",city)
        if(profilePic){
          reqBody.append("profilePic",profilePic)
        }
        
        const reqHeader = {
          "Authorization":`Bearer ${token}`,
          "Content-Type":"multipart/form-data"
        }
        console.log(reqBody);
        
        const result = await updateUserApi(reqBody,reqHeader)
        console.log(result);
        if(result.status==200){
          toast.success("Profile Updated")
          sessionStorage.setItem("profilePic",result.data.profilePic?`${serverURL}/uploads/${result.data.profilePic}`:"")
          getUserDetails()
        }else{
          toast.warn(result?.response?.data?result.response.data:result.message)
        }
      }
    }catch(err){
      console.log(err);
    }
  }  
  

  return (
    <div className='px-1'>
        <Header/>
        {
          loading?
          <div className='d-flex justify-content-center align-items-center' style={{height:"60dvh"}}><InfinitySpin visible={true} width="200" color="#000000" ariaLabel="infinity-spin-loading"/></div>:
          <>
        <div className={`container p-0 shadow mt-5 ${isMobile?"":"w-50"} rounded`} style={{backgroundColor:"rgb(240,240,240)",overflow:"hidden"}}>
          <div className="top p-3 d-flex align-items-center gap-5">
            <div className="profile position-relative bg-light ms-3" style={{borderRadius:"50%",height:"60px",width:"60px"}}>
              <label htmlFor="avatar" style={{cursor:"pointer"}}>
                <input id='avatar' type="file" style={{display:"none"}} accept="image/png, image/jpeg, image/jpg" onChange={(e)=>setProfilePic(e.target.files[0])}/>
                <img src={preview?preview:currentPic?currentPic:avatar} width={"60px"} height={"60px"} alt="" style={{borderRadius:"50%"}}/>
              </label>
            </div>
            <h4>Hi, {first}</h4>
          </div>
          <h5 className='px-2 pt-2'>Account Details</h5>
          <div className="row p-2">
            <div className="col-4">
              <p className=''>Email</p>
            </div>
            <div className="col-8">
              <p className='form-control'>{email}</p>
            </div>
          </div>
          <div className="row p-2">
            <div className="col-4">
              <p className=''>Phone Number</p>
            </div>
            <div className="col-8">
              <input type="text" className='form-control' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
            </div>
          </div>
        </div>
        <div className={`container p-0 shadow mt-5 mb-3 ${isMobile?"":"w-50"} rounded`} style={{backgroundColor:"rgb(240,240,240)",overflow:"hidden"}}>
          <h5 className='px-2 pt-2'>Personal Details</h5>
          <div className="row p-2">
            <div className="col-4">
              <p className=''>First Name</p>
            </div>
            <div className="col-8">
              <input type="text" className='form-control' value={first} onChange={(e)=>setFirst(e.target.value)}/>
            </div>
          </div>
          <div className="row p-2">
            <div className="col-4">
              <p className=''>Last Name</p>
            </div>
            <div className="col-8">
              <input type="text" className='form-control' value={second} onChange={(e)=>setSecond(e.target.value)}/>
            </div>
          </div>
          <div className="row p-2">
            <div className="col-4">
              <p className=''>Birthday</p>
            </div>
            <div className="col-8">
              <input type="date" className='form-control' value={birthday} onChange={(e)=>setBirthday(e.target.value)}/>
            </div>
          </div>
          <div className="row p-2">
            <div className="col-4">
              <p className=''>Gender</p>
            </div>
            <div className="col-8">
              <button className={`btn ${gender==true?"btn-danger":""} me-3`} onClick={()=>setGender(true)}>Male</button>
              <button className={`btn ${gender==false?"btn-danger":""} me-3`} onClick={()=>setGender(false)}>Female</button>
            </div>
          </div>
          <div className="row p-2">
            <div className="col-4">
              <p className=''>Married</p>
            </div>
            <div className="col-8">
              <button className={`btn ${married==true?"btn-danger":""} me-3`} onClick={()=>setMarried(true)}>Yes</button>
              <button className={`btn ${married==false?"btn-danger":""} me-3`} onClick={()=>setMarried(false)}>No</button>
            </div>
          </div>
        </div>
        <div className={`container p-0 pb-2 pe-5 shadow mt-5 mb-3 ${isMobile?"":"w-50"} rounded`} style={{backgroundColor:"rgb(240,240,240)",overflow:"hidden"}}>
          <h5 className='px-2 pt-4 ps-4'>Address (Optional)</h5>
          <div className="row p-2">
            <div className="col-4 ps-5">
              <p className=''>Area PinCode</p>
            </div>
            <div className="col-8">
              <input type="text" className='form-control' value={pincode} onChange={(e)=>setPincode(e.target.value)}/>
            </div>
          </div>
          <div className="row p-2">
            <div className="col-4 ps-5">
              <p className=''>Address Line 1</p>
            </div>
            <div className="col-8">
              <input type="text" className='form-control' value={address1} onChange={(e)=>setAddress1(e.target.value)}/>
            </div>
          </div>
          <div className="row p-2">
            <div className="col-4 ps-5">
              <p className=''>Address Line 2</p>
            </div>
            <div className="col-8">
              <input type="text" className='form-control' value={address2} onChange={(e)=>setAddress2(e.target.value)}/>
            </div>
          </div>
          <div className="row p-2">
            <div className="col-4 d-flex align-items-center ps-5">
              <p className=''>Landmark</p>
            </div>
            <div className="col-8">
              <input type="text" className='form-control' value={landmark} onChange={(e)=>setLandmark(e.target.value)}/>
            </div>
          </div>
          <div className="row p-2">
            <div className="col-4 ps-5">
              <p className=''>State</p>
            </div>
            <div className="col-8">
              <input type="text" className='form-control' value={state} onChange={(e)=>setState(e.target.value)}/>
            </div>
          </div>
          <div className="row p-2">
            <div className="col-4 ps-5">
              <p className=''>Town/City</p>
            </div>
            <div className="col-8">
              <input type="text" value={city} onChange={(e)=>setCity(e.target.value)} className='form-control' />
            </div>
          </div>
        </div>
        <div className="container-fluid p-3 text-center bg-light mb-3" style={{position:"sticky",bottom:"0px"}}>
          <button className='btn btn-danger' onClick={()=>handleUpdateUser()}>Save Changes</button>
        </div>
        </>
        }
        <Footer/>
    </div>
  )
}

export default Profile
