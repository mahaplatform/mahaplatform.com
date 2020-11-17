import './style.less'
import Carousel from '@client/components/carousel'
import Image from '@client/components/image'
import RichText from '../../richtext'
import Style from '../../style'
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

  const _getFrameStyle = (slide) => {
    const style = {}
    style.maxHeight = 720
    style.backgroundImage = `url(${process.env.WEB_HOST}/imagecache/fit=cover&w=1280&h=720${slide.src})`
    style.backgroundSize = 'cover',
    style.backgroundRepeat = 'no-repeat',
    style.backgroundPosition = 'center'
    return style
  }

  const _getSlideStyle = (slide) => {
    const style = {}
    style.height = 0
    style.paddingBottom = 'calc(100% / 1.77777)'
    return style
  }

  return (
    <div className={ _getClass(config) } onClick={ _handleClick.bind(this, slide) }>
      <div className="maha-carousel-block-slide-image-frame" style={ _getFrameStyle(slide) }>
        <div className="maha-carousel-block-slide-image" style={ _getSlideStyle(slide) } />
      </div>
      <div className="maha-carousel-block-slide-caption">
        <div className="ui stackable grid container">
          <div className="row">
            <div className="sixteen wide column">
              <div className="maha-carousel-block-slide-caption-content">
                { RichText(slide.caption, config.style) }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}


export default Slide
