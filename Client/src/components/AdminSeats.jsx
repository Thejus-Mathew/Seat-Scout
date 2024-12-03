import React, { useContext, useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import screen from '../images/screen.png'
import { MDBInput } from 'mdb-react-ui-kit';
import { adminContext } from '../Context/Context';


function AdminSeats() {
    const{admin,setAdmin} = useContext(adminContext)
    const [isMobile] = useState(window.innerWidth<1000?true:false)
    const [show, setShow] = useState(false);
    const[col,setCol]=useState(17)
    const[row,setRow]=useState(27)
    const[selectedCol,setSelectedCol]=useState([])
    
    const [seats,setSeats] = useState(()=>{
        let obj = {}
        for(let i=65;i<65+col;i++){
            obj[String.fromCharCode(i)] ={}
            for (let j=1;j<=row;j++){
                obj[String.fromCharCode(i)][`${j}`]=0
            }
        }
        return obj
    })


    const selectSeat = (item,item1)=>{

        if (seats[item][item1]==0){
            setSeats(()=>{
                return {...seats,[item]:{...seats[item],[item1]:-1}}
            })
            let str = item+" "+item1
            setSelectedCol([...selectedCol,str])
            
        }else if(seats[item][item1]==-1){
            setSeats(()=>{
                return {...seats,[item]:{...seats[item],[item1]:0}}
            })
            let str = item+" "+item1
            setSelectedCol((col)=>{
                let index = col.indexOf(str)
                index != -1? col.splice(index,1):null
                return col
            })
        }
    }

    const handleSave = () => {        
        setAdmin({...admin,seats:{col,row,seats}})
        setShow(false)
    }

    useEffect(()=>{
        setCol(admin?.seats?.col?admin.seats.col:17)
        setRow(admin?.seats?.row?admin.seats.row:27)
        setSeats(admin?.seats?.seats?admin.seats.seats:()=>{
            let obj = {}
            for(let i=65;i<65+col;i++){
                obj[String.fromCharCode(i)] ={}
                for (let j=1;j<=row;j++){
                    obj[String.fromCharCode(i)][`${j}`]=0
                }
            }
            return obj
        })
    },[admin])

    const arrange = () => {
        setSeats(()=>{
            let obj = {}
            for(let i=65;i<65+col;i++){
                obj[String.fromCharCode(i)] ={}
                for (let j=1;j<=row;j++){
                    obj[String.fromCharCode(i)][`${j}`]=0
                }
            }
            return obj
        })
        setSelectedCol([])
    }
    

  return (
    <>
    <div className='border-bottom py-3' style={{cursor:"pointer"}} onClick={()=>setShow(true)}>
        Seat Format
    </div>


    <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
          <div className="fs-6 d-flex gap-3">
            <MDBInput label="Number of columns" id="form1" type="number" value={row} onChange={(e)=>setRow(Math.max(15, Math.min(35,(e.target.value))))}/>
            <MDBInput label="Number of rows" id="form2" type="number" value={col} onChange={(e)=>setCol(Math.max(10, Math.min(26,(e.target.value))))}/>
            <button className='btn btn-dark' onClick={arrange}>Arrange</button>
          </div>

          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div style={{width:isMobile?"70vw":"",minWidth:isMobile?"870px":""}}>
                <p className='fs-5 text-center'>Arrange seats by selecting unavailable seats</p>
                <div className='d-flex justify-content-center'><img src={screen} style={{minWidth:"300px",aspectRatio:"7/1"}} alt="" /></div>
                <p className='text-center mt-3'>All eyes this way please</p>
                <div className="seats d-flex align-items-center flex-column my-5" >
                    {
                        Object?.keys(seats).map((item,index)=>(
                            <div key={index} className="d-flex justify-content-between mb-1" style={{width:"70vw",minWidth:"870px"}}>
                                        <div className="bg-light d-flex justify-content-center align-items-center" style={{width:`${80/27}%`,aspectRatio:"1/1",fontSize:isMobile?"15px":"20px"}}>
                                            {item}
                                        </div>
                                {
                                    Object.keys(seats[item]).map((item1,index1)=>(
                                        <div key={index1} className={`border ${seats[item][item1]==1?"bg-danger text-light":seats[item][item1]==0?"bg-light":seats[item][item1]==2?"bg-success text-light":"border-0 text-light"} d-flex justify-content-center align-items-center`} style={{width:`${80/27}%`,cursor:"pointer",aspectRatio:"1/1",fontSize:isMobile?"10px":"15px"}} onClick={()=>selectSeat(item,item1)}>
                                            {item1}
                                        </div>
                                    ))
                                }
                                <div className="bg-light d-flex justify-content-center align-items-center" style={{width:`${80/27}%`,aspectRatio:"1/1",fontSize:isMobile?"15px":"20px"}} >
                                    {item}
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="text-center bg-light border p-3 shadow" style={{position:"sticky",bottom:"0px"}}>
                    <button className='btn btn-danger' onClick={handleSave}>Save Seat Format</button>
                </div>
            </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AdminSeats
