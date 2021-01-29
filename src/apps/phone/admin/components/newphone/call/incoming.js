import PropTypes from 'prop-types'
import Button from '../button'
import Header from './header'
import React from 'react'

class Incoming extends React.Component {

  static contextTypes = {
    phone: PropTypes.object
  }

  static propTypes = {
    call: PropTypes.object
  }

  _handleAccept = this._handleAccept.bind(this)
  _handleReject = this._handleReject.bind(this)

  render() {
    const { program } = this.props
    const { call, extra } = this.props.call
    const buttons = this._getButtons()
    return (
      <div className="maha-phone-call">
        <Header call={ call } />
        { extra &&
          <div className="maha-phone-call-extra">
            { extra.transfered_from &&
              <div className="maha-phone-call-transfered">
                Call transfered from { extra.transfered_from }
              </div>
            }
            { extra.transfered_back_from &&
              <div className="maha-phone-call-transfered">
                No answer, call transfered back from { extra.transfered_back_from }
              </div>
            }
          </div>
        }
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
    this.context.phone.accept(call)
  }

  _handleReject() {
    const { call } = this.props
    this.context.phone.reject(call)
  }

}

export default Incoming
