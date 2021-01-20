import PropTypes from 'prop-types'
import { Message } from '@client'
import React from 'react'

class Complete extends React.Component {

  static propTypes = {
    data: PropTypes.object,
    Store: PropTypes.object,
    onDone: PropTypes.func
  }

  _handleDone = this._handleDone.bind(this)

  render() {
    return (
      <div className="maha-checkout-panel">
        <div className="maha-checkout-panel-message">
          <Message {...this._getMessage()} />
        </div>
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
      animation: 'tada',
      buttons: [
        { label: 'Done', handler: this. _handleDone }
      ]
    }
  }

  _handleDone() {
    this.props.onDone()
  }

}

export default Complete
