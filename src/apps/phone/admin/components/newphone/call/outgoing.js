import PropTypes from 'prop-types'
import Button from '../button'
import Header from './header'
import React from 'react'

class Outgoing extends React.Component {

  static contextTypes = {
    phone: PropTypes.object
  }

  static propTypes = {
    call: PropTypes.object,
    program: PropTypes.object
  }

  _handleHangup = this._handleHangup.bind(this)

  render() {
    const { call } = this.props
    return (
      <div className="maha-phone-call">
        <Header call={ call.call } />
        <div className="maha-phone-call-body">
          <div className="maha-phone-call-extra">
            { call.status}
          </div>
        </div>
        { call.client !== 'cell' &&
          <div className="maha-phone-actions">
            <div className="maha-phone-action">
              <Button { ...this._getHangup() } />
            </div>
          </div>
        }
      </div>
    )
  }

  _getHangup() {
    return { icon: 'phone', type: 'hangup', handler: this._handleHangup }
  }

  _handleHangup() {
    const { call } = this.props
    this.context.phone.hangup(call)
  }

}

export default Outgoing
