import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'

class ProgressBar extends React.PureComponent {

  static propTypes = {
    color: PropTypes.string,
    labeled: PropTypes.bool,
    percent: PropTypes.number,
    size: PropTypes.string
  }

  static defaultProps = {
    color: 'green',
    labeled: true,
    percent: 0,
    size: 'standard'
  }

  render() {
    const { labeled, percent } = this.props
    return (
      <div className="maha-progress-bar">
        <div className={ this._getClass() } data-percent={ percent }>
          <div className="bar" style={ this._getBarStyle() }>
            { labeled ?
              <div className="progress">{ numeral(percent).format('0.0%') }</div> :
              <div className="progress" />
            }
          </div>
        </div>
      </div>
    )
  }
  _getClass() {
    const { color, size } = this.props
    const classes = ['ui progress']
    if(color) classes.push(color)
    if(size) classes.push(size)
    return classes.join(' ')
  }

  _getBarStyle() {
    const { percent } = this.props
    return {
      width: numeral(percent).format('0.0%')
    }
  }

}

export default ProgressBar
