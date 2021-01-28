import PropTypes from 'prop-types'
import Button from '../button'
import Header from './header'
import React from 'react'

class Incoming extends React.Component {

  static propTypes = {
    call: PropTypes.object,
    program: PropTypes.object
  }

  _handleAccept = this._handleAccept.bind(this)
  _handleReject = this._handleReject.bind(this)

  render() {
    const { program } = this.props
    const { call } = this.props.call
    const buttons = this._getButtons()
    return (
      <div className="maha-phone-call">
        <Header program={ program } call={ call } />
        <div className="maha-phone-call-body">
          <div className="maha-phone-actions" >
            { buttons.map((button, index) => (
              <div className="maha-phone-action" key={`action_${index}`}>
                <Button { ...button } />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  _getButtons() {
    return [
      { icon: 'phone', type: 'hangup', label: 'Decline', handler: this._handleReject },
      { icon: 'arrow-right', type: 'hangup', label: 'Send to Cell', handler: this._handleReject },
      { icon: 'phone', type: 'pickup', label: 'Accept', handler: this._handleAccept }
    ]
  }

  _getPanel() {
    return {
      title: 'Incoming Call'
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

export default Incoming
