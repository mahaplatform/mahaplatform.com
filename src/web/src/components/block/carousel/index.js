import './style.less'
import Carousel from '@client/components/carousel'
import Image from '@client/components/image'
import RichText from '../../richtext'
import Link from 'next/link'
import React from 'react'

function Slide({ config, slide }) {

  const _getClass = (config) => {
    const classes = ['maha-carousel-block-slide']
    classes.push(config.captionPosition)
    return classes.join(' ')
  }

  const _handleClick = (slide) => {
    if(slide.link) console.log(slide.link)
  }

  const content = (
    <div className={ _getClass(config) } onClick={ _handleClick.bind(this, slide) }>
      <div className="maha-carousel-block-slide-image">
        <Image src={ slide.src } transforms={{ fit: 'cover', w: 200, h: 100 }} />
      </div>
      <div className="maha-carousel-block-slide-caption">
        <div className="maha-carousel-block-slide-caption-content">
          { RichText(slide.caption, config) }
        </div>
      </div>
    </div>
  )

  if(!slide.link) return content

  return (
    <Link href={ slide.link }>
      <a>{ content }</a>
    </Link>
  )

}

function CarouselBlock({ children, config }) {

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
