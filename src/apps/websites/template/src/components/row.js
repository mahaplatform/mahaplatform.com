import Column from './column'
import React from 'react'

const getClass = (row, sindex, rindex) => {
  const classes = [`s${sindex}r${rindex}`,'rc']
  return classes.join(' ')
}

export default function Row({ row, sindex, rindex }) {
  return (
    <div className={ getClass(row, sindex, rindex) }>
      <div className="r">
        { row.columns.map((column, cindex) => (
          <Column key={`column_${cindex}`} column={ column } sindex={ sindex } rindex={ rindex } cindex={ cindex } />
        ))}
      </div>
    </div>
  )
}
