import PropTypes from 'prop-types'
import Header from './header'
import React from 'react'

class Call extends React.Component {

  static propTypes = {
    call: PropTypes.object
  }

  _handleAccept = this._handleAccept.bind(this)
  _handleReject = this._handleReject.bind(this)

  render() {
    const { call } = this.props
    return (
      <div className="maha-phone-call">
        <Header call={ call } />
        { call.params.transfered_from &&
          <div className="maha-phone-call-transfered">
            Call transfered from { call.params.transfered_from }
          </div>
        }
        <div className="maha-phone-call-body">
          <div className="maha-phone-call-actions">
            <div className="maha-phone-call-action">
              <div className="maha-phone-call-button hangup" onClick={ this._handleReject }>
                <i className="fa fa-phone" />
              </div>
              <div className="maha-phone-call-label">
                Decline
              </div>
            </div>
            <div className="maha-phone-call-action">
              <div className="maha-phone-call-button pickup" onClick={ this._handleAccept }>
                <i className="fa fa-phone" />
              </div>
              <div className="maha-phone-call-label">
                Accept
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

  _getPanel() {
    return {
      title: 'Incoming Call'
    }
  }

  _handleAccept() {
    const { call } = this.props
    this.props.call.accept(call)
  }

  _handleReject() {
    const { call } = this.props
    call.connection.reject()
  }

}

export default Call
