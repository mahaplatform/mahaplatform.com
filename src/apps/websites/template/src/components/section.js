import React from 'react'
import Row from './row'

const getClass = (section, sindex) => {
  const classes = [`s${sindex}`]
  return classes.join(' ')
}

export default function Section({ section, namespace }) {
  return (
    <div className={ `${namespace} s` }>
      <div>
        { section.rows.map((row, rindex) => (
          <Row key={`row_${rindex}`} row={ row } namespace={ `r${rindex}` } />
        ))}
      </div>
    </div>
  )
}
