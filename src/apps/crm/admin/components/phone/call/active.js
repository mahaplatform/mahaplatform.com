import PropTypes from 'prop-types'
import Header from './header'
import React from 'react'

class Active extends React.Component {

  static propTypes = {
    call: PropTypes.object
  }

  _handleHangup = this._handleHangup.bind(this)
  _handleMute = this._handleMute.bind(this)
  _handlePause = this._handlePause.bind(this)

  render() {
    const { call } = this.props
    return (
      <div className="maha-phone-call">
        <Header { ...this._getHeader() } />
        <div className="maha-phone-call-body">
          <div className="maha-phone-call-actions">
            <div className="maha-phone-call-action">
              <div className="maha-phone-call-button" onClick={ this._handlePause }>
                { call.paused ?
                  <i className="fa fa-play" />:
                  <i className="fa fa-pause" />
                }
              </div>
            </div>
            <div className="maha-phone-call-action">
              <div className="maha-phone-call-button" onClick={ this._handleMute }>
                { call.muted ?
                  <i className="fa fa-microphone-slash" />:
                  <i className="fa fa-microphone" />
                }
              </div>
            </div>
            <div className="maha-phone-call-action">
              <div className="maha-phone-call-button hangup" onClick={ this._handleHangup }>
                <i className="fa fa-phone" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  _getHeader() {
    const { call } = this.props.call
    return {
      call
    }
  }

  _handleHangup() {
    const { call } = this.props
    call.connection.disconnect()
  }

  _handlePause() {
    const { call } = this.props
    // call.connection.mute()
  }

  _handleMute() {
    const { call } = this.props
    call.connection.mute()
  }

}

export default Active
