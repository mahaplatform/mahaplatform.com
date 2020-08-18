import { Button, Message } from 'maha-client'
import PropTypes from 'prop-types'
import React from 'react'

class Complete extends React.Component {

  static propTypes = {
    event: PropTypes.object,
    onDone: PropTypes.func
  }

  _handleDone = this._handleDone.bind(this)

  render() {
    return (
      <div className="maha-checkout-panel">
        <div className="maha-checkout-panel-message">
          <Message {...this._getMessage()} />
        </div>
        { this.props.onDone &&
          <div className="maha-checkout-panel-footer">
            <div className="maha-checkout-panel-footer-item" />
            <div className="maha-checkout-panel-footer-item">
              <Button { ...this._getDone() } />
            </div>
          </div>
        }
      </div>
    )
  }

  _getDone() {
    return {
      label: 'Done',
      color: 'red',
      handler: this._handleDone
    }
  }

  _getMessage() {
    return {
      title: 'Purchase Complete!',
      text: 'Thank you for your purchase',
      icon: 'check',
      color: 'green',
      animation: 'tada'
    }
  }

  _handleDone() {
    this.props.onDone()
  }

}

export default Complete
