import PropTypes from 'prop-types'
import React from 'react'

class Steps extends React.Component {

  static propTypes = {
    completable: PropTypes.bool,
    current: PropTypes.number,
    steps: PropTypes.array
  }

  static defaultProps = {
    completable: true
  }

  render() {
    const { completable, steps } = this.props
    return (
      <div className="maha-steps">
        { Array(steps.length - (completable ? 1 : 0)).fill(0).map((i, index) => (
          <div className={ this._getClass(index) } key={`step_${index}`}>
            <div className="maha-step-marker">
              { index + 1 }
            </div>
            <div className="maha-step-label" dangerouslySetInnerHTML={{ __html: steps[index].split(' ').join('<br />') }} />
          </div>
        ))}
        { completable &&
          <div className={ this._getClass(steps.length - 1) }>
            <div className="maha-step-marker">
              <i className="fa fa-check" />
            </div>
            <div className="maha-step-label" dangerouslySetInnerHTML={{ __html: steps[steps.length - 1].split(' ').join('<br />') }} />
          </div>
        }
      </div>
    )
  }

  _getClass(index) {
    const { current } = this.props
    const classes = ['maha-step']
    if(index < current) classes.push('completed')
    if(index === current) classes.push('current')
    return classes.join(' ')
  }

}

export default Steps
