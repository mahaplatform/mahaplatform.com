import { Infinite } from 'maha-admin'
import PropTypes from 'prop-types'
import Results from './results'
import React from 'react'

class Email extends React.Component {

  static propTypes = {
    channel: PropTypes.object,
    contact: PropTypes.object,
    program: PropTypes.object
  }

  render() {
    return <Infinite { ...this._getInfinite() } />
  }

  _getInfinite() {
    const { channel, contact, program } = this.props
    return {
      endpoint: `/api/admin/crm/contacts/${contact.id}/channels/programs/${program.id}/email/${channel.id}/emails`,
      empty: {
        icon: 'envelope',
        title: 'No Emails',
        text: 'The contact has not received any emails via this channel'
      },
      layout: Results,
      props: { contact }
    }
  }

}

export default Email
