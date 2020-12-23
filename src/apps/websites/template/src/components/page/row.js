import { applyAnimation } from './utils/animation'
import Column from './column'
import React from 'react'

const getClass = (animate) => {
  const classes = []
  if(animate) classes.push('an')
  return classes.join(' ')
}

export default function Row({ row, namespace }) {

  const animate = applyAnimation(row.animation)

  return (
    <div className={ namespace }>
      <div className={ getClass(animate) }>
        { row.content.columns.map((column, cindex) => (
          <Column key={`column_${cindex}`} column={ column } namespace={ `${namespace}${cindex}` } />
        ))}
      </div>
    </div>
  )

}
