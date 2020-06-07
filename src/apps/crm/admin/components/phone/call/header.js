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
    const { contact, direction, from, program } = call.call
    return (
      <div className={`maha-phone-call-header ${direction}`}>
        <div className="maha-phone-call-header-program">
          <Logo team={ program } />
          <h4>{ program.title }</h4>
          <p>{ program.phone_number.formatted }</p>
        </div>
        <div className="maha-phone-call-header-link">
          <i className="fa fa-arrow-right" />
        </div>
        <div className="maha-phone-call-header-contact">
          <ContactAvatar { ...contact } />
          <h4>{ contact ? contact.display_name : 'Unknown' }</h4>
          <p>{ from.formatted }</p>
        </div>
      </div>
    )
  }

}

export default Header
