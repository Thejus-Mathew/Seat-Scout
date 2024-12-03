import React, { useContext, useEffect, useState } from 'react'
import Footer from '../components/Footer'
import AdminHeader from '../components/AdminHeader'
import { adminContext } from '../Context/Context'
import { toast } from 'react-toastify'

function AdminProfile() {
  const{admin,setAdmin}=useContext(adminContext)
  const [isMobile] = useState(window.innerWidth<1000?true:false)
  const[first,setFirst]=useState("")
  const[phone,setPhone]=useState("")
  const[pinCode,setPinCode]=useState("")
  const[address,setAddress]=useState("")
  const[landmark,setLandmark]=useState("")
  const[state,setState]=useState("")


  useEffect(()=>{
    setFirst(admin.theatreName?admin.theatreName:"")
    setPhone(admin.phone?admin.phone:"")
    setPinCode(admin.pinCode?admin.pinCode:"")
    setAddress(admin.address?admin.address:"")
    setLandmark(admin.landmark?admin.landmark:"")
    setState(admin.state?admin.state:"")
  },[admin])

  const updateData = () => {
    if(!first || !phone || !pinCode || !address || !landmark || !state){
      toast.info("Please fill empty fields")
    }else{
      setAdmin({...admin,theatreName:first,phone,pinCode,address,state,landmark})
    }
  }


  return (
    <div>
      <AdminHeader/>
      <div className='px-1'>
        <div className={`container p-0 shadow mt-5 ${isMobile?"":"w-50"} rounded`} style={{backgroundColor:"rgb(240,240,240)",overflow:"hidden"}}>
          <div className="top px-5 p-3 d-flex align-items-center gap-5">
            <h4>{admin?.theatreName}</h4>
          </div>
          <h5 className='px-2 pt-2'>Account Details</h5>
          <div className="row p-2">
            <div className="col-4">
              <p className=''>Email</p>
            </div>
            <div className="col-8">
              <p className='form-control'>{admin?.email}</p>
            </div>
          </div>
          <div className="row p-2">
            <div className="col-4">
              <p className=''>Phone Number</p>
            </div>
            <div className="col-8">
              <input type="number" className='form-control' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
            </div>
          </div>
        </div>
    
        <div className={`container p-0 pb-2 pe-5 shadow mt-5 mb-3 ${isMobile?"":"w-50"} rounded`} style={{backgroundColor:"rgb(240,240,240)",overflow:"hidden"}}>
          <h5 className='px-2 pt-4 ps-4'>Theatre Details</h5>
          <div className="row p-2">
            <div className="col-4 ps-5">
              <p className=''>Theatre Name</p>
            </div>
            <div className="col-8">
              <input type="text" className='form-control' value={first} onChange={(e)=>setFirst(e.target.value)} />
            </div>
          </div>
          <div className="row p-2">
            <div className="col-4 ps-5">
              <p className=''>Area PinCode</p>
            </div>
            <div className="col-8">
              <input type="number" className='form-control' value={pinCode} onChange={(e)=>setPinCode(e.target.value)}/>
            </div>
          </div>
          <div className="row p-2">
            <div className="col-4 ps-5">
              <p className=''>Address Line</p>
            </div>
            <div className="col-8">
              <input type="text" className='form-control' value={address} onChange={(e)=>setAddress(e.target.value)}/>
            </div>
          </div>
          <div className="row p-2">
            <div className="col-4 d-flex align-items-center ps-5">
              <p className=''>Landmark</p>
            </div>
            <div className="col-8">
              <input type="text" className='form-control' value={landmark} onChange={(e)=>setLandmark(e.target.value)} />
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
              <input type="text" className='form-control' disabled value={admin?.city} />
            </div>
          </div>
        </div>
        <div className="container-fluid p-3 text-center bg-light mb-3" style={{position:"sticky",bottom:"0px"}}>
          <button className='btn btn-danger' onClick={updateData}>Save Changes</button>
        </div>
        <Footer/>
    </div>
    </div>
  )
}

export default AdminProfile
