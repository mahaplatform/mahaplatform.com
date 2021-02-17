import PropTypes from 'prop-types'
import React from 'react'

class SayToken extends React.PureComponent {

  static contextTypes = {
    admin: PropTypes.object
  }

  static propTypes = {
    say: PropTypes.object,
    text: PropTypes.string
  }

  static defaultProps = {
    text: 'Play text'
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
    const { team } = this.context.admin
    const { voice } = this.props.say
    const text = `<speak>${this.props.say.text.replace('\n', '<break time="1s" />')}</speak>`
    const audio = new Audio(`/api/admin/speak?text=${encodeURIComponent(text)}&voice=${voice}&token=${team.token}`)
    audio.play()
  }

}

export default SayToken
