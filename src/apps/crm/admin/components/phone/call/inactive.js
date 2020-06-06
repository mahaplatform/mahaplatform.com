import ContactAvatar from '../../../tokens/contact_avatar'
import PropTypes from 'prop-types'
import Timer from '../../timer'
import React from 'react'

class Inactive extends React.Component {

  static contextTypes = {
    phone: PropTypes.object
  }

  static propTypes = {
    call: PropTypes.object
  }

  render() {
    const { call } = this.props
    const { contact, program } = call.call
    return (
      <div className="maha-phone-receiver-inactive" onClick={ this._handleSelect.bind(this, call) }>
        <div className="maha-phone-receiver-inactive-avatar">
          <ContactAvatar { ...contact } />
        </div>
        <div className="maha-phone-receiver-inactive-label">
          { contact.full_name }<br />
          <span>{ program.title }</span>
        </div>
        <div className="maha-phone-receiver-inactive-timer">
          <Timer from={ call.started_at } />
        </div>
      </div>
    )
  }

  _handleSelect(call) {
    this.context.phone.select(call)
  }

}

export default Inactive
