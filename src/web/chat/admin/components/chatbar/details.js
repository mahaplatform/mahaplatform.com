import { ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import Details from '../details'
import React from 'react'

class ChatBarDetails extends React.Component {

  static propTypes = {
    message: PropTypes.object
  }

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <Details { ...this._getDetails() } />
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

  _getDetails() {
    const { message } = this.props
    return {
      message
    }
  }

  _handleBack() {
    this.props.onBack()
  }

}

export default ChatBarDetails
