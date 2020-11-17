import Carousel from './carousel'
import Style from '../../style'
import Button from './button'
import Video from './video'
import Image from './image'
import React from 'react'
import Text from './text'

function Block({ config, data }) {
  const getBlock = ({ type }) => {
    if(type === 'carousel') return Carousel
    if(type === 'button') return Button
    if(type === 'image') return Image
    if(type === 'video') return Video
    if(type === 'text') return Text
  }

  if(!config) return null

  const Component = getBlock(config)

  return (
    <div style={ Style(null, config.style) }>
      <Component config={ config } data={ data } />
    </div>
  )

}

export default Block
