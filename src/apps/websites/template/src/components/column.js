import Block from './block'
import React from 'react'

const getClass = (column, sindex, rindex, cindex) => {
  const classes = [`s${sindex}r${rindex}c${cindex}`]
  classes.push('d3')
  classes.push('t6')
  classes.push('m12')
  return classes.join(' ')
}

export default function Column({ column, sindex, rindex, cindex }) {
  return (
    <div className={ getClass(column, sindex, rindex, cindex) }>
      <div className="c">
        { column.blocks.map((block, bindex) => (
          <Block key={`block_${bindex}`} block={ block } sindex={ sindex } rindex={ rindex } cindex={ cindex } bindex={ bindex } />
        ))}
      </div>
    </div>
  )
}
