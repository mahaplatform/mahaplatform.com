import PropTypes from 'prop-types'
import React from 'react'

class RecordingToken extends React.Component {

  static propTypes = {
    asset: PropTypes.object
  }

  audio = null

  state = {
    playing: false
  }

  _handleEnd = this._handleEnd.bind(this)
  _handleToggle = this._handleToggle.bind(this)

  render() {
    return (
      <div className={ this._getClass() } onClick={ this._handleToggle }>
        <i className={`fa fa-${ this._getIcon() }`} />
      </div>
    )
  }

  componentDidMount() {
    const { asset } = this.props
    this.audio = new Audio(asset.signed_url)
    this.audio.addEventListener('ended', this._handleEnd)
  }

  _getClass() {
    const { playing } = this.state
    const classes = ['crm-recording-token']
    if(playing) classes.push('playing')
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

export default RecordingToken
