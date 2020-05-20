import { Infinite } from 'maha-admin'
import PropTypes from 'prop-types'
import Results from './results'
import React from 'react'

class Email extends React.Component {

  static propTypes = {
    contact: PropTypes.object,
    email_address: PropTypes.number,
    program: PropTypes.number
  }

  render() {
    return <Infinite { ...this._getInfinite() } />
  }

  _getInfinite() {
    const { contact, email_address, program } = this.props
    return {
      endpoint: `/api/admin/crm/contacts/${contact.id}/channels/programs/${program.id}/email/${email_address.id}/emails`,
      empty: {
        icon: 'envelope',
        title: 'No Emails',
        text: 'The contact has not sent or received any emails via this channel'
      },
      layout: Results,
      props: { contact }
    }
  }

}

export default Email
