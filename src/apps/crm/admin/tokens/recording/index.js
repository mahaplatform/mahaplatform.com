import PropTypes from 'prop-types'
import React from 'react'

class RecordingToken extends React.Component {

  static propTypes = {
    asset: PropTypes.object
  }

  _handlePlay = this._handlePlay.bind(this)

  render() {
    return (
      <div className="crm-recording-token" onClick={ this._handlePlay }>
        <i className="fa fa-play" />
      </div>
    )
  }

  _handlePlay() {
    const { asset } = this.props
    const audio = new Audio(asset.signed_url)
    audio.play()
  }


}

export default RecordingToken
