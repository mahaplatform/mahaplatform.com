import PropTypes from 'prop-types'
import React from 'react'

class Player extends React.Component {

  static propTypes = {
    voicemail: PropTypes.object,
    onListen: PropTypes.func
  }

  audio = null

  state = {
    playing: false
  }

  _handleEnd = this._handleEnd.bind(this)
  _handleToggle = this._handleToggle.bind(this)

  render() {
    return (
      <div className="maha-phone-button-container">
        <div className={ this._getClass()} onClick={ this._handleToggle }>
          <i className={`fa fa-${ this._getIcon() }`} />
        </div>
        <div className="maha-phone-button-label">
          listen
        </div>
      </div>

    )
  }

  componentDidMount() {
    const { voicemail } = this.props
    this.audio = new Audio(voicemail.asset.signed_url)
    this.audio.addEventListener('ended', this._handleEnd)
  }

  _getClass() {
    const { playing } = this.state
    const classes = ['maha-phone-button']
    if(playing) classes.push('depressed')
    return classes.join(' ')
  }

  _getIcon() {
    const { playing } = this.state
    return playing ? 'pause' : 'play'
  }

  _handleEnd() {
    this.audio.currentTime = 0
    this.setState({
      playing: false
    })
    this.props.onListen()
  }

  _handleToggle() {
    const { playing } = this.state
    if(!playing) this.audio.play()
    if(playing) this.audio.pause()
    this.setState({
      playing: !playing
    })
  }

}

export default Player
