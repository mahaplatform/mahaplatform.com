// import Carousel from './carousel'
// import Button from './button'
// import Video from './video'
// import Image from './image'
import React from 'react'
import Text from './text'

const getBlock = ({ type }) => {
  // if(type === 'carousel') return Carousel
  // if(type === 'button') return Button
  // if(type === 'image') return Image
  // if(type === 'video') return Video
  if(type === 'text') return Text
}

const getClass = (block, sindex, rindex, cindex, bindex) => {
  return `s${sindex}r${rindex}c${cindex}b${bindex}`
}

function Block({ block, sindex, rindex, cindex, bindex }) {

  if(!block) return null

  const Component = getBlock(block)

  return (
    <div className={ getClass(block, sindex, rindex, cindex, bindex) }>
      <div className="b">
        <Component block={ block } />
      </div>
    </div>
  )

}

export default Block
