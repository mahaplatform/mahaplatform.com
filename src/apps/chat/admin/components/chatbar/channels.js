import { ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import Channels from '../channels'
import React from 'react'

class ChatBarChannels extends React.Component {

  static contextTypes = {}

  static propTypes = {
    channels: PropTypes.array,
    channel: PropTypes.object,
    selected: PropTypes.number,
    status: PropTypes.string,
    onNew: PropTypes.func,
    onChoose: PropTypes.func,
    onClose: PropTypes.func
  }

  _handleChoose = this._handleChoose.bind(this)
  _handleClose = this._handleClose.bind(this)
  _handleNew = this._handleNew.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <Channels { ...this._getChannels() } />
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Chat',
      leftItems: [
        { icon: 'remove', handler: this._handleClose }
      ],
      rightItems: [
        { icon: 'plus', handler: this._handleNew }
      ]
    }
  }

  _getChannels() {
    const { channels, selected, status } = this.props
    return {
      channels,
      selected,
      showNew: false,
      status,
      onChoose: this._handleChoose,
      onNew: this._handleNew
    }
  }

  _handleChoose(id) {
    this.props.onChoose(id)
  }

  _handleClose() {
    this.props.onClose()
  }

  _handleNew() {
    this.props.onNew()
  }

}

export default ChatBarChannels
