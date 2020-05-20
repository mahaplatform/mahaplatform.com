import SMSClient from '../sms_client'
import PropTypes from 'prop-types'
import Channels from './channels'
import React from 'react'

class ProgramChannels extends React.PureComponent {

  static propTypes = {
    program: PropTypes.object
  }

  state = {
    contact: null,
    phone_number: null
  }

  _handleChoose = this._handleChoose.bind(this)

  render() {
    const { contact } = this.state
    return (
      <div className="crm-program-channels">
        <div className="crm-program-channels-sidebar">
          <Channels { ...this._getChannels() } />
        </div>
        <div className="crm-program-channels-body">
          { contact &&
            <SMSClient { ...this._getSMSClient() } />
          }
        </div>
      </div>
    )
  }

  _getChannels() {
    const { program } = this.props
    return {
      program,
      onChoose: this._handleChoose
    }
  }

  _getSMSClient() {
    const { contact, phone_number } = this.state
    const { program } = this.props
    return {
      key: `channel_${phone_number.id}`,
      contact,
      phone_number,
      program
    }
  }

  _handleChoose(channel) {
    this.setState({
      contact: channel.contact,
      phone_number: channel.phone_number
    })
  }

}

export default ProgramChannels
