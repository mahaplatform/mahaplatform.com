import { applyAnimation } from './utils/animation'
import Block from './block'
import React from 'react'

const getClass = (animate) => animate ? 'an' : null

export default function Column({ column, data, namespace }) {

  const animate = applyAnimation(column.animation)

  return (
    <div className={ namespace }>
      <div className={ animate ? 'an' : null }>
        { column.content && column.content.blocks.map((block, bindex) => (
          <Block key={`block_${bindex}`} block={ block } data={ data } namespace={ `${namespace}${bindex}` } />
        ))}
      </div>
    </div>
  )

}
