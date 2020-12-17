import Block from './block'
import React from 'react'

const getClass = (column, rindex, cindex) => {
  const classes = [`r${rindex}c${cindex}`]
  classes.push('d3')
  classes.push('t6')
  classes.push('m12')
  return classes.join(' ')
}

export default function Column({ column, rindex, cindex }) {
  return (
    <div className={ getClass(column, rindex, cindex) }>
      <div className="c">
        { column.blocks.map((block, index) => (
          <Block key={`block_${index}`} block={ block } rindex={ rindex } cindex={ cindex } bindex={ index } />
        ))}
      </div>
    </div>
  )
}
