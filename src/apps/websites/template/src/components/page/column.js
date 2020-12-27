import { applyAnimation } from './utils/animation'
import PropTypes from 'prop-types'
import Block from './block'
import React from 'react'

const Column = ({ column, data, namespace }) => {

  const animate = applyAnimation(column.animation)

  return (
    <div className={ `c${namespace}` }>
      <div className={ animate ? 'an' : null }>
        { column.content && column.content.blocks.map((block, bindex) => (
          <Block key={`block_${bindex}`} block={ block } data={ data } namespace={ `${namespace}${bindex}` } />
        ))}
      </div>
    </div>
  )

}

Column.propTypes = {
  column: PropTypes.object,
  data: PropTypes.object,
  namespace: PropTypes.string
}

export default Column
