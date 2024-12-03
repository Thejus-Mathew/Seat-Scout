import React, { useState } from 'react'
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';

import car1 from '../images/car1.jpg'
import car2 from '../images/car2.jpg'
import car3 from '../images/car3.jpg'
import car4 from '../images/car4.jpg'


function Carousel() {
    const [isMobile] = useState(window.innerWidth<1000?true:false)

  return (
    <div>
    <MDBCarousel interval={2000}>
      <MDBCarouselItem itemId={1}>
        <img src={car2} style={{aspectRatio:`${isMobile?"2/1.2":"250/70"}`}} className='d-block w-100' alt='...' />
      </MDBCarouselItem>
      <MDBCarouselItem itemId={2}>
        <img src={car3} style={{aspectRatio:`${isMobile?"2/1.2":"250/70"}`}} className='d-block w-100' alt='...' />
      </MDBCarouselItem>
      <MDBCarouselItem itemId={3}>
        <img src={car4} style={{aspectRatio:`${isMobile?"2/1.2":"250/70"}`}} className='d-block w-100' alt='...' />
      </MDBCarouselItem>
      <MDBCarouselItem itemId={4}>
        <img src={car1} style={{aspectRatio:`${isMobile?"2/1.2":"250/70"}`}} className='d-block w-100' alt='...' />
      </MDBCarouselItem>
    </MDBCarousel>
    </div>
  )
}

export default Carousel
