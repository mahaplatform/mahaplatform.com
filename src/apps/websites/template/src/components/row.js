import Column from './column'
import React from 'react'

export default function Row({ row, namespace }) {
  return (
    <div className={ namespace }>
      <div>
        { row.columns.map((column, cindex) => (
          <Column key={`column_${cindex}`} column={ column } namespace={ `${namespace}${cindex}` } />
        ))}
      </div>
    </div>
  )
}
