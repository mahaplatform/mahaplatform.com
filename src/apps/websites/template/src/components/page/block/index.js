import { applyAnimation } from '../utils/animation'
// import Carousel from './carousel'
import Button from './button'
// import Video from './video'
import Image from './image'
import Text from './text'

const getBlock = ({ type }) => {
  // if(type === 'carousel') return Carousel
  if(type === 'button') return Button
  if(type === 'image') return Image
  // if(type === 'video') return Video
  if(type === 'text') return Text
}

const getClass = (namespace, animate) => {
  const classes = [namespace]
  if(animate) classes.push('an')
  return classes.join(' ')
}

function Block({ block, namespace }) {

  if(!block) return null

  const animate = applyAnimation(block.animation)

  const Component = getBlock(block)

  return (
    <div className={ getClass(namespace, animate) }>
      <Component block={ block } />
    </div>
  )

}

export default Block
