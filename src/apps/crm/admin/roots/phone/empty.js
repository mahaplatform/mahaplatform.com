import { ModalPanel, Message } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Empty extends React.Component {

  static propTypes = {
    onClose: PropTypes.func
  }

  _handleClose = this._handleClose.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <Message { ...this._getEmpty() } />
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Phone',
      color: 'violet',
      leftItems: [
        { icon: 'times', handler: this._handleClose }
      ]
    }

  }

  _getEmpty() {
    return {
      icon: 'phone',
      title: 'No Phone Numbers',
      text: 'You have not yet provisioned a phone number for any of your programs'
    }
  }

  _handleClose() {
    this.props.onClose()
  }

}

export default Empty
