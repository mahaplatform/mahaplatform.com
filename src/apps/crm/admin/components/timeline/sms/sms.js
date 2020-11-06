import { ModalPanel } from '@admin'
import SMSClient from '../../sms_client'
import PropTypes from 'prop-types'
import React from 'react'

class SMS extends React.Component {

  static propTypes = {
    contact: PropTypes.object,
    phone_number: PropTypes.object,
    program: PropTypes.object,
    onBack: PropTypes.func,
    onDone: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <SMSClient { ...this._getSMSClient() } />
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'SMS Thread',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ],
      rightItems: [
        { label: 'Done', handler: this._handleDone }
      ]
    }
  }

  _getSMSClient() {
    const { phone_number, program } = this.props
    return {
      phone_number,
      program
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleDone() {
    this.props.onDone()
  }

}

export default SMS
