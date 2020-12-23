import { applyAnimation } from './utils/animation'
import Block from './block'
import React from 'react'

const getClass = (animate) => {
  const classes = []
  if(animate) classes.push('an')
  return classes.join(' ')
}

export default function Column({ column, namespace }) {

  const animate = applyAnimation(column.animation)

  return (
    <div className={ namespace }>
      <div className={ getClass(animate) }>
        { column.content.blocks.map((block, bindex) => (
          <Block key={`block_${bindex}`} block={ block } namespace={ `${namespace}${bindex}` } />
        ))}
      </div>
    </div>
  )

}
