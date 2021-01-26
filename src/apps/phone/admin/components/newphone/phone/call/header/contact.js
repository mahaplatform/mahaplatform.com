import ContactAvatar from '@apps/crm/admin/tokens/contact_avatar'
import PropTypes from 'prop-types'
import React from 'react'

class Contact extends React.Component {

  static propTypes = {
    contact: PropTypes.object,
    from: PropTypes.string
  }

  render() {
    const { contact, from } = this.props
    return (
      <div className="maha-phone-call-header-contact">
        <ContactAvatar { ...contact } />
        <h4>{ contact ? contact.display_name : 'Unknown' }</h4>
        <p>{ from }</p>
      </div>
    )
  }

}

export default Contact
