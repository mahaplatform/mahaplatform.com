import { applyAnimation } from '../utils/animation'
// import Carousel from './carousel'
import PropTypes from 'prop-types'
import Button from './button'
// import Video from './video'
import Image from './image'
import Text from './text'
import React from 'react'

const getBlock = ({ type }) => {
  // if(type === 'carousel') return Carousel
  if(type === 'button') return Button
  if(type === 'image') return Image
  // if(type === 'video') return Video
  if(type === 'text') return Text
}

const getClass = (namespace, animate) => {
  const classes = [`b${namespace}`]
  if(animate) classes.push('an')
  return classes.join(' ')
}

const Block = ({ block, data, namespace, widths }) => {

  if(!block) return null

  const animate = applyAnimation(block.animation)

  const Component = getBlock(block)

  return (
    <div className={ getClass(namespace, animate) }>
      <Component block={ block } data={ data } widths={ widths } />
    </div>
  )

}

Block.propTypes = {
  block: PropTypes.object,
  data: PropTypes.object,
  namespace: PropTypes.string,
  widths: PropTypes.object
}

export default Block
