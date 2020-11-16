import Carousel from './carousel'
import Layout from './layout'
import Button from './button'
import Video from './video'
import Image from './image'
import React from 'react'
import Text from './text'

function Block({ children, config }) {
  const getBlock = ({ type }) => {
    if(type === 'carousel') return Carousel
    if(type === 'layout') return Layout
    if(type === 'button') return Button
    if(type === 'image') return Image
    if(type === 'video') return Video
    if(type === 'text') return Text
  }

  if(!config) return null

  const Component = getBlock(config)

  return <Component config={ config } />

}

export default Block
