import ContactAvatar from '@apps/crm/admin/tokens/contact_avatar'
import PropTypes from 'prop-types'
import { Timer } from '@admin'
import Button from '../button'
import React from 'react'

class Inactive extends React.Component {

  static contextTypes = {
    phone: PropTypes.object
  }

  static propTypes = {
    call: PropTypes.object
  }

  _handleAccept = this._handleAccept.bind(this)
  _handleReject = this._handleReject.bind(this)
  _handleSwap = this._handleSwap.bind(this)

  render() {
    const { call } = this.props
    const { contact, direction, from, program, to } = call.call
    return (
      <div className="maha-phone-receiver-inactive" onClick={ this._handleSwap }>
        <div className="maha-phone-receiver-inactive-avatar">
          <ContactAvatar { ...contact } />
        </div>
        <div className="maha-phone-receiver-inactive-label">
          <div className="maha-phone-receiver-inactive-contact">
            { contact ? contact.display_name : (direction === 'inbound' ? from : to) }<br />
          </div>
          <div className="maha-phone-receiver-inactive-program">
            { program.title }
          </div>
          <span></span>
        </div>
        { call.answered ?
          <div className="maha-phone-receiver-inactive-timer">
            <Timer from={ call.started_at } />
          </div> :
          <div className="maha-phone-actions" >
            <div className="maha-phone-action">
              <Button { ...this._getReject() } />
            </div>
            <div className="maha-phone-action">
              <Button { ...this._getAccept() } />
            </div>
          </div>
        }
      </div>
    )
  }

  _getAccept() {
    return { icon: 'phone', type: 'pickup', handler: this._handleSwap }
  }

  _getReject() {
    return { icon: 'phone', type: 'hangup', handler: this._handleReject }
  }

  _handleAccept(e) {
    e.stopPropagation()
    const { call } = this.props
    this.context.phone.swap(call)
  }

  _handleReject(e) {
    e.stopPropagation()
    const { call } = this.props
    this.context.phone.reject(call)
  }

  _handleSwap() {
    const { call } = this.props
    this.context.phone.swap(call)
  }

}

export default Inactive
