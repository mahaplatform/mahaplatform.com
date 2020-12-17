import React from 'react'
import Row from './row'

const getClass = (section, sindex) => {
  const classes = [`s${sindex}`]
  return classes.join(' ')
}

export default function Section({ section, sindex }) {
  return (
    <div className={ getClass(section, sindex) }>
      <div className="s">
        { section.rows.map((row, rindex) => (
          <Row key={`row_${rindex}`} row={ row } sindex={ sindex } rindex={ rindex } />
        ))}
      </div>
    </div>
  )
}
