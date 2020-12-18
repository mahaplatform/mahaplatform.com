import Block from './block'
import React from 'react'

export default function Column({ column, namespace }) {
  return (
    <div className={`${namespace} c`}>
      <div>
        { column.blocks.map((block, bindex) => (
          <Block key={`block_${bindex}`} block={ block } namespace={ `b${bindex}` } />
        ))}
      </div>
    </div>
  )
}
