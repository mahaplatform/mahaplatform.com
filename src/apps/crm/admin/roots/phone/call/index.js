import ContactAvatar from '../../../tokens/contact_avatar'
import Program from '../programs/program'
import { Container } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Call extends React.Component {

  static contextTypes = {
    phone: PropTypes.object
  }

  static propTypes = {
    contact: PropTypes.object,
    call: PropTypes.object,
    program: PropTypes.object
  }

  _handleHangup = this._handleHangup.bind(this)
  _handleMute = this._handleMute.bind(this)
  _handlePickup = this._handlePickup.bind(this)

  render() {
    const { call, contact, program } = this.props
    return (
      <div className="maha-phone-call">
        <div className="maha-phone-call-program">
          <Program program={ program } />
        </div>
        <div className="maha-phone-call-contact">
          <ContactAvatar { ...contact } />
          <h2>{ contact.display_name }</h2>
        </div>
        { call.status === 'ringing' &&
          <div className="maha-phone-call-body">
            <div className="maha-phone-call-button pickup" onClick={ this._handlePickup }>
              <i className="fa fa-phone" />
            </div>
          </div>
        }
        { call.status === 'active' &&
          <div className="maha-phone-call-body">
            <div className="maha-phone-call-button" onClick={ this._handleMute }>
              { call.muted ?
                <i className="fa fa-microphone-slash" />:
                <i className="fa fa-microphone" />
              }
            </div>
            <div className="maha-phone-call-button hangup" onClick={ this._handleHangup }>
              <i className="fa fa-phone" />
            </div>
          </div>
        }
      </div>
    )
  }

  _handleHangup() {
    this.context.phone.hangup()
  }

  _handleMute() {
    this.context.phone.mute()
  }

  _handlePickup() {
    this.context.phone.pickup()
  }

}

const mapResources = (props, context) => ({
  contact: `/api/admin/crm/contacts/${props.call.contact_id}`,
  program: `/api/admin/crm/programs/${props.call.program_id}`
})

export default Container(mapResources)(Call)
