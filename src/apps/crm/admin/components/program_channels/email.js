import SMSClient from '../sms_client'
import PropTypes from 'prop-types'
import React from 'react'

class Email extends React.PureComponent {

  static propTypes = {
    channel: PropTypes.channel,
    program: PropTypes.object
  }

  render() {
    return <SMSClient { ...this._getSMSClient() } />
  }

  _getSMSClient() {
    const { channel, program } = this.props
    const { contact, phone_number } = channel
    return {
      contact,
      phone_number,
      program
    }
  }

}

export default Email
