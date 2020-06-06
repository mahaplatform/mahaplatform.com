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

  _handleSwap = this._handleSwap.bind(this)

  render() {
    const { call } = this.props
    const { contact, program } = call.call
    return (
      <div className="maha-phone-receiver-inactive" onClick={ this._handleSwap }>
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

  _handleSwap() {
    const { call } = this.props
    this.props.call.swap(call)
  }

}

export default Inactive
