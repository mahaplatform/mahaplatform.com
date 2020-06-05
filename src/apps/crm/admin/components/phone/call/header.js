import ContactAvatar from '../../../tokens/contact_avatar'
import Program from '../programs/program'
import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Header extends React.Component {

  static propTypes = {
    call: PropTypes.object
  }

  render() {
    const { call } = this.props
    return (
      <div className="maha-phone-call-header">
        <div className="maha-phone-call-program">
          <Program program={ call.program } />
        </div>
        <div className="maha-phone-call-contact">
          <ContactAvatar { ...call.contact } />
          <h2>{ call.contact.display_name }</h2>
          <div><Button { ...this._getContactButton(call.contact) } /></div>
        </div>
      </div>
    )
  }

  _getContactButton(contact) {
    return {
      label: 'View Profile',
      className: 'link',
      route: `/admin/crm/contacts/${contact.id}`
    }
  }

}

export default Header
