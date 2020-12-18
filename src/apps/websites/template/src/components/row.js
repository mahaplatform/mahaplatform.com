import Column from './column'
import React from 'react'

export default function Row({ row, namespace }) {
  return (
    <div className={`${namespace} r`}>
      <div>
        { row.columns.map((column, cindex) => (
          <Column key={`column_${cindex}`} column={ column } namespace={ `c${cindex}` } />
        ))}
      </div>
    </div>
  )
}
