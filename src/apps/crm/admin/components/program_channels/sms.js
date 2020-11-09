import SMSClient from '@apps/phone/admin/components/sms_client'
import PropTypes from 'prop-types'
import React from 'react'

class Sms extends React.PureComponent {

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

export default Sms
