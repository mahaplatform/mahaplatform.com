import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'

class ProgressBar extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    color: PropTypes.string,
    percent: PropTypes.number,
    size: PropTypes.string
  }

  static defaultProps = {
    color: 'green',
    percent: 0,
    size: 'standard'
  }

  state = {}

  render() {
    const { percent } = this.props
    return (
      <div className="maha-progress-bar">
        <div className={ this._getClass() }>
          <div className="bar" style={ this._getBarStyle() }>
            <div className="progress">{ numeral(percent).format('0.0%') }</div>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

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
