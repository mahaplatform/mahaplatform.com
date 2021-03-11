import { applyAnimation } from './utils/animation'
import PropTypes from 'prop-types'
import React from 'react'
import Row from './row'

const getClass = (namespace, animate) => {
  const classes = [`s${namespace}`]
  if(animate) classes.push('an')
  return classes.join(' ')
}

const Section = ({ section, namespace }) => {

  const animate = applyAnimation(section.animation)

  return (
    <div className={ getClass(namespace, animate) }>
      { section.content && section.content.rows.map((row, rindex) => (
        <Row key={`row_${rindex}`} row={ row } namespace={ `${namespace}${rindex}` } />
      ))}
    </div>
  )

}

Section.propTypes = {
  section: PropTypes.object,
  namespace: PropTypes.string
}

export default Section
