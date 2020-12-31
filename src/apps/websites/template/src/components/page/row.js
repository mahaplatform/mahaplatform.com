import { applyAnimation } from './utils/animation'
import PropTypes from 'prop-types'
import Column from './column'
import React from 'react'

const getDeviceWidth = (row, device, fullWidth, cindex) => {
  const layout = row.content.layout[device] || row.content.layout
  const index = cindex % layout.length
  return Math.floor((fullWidth / 12) * layout[index])
}

const getWidths = (row, cindex) => {
  const { layout } = row.content
  const fullWidth = row.sizing && row.sizing.customWidth ? row.sizing.customWidth : 980
  if(Array.isArray(layout) || !layout.isResponsive) {
    return {
      all: getDeviceWidth(row, 'all', fullWidth, cindex)
    }
  }
  return {
    desktop: getDeviceWidth(row, 'desktop', fullWidth, cindex),
    tablet: getDeviceWidth(row, 'tablet', 979, cindex),
    mobile: getDeviceWidth(row, 'mobile', 767, cindex)
  }
}

const Row = ({ row, namespace }) => {

  const animate = applyAnimation(row.animation)

  return (
    <div className={ `r${namespace}` }>
      <div className={ animate ? 'an' : null }>
        <div>
          <div>
            { row.content && row.content.columns && row.content.columns.map((column, cindex) => (
              <Column key={`column_${cindex}`} column={ column } namespace={ `${namespace}${cindex}` } widths={ getWidths(row, cindex) } />
            ))}
            { row.content && row.content.template && row.content.data.map((record, cindex) => (
              <Column key={`column_${cindex}`} column={ row.content.template } data={ record } namespace={ `${namespace}${cindex}` } widths={ getWidths(row, cindex) } />
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
