import ContactAvatar from '../../../tokens/contact_avatar'
import { Logo } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Header extends React.Component {

  static propTypes = {
    call: PropTypes.object
  }

  render() {
    const { call } = this.props
    const { contact, from, program } = call.call
    return (
      <div className="maha-phone-call-header">
        <div className="maha-phone-call-program">
          <Logo team={ program }/>
          <h4>{ program.title }</h4>
          <p>{ program.phone_number.formatted }</p>
        </div>
        <div className="maha-phone-call-contact">
          <ContactAvatar { ...contact } />
          <h4>{ contact.full_name }</h4>
          <p>{ from.formatted }</p>
        </div>
      </div>
    )
  }

}

export default Header
