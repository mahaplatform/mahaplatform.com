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

function Block({ block, namespace }) {

  if(!block) return null

  const Component = getBlock(block)

  return (
    <div className={ namespace }>
      <div className="b">
        <Component block={ block } />
      </div>
    </div>
  )

}

export default Block
