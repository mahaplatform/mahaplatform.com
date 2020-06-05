import PropTypes from 'prop-types'
import Header from './header'
import React from 'react'

class Ringing extends React.Component {

  static propTypes = {
    call: PropTypes.object
  }

  _handleAccept = this._handleAccept.bind(this)
  _handleReject = this._handleReject.bind(this)

  render() {
    return (
      <div className="maha-phone-call">
        <Header { ...this._getHeader() } />
        <div className="maha-phone-call-body">
          <div className="maha-phone-call-actions">
            <div className="maha-phone-call-action">
              <div className="maha-phone-call-button hangup" onClick={ this._handleReject }>
                <i className="fa fa-phone" />
              </div>
            </div>
            <div className="maha-phone-call-action">
              <div className="maha-phone-call-button pickup" onClick={ this._handleAccept }>
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

  _handleAccept() {
    const { call } = this.props
    call.connection.accept()
  }

  _handleReject() {
    const { call } = this.props
    call.connection.reject()
  }

}

export default Ringing
