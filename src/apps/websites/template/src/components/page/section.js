import { applyAnimation } from './utils/animation'
import React from 'react'
import Row from './row'

const getClass = (namespace, animate) => {
  const classes = [`s${namespace}`]
  if(animate) classes.push('an')
  return classes.join(' ')
}

export default function Section({ section, namespace }) {

  const animate = applyAnimation(section.animation)

  return (
    <div className={ getClass(namespace, animate) }>
      { section.content && section.content.rows.map((row, rindex) => (
        <Row key={`row_${rindex}`} row={ row } namespace={ `${namespace}${rindex}` } />
      ))}
    </div>
  )

}
