import PropTypes from 'prop-types'
import React from 'react'

class PlayToken extends React.PureComponent {

  static propTypes = {
    recording_id: PropTypes.number,
    text: PropTypes.string
  }

  static defaultProps = {
    text: 'Play recording'
  }

  _handlePlay = this._handlePlay.bind(this)

  render() {
    const { text } = this.props
    return (
      <div className="voice-campaign-play-token">
        <div className="voice-campaign-play-token-inner" onClick={ this._handlePlay }>
          <i className="fa fa-play-circle" />
          <span className="link">
            { text }
          </span>
        </div>
      </div>
    )
  }

  _handlePlay(e) {
    e.stopPropagation()
    const { recording_id } = this.props
    const audio = new Audio(`/voice/campaigns/recordings/${recording_id}`)
    audio.play()
  }

}

export default PlayToken
