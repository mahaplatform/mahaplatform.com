import ContactAvatar from '@apps/crm/admin/tokens/contact_avatar'
import PropTypes from 'prop-types'
import { Timer } from '@admin'
import React from 'react'

class Inactive extends React.Component {

  static contextTypes = {
    phone: PropTypes.object
  }

  static propTypes = {
    call: PropTypes.object
  }

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
          { contact ? contact.display_name : (direction === 'inbound' ? from : to) }<br />
          <span>{ program.title }</span>
        </div>
        <div className="maha-phone-receiver-inactive-timer">
          <Timer from={ call.started_at } />
        </div>
      </div>
    )
  }

  _handleSwap() {
    const { call } = this.props
    this.context.phone.swap(call)
  }

}

export default Inactive
