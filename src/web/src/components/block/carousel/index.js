import './style.less'
import Carousel from '@client/components/carousel'
import React from 'react'
import Slide from './slide'

function CarouselBlock({ config }) {

  const carousel = {
    slides: config.slides.map((slide, index) => (
      <Slide config={ config } slide={ slide } key={`slide_${index}`} />
    ))
  }

  return (
    <div className="maha-carousel-block">
      <Carousel { ...carousel } />
    </div>
  )

}

export default CarouselBlock
