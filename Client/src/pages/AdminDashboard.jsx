import React from 'react'
import AdminHeader from '../components/AdminHeader'
import Carousel from '../components/Carousel'
import Footer from '../components/Footer'
import AdminMovies from '../components/AdminMovies'

function AdminDashboard() {
  return (
    <div>
      <AdminHeader/>
      <Carousel/>
      <AdminMovies/>
      <Footer/>
    </div>
  )
}

export default AdminDashboard
