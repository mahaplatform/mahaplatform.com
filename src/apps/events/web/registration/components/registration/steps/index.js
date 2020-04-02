import PropTypes from 'prop-types'
import React from 'react'

class Steps extends React.Component {

  static propTypes = {
    current: PropTypes.number
  }

  render() {
    return (
      <div className="registration-steps">
        { Array(4).fill(0).map((i, index) => (
          <div className={ this._getClass(index) } key={`step_${index}`}>
            <div className="registration-step-marker">
              { index + 1 }
            </div>
          </div>
        ))}
      </div>
    )
  }

  _getClass(index) {
    const { current } = this.props
    const classes = ['registration-step']
    if(index < current) classes.push('completed')
    if(index === current) classes.push('current')
    return classes.join(' ')
  }

}

export default Steps
