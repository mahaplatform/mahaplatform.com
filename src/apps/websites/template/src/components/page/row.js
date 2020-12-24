import { applyAnimation } from './utils/animation'
import PropTypes from 'prop-types'
import Column from './column'
import React from 'react'

const Row = ({ row, namespace }) => {

  const animate = applyAnimation(row.animation)

  return (
    <div className={ `r${namespace}` }>
      <div className={ animate ? 'an' : null }>
        <div>
          <div>
            { row.content && row.content.columns && row.content.columns.map((column, cindex) => (
              <Column key={`column_${cindex}`} column={ column } namespace={ `${namespace}${cindex}` } />
            ))}
            { row.content && row.content.template && row.content.data.map((record, cindex) => (
              <Column key={`column_${cindex}`} column={ row.content.template } data={ record } namespace={ `${namespace}${cindex}` } />
            ))}
          </div>
        </div>
      </div>
    </div>
  )

}

Row.propTypes = {
  row: PropTypes.object,
  namespace: PropTypes.string
}

export default Row
