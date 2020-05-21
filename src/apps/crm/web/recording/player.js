import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'
import _ from 'lodash'

class Player extends React.Component {

  static propTypes = {
    recording: PropTypes.object
  }

  _handlePlay = this._handlePlay.bind(this)

  render() {
    const { recording } = this.props
    return (
      <div className="recording">
        <div className="recording-widget">
          <div className="recording-player" onClick={ this._handlePlay }>
            <i className="fa fa-play" />
          </div>
          <div className="recording-metadata">
            <table className="ui unstackable celled table">
              <tr>
                <td>Caller</td>
                <td>{ recording.display_name }</td>
              </tr>
              <tr>
                <td>Phone</td>
                <td>{ recording.from }</td>
              </tr>
              <tr>
                <td>Date</td>
                <td>{ moment(recording.created_at).format('MMM DD, YYYY') }</td>
              </tr>
              <tr>
                <td>Time</td>
                <td>{ moment(recording.created_at).format('h:mm A') }</td>
              </tr>
              <tr>
                <td>Duration</td>
                <td>{ this._getDuration(recording.duration) }</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    )
  }

  _getDuration(duration) {
    const pad = (value) => _.padStart(value, 2, 0)
    const minutes = Math.floor(duration / 60)
    const seconds = (duration - (minutes * 60)) % 60
    const parts = [ pad(minutes), pad(seconds) ]
    return parts.join(':')
  }

  _handlePlay() {
    const { recording } = this.props
    const audio = new Audio(recording.url)
    audio.play()
  }

}

export default Player
