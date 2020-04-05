import PropTypes from 'prop-types'
import React from 'react'

const steps = ['Ticket Selection','Contact Information','Ticket Information','Payment Information']

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
            <div className="registration-step-label" dangerouslySetInnerHTML={{ __html: steps[index].split(' ').join('<br />') }} />
          </div>
        ))}
        <div className={ this._getClass(4) }>
          <div className="registration-step-marker">
            <i className="fa fa-check" />
          </div>
          <div className="registration-step-label">
            Registration<br />
            Complete
          </div>
        </div>
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
