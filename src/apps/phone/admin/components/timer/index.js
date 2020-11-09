import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'
import _ from 'lodash'

class Timer extends React.Component {

  static propTypes = {
    from: PropTypes.object
  }

  interval = null

  state = {
    duration: 0
  }

  _handleTick = this._handleTick.bind(this)

  render() {
    return (
      <span className="crm-timer">
        { this._getClock() }
      </span>
    )
  }

  componentDidMount() {
    this.interval = setInterval(this._handleTick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  _getClock() {
    const { from } = this.props
    const duration = moment().diff(from, 'seconds')
    const pad = (value) => _.padStart(value, 2, 0)
    const hours = Math.floor(duration / 3600)
    const minutes = Math.floor((duration - (hours * 3600)) / 60)
    const seconds = (duration - (hours * 3600) - (minutes * 60)) % 60
    const parts = [ pad(hours), pad(minutes), pad(seconds) ]
    return parts.join(':')
  }

  _handleTick() {
    const { duration } = this.state
    this.setState({
      duration: duration + 1
    })
  }


}

export default Timer
