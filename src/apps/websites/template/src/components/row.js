import Column from './column'
import React from 'react'

const getClass = (row, rindex) => {
  const classes = [`r${rindex}`,'rw']
  return classes.join(' ')
}

export default function Row({ row, rindex }) {
  return (
    <div className={ getClass(row, rindex) }>
      <div className="rc">
        <div className="r">
          <div className="ri">
            { row.columns.map((column, index) => (
              <Column key={`column_${index}`} column={ column } rindex={ rindex } cindex={ index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
