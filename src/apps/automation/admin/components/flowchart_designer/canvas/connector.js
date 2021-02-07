import PropTypes from 'prop-types'
import React, { Fragment } from 'react'

const shapes = {
  vertical: [
    { d: 'M 80 1 L 80 1000' }
  ],
  upper_left: [
    { d: 'M 80 30 L 80 15 C 80 15 80 1 95 1 L 1000 1' }
  ],
  upper_right: [
    { d: 'M 80 30 L 80 15 C 80 15 80 1 65 1 L -920 1' }
  ],
  lower_left: [
    { d: 'M 80 0 L 80 15 C 80 15 80 29 95 29 L 1000 29' }
  ],
  lower_right: [
    { d: 'M 80 0 L 80 15 C 80 15 80 29 65 29 L -920 29' }
  ],
  horizontal_up: [
    { d: 'M -1000 29 L 1000 29' },
    { d: 'M 80 0 L 80 29'}
  ],
  horizontal_down: [
    { d: 'M -1000 1 1000 1' },
    { d: 'M 80 0 L 80 29' }
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
        { shapes[type].map((shape, index) => (
          <path { ...shape } key={`shape_${index}`} />
        ))}
      </svg>
    )
  }

}

export default Connector
