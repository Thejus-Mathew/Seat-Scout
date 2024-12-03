import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Profile from './pages/Profile'
import AllMovies from './pages/AllMovies'
import AllTheatres from './pages/AllTheatres'
import Bookings from './pages/Bookings'
import Theatre from './pages/Theatre'
import Movie from './pages/Movie'
import BookingStart from './pages/BookingStart'
import Payment from './pages/Payment'
import AdminDashboard from './pages/AdminDashboard'
import AdminProfile from './pages/adminProfile'
import AdminBookings from './pages/AdminBookings'
import AdminAuth from './pages/AdminAuth'
import AdminMovie from './pages/AdminMovie'
import { useContext } from 'react'
import { adminContext } from './Context/Context'

function App() {
  const{admin,setAdmin}=useContext(adminContext)

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/auth'element={<Auth/>}/>
      <Route path='/profile'element={<Profile/>}/>
      <Route path='/movies'element={<AllMovies/>}/>
      <Route path='/theatres'element={<AllTheatres/>}/>
      <Route path='/movie'element={<Movie/>}/>
      <Route path='/theatre'element={<Theatre/>}/>
      <Route path='/bookings'element={<Bookings/>}/>
      <Route path='/bookingstart'element={<BookingStart/>}/>
      <Route path='/payment'element={<Payment/>}/>
      <Route path='/admin'element={admin?<AdminDashboard/>:<AdminAuth/>}/>
      <Route path='/adminprofile'element={admin?<AdminProfile/>:<AdminAuth/>}/>
      <Route path='/adminbookings'element={admin?<AdminBookings/>:<AdminAuth/>}/>
      <Route path='/adminauth'element={admin?<AdminDashboard/>:<AdminAuth/>}/>
      <Route path='/adminmovie/:movieId'element={admin?<AdminMovie/>:<AdminAuth/>}/>
    </Routes>
    </>
  )
}

export default App
