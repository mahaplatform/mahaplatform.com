import { ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import Message from '../message'
import React from 'react'

class ChatBarMessage extends React.Component {

  static propTypes = {
    message: PropTypes.object,
    onBack: PropTypes.func
  }

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <Message { ...this._getMessage() } />
      </ModalPanel>
    )
  }

  _handleBack = this._handleBack.bind(this)

  _getPanel() {
    return {
      title: 'Info',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
  }

  _getMessage() {
    const { message } = this.props
    return {
      ...message,
      inline: false,
      full: true,
      actions: false
    }
  }

  _handleBack() {
    this.props.onBack()
  }

}

export default ChatBarMessage
