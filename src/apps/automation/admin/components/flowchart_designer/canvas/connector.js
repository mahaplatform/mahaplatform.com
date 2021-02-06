import PropTypes from 'prop-types'
import React from 'react'

const lines = {
  vertical: [
    { x1: 80, y1: 0, x2: 80, y2: 1000, strokeWidth: 2 }
  ],
  upper_left: [
    { x1: 80, y1: 0, x2: 1000, y2: 0, strokeWidth: 4 },
    { x1: 80, y1: 0, x2: 80, y2: 30, strokeWidth: 2 }
  ],
  upper_right: [
    { x1: -1000, y1: 0, x2: 80, y2: 0, strokeWidth: 4 },
    { x1: 80, y1: 0, x2: 80, y2: 30, strokeWidth: 2 }
  ],
  lower_left: [
    { x1: 80, y1: 30, x2: 1000, y2: 30, strokeWidth: 4 },
    { x1: 80, y1: 0, x2: 80, y2: 30, strokeWidth: 2 }
  ],
  lower_right: [
    { x1: -1000, y1: 30, x2: 80, y2: 30, strokeWidth: 4 },
    { x1: 80, y1: 0, x2: 80, y2: 30, strokeWidth: 2 }
  ],
  horizontal_up: [
    { x1: -1000, y1: 30, x2: 1000, y2: 30, strokeWidth: 4 },
    { x1: 80, y1: 0, x2: 80, y2: 30, strokeWidth: 2 }
  ],
  horizontal_down: [
    { x1: -1000, y1: 0, x2: 1000, y2: 0, strokeWidth: 4 },
    { x1: 80, y1: 0, x2: 80, y2: 30, strokeWidth: 2 }
  ],
  horizontal_vertical: [
    { x1: -1000, y1: 20, x2: 1000, y2: 20, strokeWidth: 4 },
    { x1: 80, y1: 0, x2: 80, y2: 1000, strokeWidth: 2 }
  ]
}

class Connector extends React.PureComponent {

  static propTypes = {
    type: PropTypes.string
  }

  render() {
    const { type } = this.props
    return (
      <svg className="flowchart-connector" preserveAspectRatio="xMidYMid meet" viewBox="0 0 160 30">
        { lines[type].map((line, index) => (
          <line { ...line } key={`line_${index}`} />
        ))}
      </svg>
    )
  }

}

export default Connector
