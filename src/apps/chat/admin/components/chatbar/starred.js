import { ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import Starred from '../starred'
import React from 'react'

class ChatBarStarred extends React.Component {

  static contextTypes = {
  }

  static propTypes = {
    channels: PropTypes.array,
    channel: PropTypes.object,
    selected: PropTypes.number,
    status: PropTypes.string,
    onBack: PropTypes.func,
    onShowMessage: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleShowMessage = this._handleShowMessage.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <Starred { ...this._getStarred() } />
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Starred',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
  }

  _getStarred() {
    return {
      onShowMessage: this._handleShowMessage
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleShowMessage(message) {
    this.props.onShowMessage(message)
  }

}

export default ChatBarStarred
