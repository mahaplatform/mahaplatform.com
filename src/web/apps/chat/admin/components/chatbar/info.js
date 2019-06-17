import { ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import Info from '../info'
import React from 'react'

class ChatBarInfo extends React.Component {

  static propTypes = {
    channels: PropTypes.array,
    channel: PropTypes.object,
    selected: PropTypes.number,
    status: PropTypes.string,
    onBack: PropTypes.func,
    onEdit: PropTypes.func,
    onShowMessage: PropTypes.func,
    onSubscriptions: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleEdit = this._handleEdit.bind(this)
  _handleShowMessage = this._handleShowMessage.bind(this)
  _handleSubscriptions = this._handleSubscriptions.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <Info { ...this._getInfo() } />
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Info',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
  }

  _getInfo() {
    const { channel, selected } = this.props
    return {
      channel,
      id: selected,
      showHeader: true,
      onEdit: this._handleEdit,
      onSubscriptions: this._handleSubscriptions
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleEdit() {
    this.props.onEdit()
  }

  _handleShowMessage(id) {
    this.props.onShowMessage(id)
  }

  _handleSubscriptions() {
    this.props.onSubscriptions()
  }

}

export default ChatBarInfo
