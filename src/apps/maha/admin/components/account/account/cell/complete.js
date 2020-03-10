import { ModalPanel, Message } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Complete extends React.Component {

  static propTypes = {
    onDone: PropTypes.func
  }

  _handleDone = this._handleDone.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <Message { ...this._getMessage() } />
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Cell Phone Verification'
    }
  }

  _getMessage() {
    return {
      title: 'Verification Successful!',
      text: 'Your cell phone has been verified',
      icon: 'check',
      color: 'green',
      animation: 'tada',
      button: {
        label: 'Finish',
        handler: this._handleDone
      }
    }
  }

  _handleDone() {
    this.props.onDone()
  }

}

export default Complete
