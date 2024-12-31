import React, { useContext, useEffect, useState } from 'react'
import './Movies.css'
import { useNavigate } from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap'
import { MDBInput } from 'mdb-react-ui-kit'
import { toast } from 'react-toastify'
import { addMovieAPI, addToTheatreListAPI, getAllMoviesAPI, getMoviesAdminAPI } from '../Services/allAPI'
import { adminContext } from '../Context/Context'
import { InfinitySpin } from 'react-loader-spinner'


function AdminMovies() {
  const{admin,setAdmin}=useContext(adminContext)
  const[loading,setLoading]=useState(true)
    const [isMobile] = useState(window.innerWidth<1000?true:false)
    const navigate = useNavigate()
    const[movie,setMovie]=useState({
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
      cover:"",
    })
    
    const[lang,setLang]=useState("")
    const[form,setForm]=useState("")
    const[cas,setCast]=useState("")
    const[cre,setCrew]=useState("")
    const[genre,setGenre]=useState("")
    const [show, setShow] = useState(false);
    const [showFind, setShowFind] = useState(false);

    const handleCloseFind = () => {
      setShowFind(false)
      setFindMovie({})
      setFindMovieSearch("")
    }
    const handleShowFind = () => {
      getAllMovies()
      setShowFind(true)
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const addLang = () => {
      if(lang){
        setMovie({...movie,languages:[...movie.languages,lang]})
        setLang("")
      }
    }

    const addForm = () => {
      if(form){
        setMovie({...movie,format:[...movie.format,form]})
        setForm("")
      }
    }

    const addCast = () => {
      if(cas){
        setMovie({...movie,cast:[...movie.cast,cas]})
        setCast("")
      }
    }

    const addCrew = () => {
      if(cre){
        setMovie({...movie,crew:[...movie.crew,cre]})
        setCrew("")
      }
    }

    const addGenre = () => {
      if(genre){
        setMovie({...movie,type:[...movie.type,genre]})
        setGenre("")
      }
    }

    const handleDel = (value,key)=>{
      let index = movie[key].indexOf(value)
      let array = [...movie[key]]
      index != -1?array.splice(index,1):null
      console.log(index);
      setMovie({...movie,[key]:array})
    }

    const addMovie = async () => {
      const {name,rating,format,languages,duration,type,rated,releaseDate,about,cast,crew,poster,cover}=movie
      if(!name || !rating || format.length==0 || languages.length==0 || !duration || type.length==0 || !rated || !releaseDate || !about || cast.length==0 || crew.length ==0 || !poster || !cover){
        toast.info('Fill empty fields')
      }else{
        try{
          const token = sessionStorage.getItem('token')
          if(token){
            const reqHeader = {
              "Authorization":`Bearer ${token}`,
              "Content-Type":"application/json"
            }
            const result = await addMovieAPI({name,rating,format,languages,duration,type,rated,releaseDate,about,cast,crew,poster,cover},reqHeader)
            if(result.status == 200){
              setMovie({
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
                cover:"",
              })
              handleClose()
              setAdmin({...admin,movies:[...admin.movies,{movieId:result.data._id,owner:true,timeStamp:{1:[],2:[],3:[],4:[],5:[],6:[],7:[]},language:"",format:""}]})
            }
          }else{
            toast.warn('please login again')
          }

        }catch(err){
          toast.warn(err)
        }
      }
    }

    const[movies,setMovies]=useState([])

    const getMoviesAdmin = async () =>{
      setLoading(true)
      const token = sessionStorage.getItem("token")
      if (token){
        try{       
          const reqHeader = {
            "Authorization":`Bearer ${token}`,
            "Content-Type":"application/json"
          }
          
          const result = await getMoviesAdminAPI(admin?.movies,reqHeader)
          
          if(result.status==200){
            setMovies(result.data)
            setLoading(false)
          }else{
            setMovies([])
          }
        }catch(err){
          toast.warn(err)
        }
      }else{
        toast.warn('login again')
      }
    }

    useEffect(()=>{
      getMoviesAdmin()
    },[admin])

    const[allMovies,setAllMovies]=useState([])
    const[findMovie,setFindMovie]=useState({})
    const[findMovieSearch,setFindMovieSearch]=useState("")
    const changeFindMovie =(item) =>{
      setFindMovieSearch(`${item.name} (${item.releaseDate.split("-")[0]})`)
      setFindMovie(item)
    }

    const getAllMovies = async () => {
      try{
        const token = sessionStorage.getItem("token")
        const reqHeader = {
          "Authorization":`Bearer ${token}`,
          "Content-Type":"application/json"
        }
        const result = await getAllMoviesAPI(reqHeader)
        if(result.status==200){
          setAllMovies(result.data)
        }
      }catch(err){
        console.log(err) 
      }
    }
    
    const addMovieFind =async () => {
      setAdmin({...admin,movies:[...admin.movies,{movieId:findMovie._id,owner:false,timeStamp:{1:[],2:[],3:[],4:[],5:[],6:[],7:[]},language:"",format:""}]})
      try{
        const token = sessionStorage.getItem("token")
        const reqHeader = {
          "Authorization":`Bearer ${token}`,
          "Content-Type":"application/json"
        }
        const result = await addToTheatreListAPI(findMovie._id,reqHeader)
      }catch(err){
        console.log(err);
      }
      handleCloseFind()
    }
    

  return (
    <div>
      <div className="container">
        <div className={`header text-light ${isMobile?"p-1":"p-3"} mt-5`}>
            <h2>Movies</h2>
        </div>
        <div className="text-end my-3">
            <button className='btn me-2 btn-info' onClick={handleShowFind}>Find And Add Movies</button>
            <button className='btn btn-info' onClick={handleShow}>Add New Movie</button>
        </div>
        <div className="row">
          {
            loading?
            <div className='d-flex justify-content-center align-items-center' style={{height:"30dvh"}}><InfinitySpin visible={true} width="200" color="#000000" ariaLabel="infinity-spin-loading"/></div>:
            movies.length>0?movies.map((item,index)=>(
              <div key={index} className="col d-flex flex-column border rounded-5 m-1 mb-3 shadow" onClick={()=>navigate(`/adminmovie/${item?._id}`)} style={{cursor:"pointer",minWidth:isMobile?"":"300px",maxWidth:isMobile?"":"400px"}}>
                <img src={item?.poster} className='rounded-5' width={"100%"} alt="" />
                <h4 className={`text-center fw-bold ${isMobile?"fs-6 px-3":"fs-4"} mb-2 py-1`}>{item?.name}</h4>
            </div>
            )):<></>
          }
        </div>
      </div>










      <Modal show={showFind} onHide={handleCloseFind}>
        <Modal.Header closeButton>
          <Modal.Title>Find And Add Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" placeholder='Search Movie' className='form-control' value={findMovieSearch} onChange={(e)=>setFindMovieSearch(e.target.value)} />
          {
            allMovies.length>0?
            allMovies.filter(item=>!findMovieSearch?false: item.name.includes(findMovieSearch))
            .slice(0,8)
            .map((item,index)=>(
              <div key={index} className="form-control pointer" onClick={()=>changeFindMovie(item)}>{item?.name} ({item.releaseDate.split("-")[0]})</div>
            ))
            :<></>
          }
          <div className="center py-5">
            {
              findMovie.name?
              <div className="card d-fles flex-column gap-2 p-2 shadow" style={{width:"300px"}}>
              <img src={findMovie?.poster} alt="" />
              {findMovie?.name} ({findMovie?.releaseDate?.split("-")[0]})
            </div>
            :<></>
            }
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseFind}>
            Close
          </Button>
          <Button variant="primary" onClick={addMovieFind}>
            Add Movie
          </Button>
        </Modal.Footer>
      </Modal>














      <Modal show={show} size='lg' onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MDBInput label="Movie Name" className='mb-3' type="text" size="lg" value={movie.name} onChange={(e)=>setMovie({...movie,name:e.target.value})} />
          <MDBInput label="Release Date" className='mb-3' type="date" size="lg" value={movie.releaseDate} onChange={(e)=>setMovie({...movie,releaseDate:e.target.value})} />
          <MDBInput label="Poster Image URL" className='mb-3' type="text" size="lg" value={movie.poster} onChange={(e)=>setMovie({...movie,poster:e.target.value})} />
          <MDBInput label="Cover Image URL" className='mb-3' type="text" size="lg" value={movie.cover} onChange={(e)=>setMovie({...movie,cover:e.target.value})} />
          <MDBInput label="Movie Rating" className='mb-3' type="text" size="lg" value={movie.rating} onChange={(e)=>setMovie({...movie,rating:e.target.value})} />
          <MDBInput label="Rated Category" className='mb-3' type="text" size="lg" value={movie.rated} onChange={(e)=>setMovie({...movie,rated:e.target.value})} />
          <MDBInput label="Duration" className='mb-3' type="text" size="lg" value={movie.duration} onChange={(e)=>setMovie({...movie,duration:e.target.value})} />
          <MDBInput label="About" className='mb-3' type="text" size="lg" value={movie.about} onChange={(e)=>setMovie({...movie,about:e.target.value})} />
          <div className="row d-flex align-items-center mb-3">
            <div className="col">
              <MDBInput label="Languages" type="text" size="lg" value={lang} onChange={(e)=>setLang(e.target.value)} />
            </div>
            <div className="col-1 text-center me-5">
              <button className='btn btn-lg border text-danger' onClick={addLang}>ADD</button>
            </div>
            <div className="col">
              <select className='form-control-lg form-control' value={"0"} name="" id="" onChange={(e)=>handleDel(e.target.value,"languages")}>
                <option disabled value="0">Added Languages</option>
                {
                  movie.languages.map((item,index)=>(
                    <option key={index}  value={item}>{item} (Click to Remove)</option>
                  ))
                }
              </select>
            </div>
          </div>

          <div className="row d-flex align-items-center mb-3">
            <div className="col">
              <MDBInput label="Movie Formats" type="text" size="lg" value={form} onChange={(e)=>setForm(e.target.value)} />
            </div>
            <div className="col-1 text-center me-5">
              <button className='btn btn-lg border text-danger' onClick={addForm}>ADD</button>
            </div>
            <div className="col">
              <select className='form-control-lg form-control' value={"0"} name="" id="" onChange={(e)=>handleDel(e.target.value,"format")}>
                <option disabled value="0">Added Formats</option>
                {
                  movie.format.map((item,index)=>(
                    <option key={index} value={item}>{item} (Click to Remove)</option>
                  ))
                }
              </select>
            </div>
          </div>
          
          <div className="row d-flex align-items-center mb-3">
            <div className="col">
              <MDBInput label="Casts" type="text" size="lg" value={cas} onChange={(e)=>setCast(e.target.value)} />
            </div>
            <div className="col-1 text-center me-5">
              <button className='btn btn-lg border text-danger' onClick={addCast}>ADD</button>
            </div>
            <div className="col">
              <select className='form-control-lg form-control' value={"0"} name="" id="" onChange={(e)=>handleDel(e.target.value,"cast")}>
                <option disabled value="0">Added Casts</option>
                {
                  movie.cast.map((item,index)=>(
                    <option key={index} value={item}>{item} (Click to Remove)</option>
                  ))
                }
              </select>
            </div>
          </div>

          <div className="row d-flex align-items-center mb-3">
            <div className="col">
              <MDBInput label="Crews" type="text" size="lg" value={cre} onChange={(e)=>setCrew(e.target.value)} />
            </div>
            <div className="col-1 text-center me-5">
              <button className='btn btn-lg border text-danger' onClick={addCrew}>ADD</button>
            </div>
            <div className="col">
              <select className='form-control-lg form-control' value={"0"} name="" id="" onChange={(e)=>handleDel(e.target.value,"crew")}>
                <option disabled value="0">Added Crews</option>
                {
                  movie.crew.map((item,index)=>(
                    <option key={index} value={item}>{item} (Click to Remove)</option>
                  ))
                }
              </select>
            </div>
          </div>

          <div className="row d-flex align-items-center mb-3">
            <div className="col">
              <MDBInput label="Movie Genre" type="text" size="lg" value={genre} onChange={(e)=>setGenre(e.target.value)} />
            </div>
            <div className="col-1 text-center me-5">
              <button className='btn btn-lg border text-danger' onClick={addGenre}>ADD</button>
            </div>
            <div className="col">
              <select className='form-control-lg form-control' value={"0"} name="" id="" onChange={(e)=>handleDel(e.target.value,"type")}>
                <option disabled value="0">Added Genres</option>
                {
                  movie.type.map((item,index)=>(
                    <option key={index} value={item}>{item} (Click to Remove)</option>
                  ))
                }
              </select>
            </div>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addMovie}>
            Add Movie
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AdminMovies
