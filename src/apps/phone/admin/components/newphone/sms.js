import SMSClient from '@apps/phone/admin/components/sms_client'
import { ModalPanel } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

class SMS extends React.Component {

  static propTypes = {
    phone_number: PropTypes.object,
    program: PropTypes.object,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <SMSClient { ...this._getSMSClient() } />
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Conversation',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
  }

  _getSMSClient() {
    const { phone_number, program } = this.props
    console.log({ phone_number, program })
    return {
      phone_number,
      program
    }
  }

  _handleBack() {
    this.props.onPop()
  }

}

export default SMS
