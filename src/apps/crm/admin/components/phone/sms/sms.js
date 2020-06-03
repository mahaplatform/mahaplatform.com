import { ModalPanel } from 'maha-admin'
import SMSClient from '../../sms_client'
import PropTypes from 'prop-types'
import React from 'react'

class SMS extends React.Component {

  static propTypes = {
    channel: PropTypes.object,
    program: PropTypes.object,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <SMSClient { ...this._getClient() } />
      </ModalPanel>
    )
  }

  _getClient() {
    const { channel, program } = this.props
    return {
      program,
      channel
    }
  }

  _getPanel() {
    return {
      title: 'Conversation',
      color: 'blue',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
  }

  _handleBack() {
    this.props.onPop()
  }

}

export default SMS
