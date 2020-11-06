import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import moment from 'moment'
import React from 'react'

class Timestamp extends React.PureComponent {

  static propTypes = {
    time: PropTypes.string
  }

  timer = null

  state = {
    now: moment()
  }

  _handleTick = this._handleTick.bind(this)

  render() {
    const { time } = this.props
    return <span>{ this._getTimestamp(time) }</span>
  }

  componentDidMount() {
    const { time } = this.props
    const { now } = this.state
    const minutes_ago = now.diff(moment(time), 'minutes')
    if(minutes_ago < 60) {
      this.timer = setInterval(this._handleTick, 60 * 1000)
    }
  }

  componentWillUnmount() {
    if(this.timer) clearInterval(this.timer)
  }

  _getTimestamp(timestamp) {
    const time = moment(timestamp)
    const { now } = this.state

    const seconds_ago = now.diff(time, 'seconds')
    if(seconds_ago < 60) {
      return 'just now'
    }

    const minutes_ago = now.diff(time, 'minutes')
    if(minutes_ago < 60) {
      return pluralize('min', minutes_ago, true)
    }

    const hours_ago = now.diff(time, 'hours')
    if(hours_ago < 24) {
      return pluralize('hour', hours_ago, true)
    }

    const yesterday = now.clone().subtract(1,'days').startOf('day')
    if(time.isSame(yesterday, 'day')) {
      return time.format('[Yesterday at] h:mm A')
    }

    if(time.isSame(now, 'month')) {
      return time.format('MMM D [at] h:mm A')
    }

    if(!time.isSame(now, 'year')) {
      return time.format('MMM D')
    }

    return time.format('MMM D, YYY')
  }

  _handleTick() {
    this.setState({
      now: moment()
    })
  }

}

export default Timestamp
