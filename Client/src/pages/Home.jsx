import React from 'react'
import Header from '../components/Header'
import Carousel from '../components/Carousel'
import Movies from '../components/Movies'
import Theatres from '../components/Theatres'
import Footer from '../components/Footer'

function Home() {
  return (
    <div>
        <Header/>
        <Carousel/>
        <Movies/>
        <Theatres/>
        <Footer/>
    </div>
  )
}

export default Home
