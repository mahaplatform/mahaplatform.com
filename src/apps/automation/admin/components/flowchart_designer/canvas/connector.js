import PropTypes from 'prop-types'
import React from 'react'

const lines = {
  vertical: [
    { d: 'M 80 0 L 80 1000', strokeWidth: 2 }
  ],
  upper_left: [
    { d: 'M 80 0 L 1000 0', strokeWidth: 4 },
    { d: 'M 80 0 L 80 30', strokeWidth: 2 }
  ],
  upper_right: [
    { d: 'M -1000 0 L 80 0', strokeWidth: 4 },
    { d: 'M 80 0 L 80 30', strokeWidth: 2 }
  ],
  lower_left: [
    { d: 'M 80 30 L 1000 30', strokeWidth: 4 },
    { d: 'M 80 0 L 80 30', strokeWidth: 2 }
  ],
  lower_right: [
    { d: 'M -1000 30 L 80 30', strokeWidth: 4 },
    { d: 'M 80 0 L 80 30', strokeWidth: 2 }
  ],
  horizontal_up: [
    { d: 'M -1000 30 L 1000 30', strokeWidth: 4 },
    { d: 'M 80 0 L 80 30', strokeWidth: 2 }
  ],
  horizontal_down: [
    { d: 'M -1000 0 1000 0', strokeWidth: 4 },
    { d: 'M 80 0 L 80 30', strokeWidth: 2 }
  ],
  horizontal_vertical: [
    { d: 'M -1000 20 1000 20', strokeWidth: 4 },
    { d: 'M 80 0 L 80 1000', strokeWidth: 2 }
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
          <path { ...line } key={`line_${index}`} />
        ))}
      </svg>
    )
  }

}

export default Connector
