import { ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import Channel from '../channel'
import React from 'react'

class ChatBarChannel extends React.Component {

  static contextTypes = {
  }

  static propTypes = {
    channels: PropTypes.array,
    channel: PropTypes.object,
    selected: PropTypes.number,
    status: PropTypes.string,
    onBack: PropTypes.func,
    onInfo: PropTypes.func,
    onShowMessage: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleInfo = this._handleInfo.bind(this)
  _handleShowMessage = this._handleShowMessage.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <Channel { ...this._getChannel() } />
      </ModalPanel>
    )
  }

  _getPanel() {
    const { channel } = this.props
    return {
      title: channel.name || channel.label,
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ],
      rightItems: [
        { icon: 'info-circle', handler: this._handleInfo }
      ]
    }
  }

  _getChannel() {
    const { channel, selected } = this.props
    return {
      channel,
      id: selected,
      onShowMessage: this._handleShowMessage
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleShowMessage(id) {
    this.props.onShowMessage(id)
  }

  _handleInfo() {
    this.props.onInfo()
  }

}

export default ChatBarChannel
