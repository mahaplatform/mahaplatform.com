import { Button, Message } from 'maha-client'
import PropTypes from 'prop-types'
import React from 'react'

class Step2 extends React.Component {

  static propTypes = {
    event: PropTypes.object,
    onDone: PropTypes.func
  }

  _handleDone = this._handleDone.bind(this)

  render() {
    return (
      <div className="registration-panel">
        <div className="registration-panel-message">
          <Message {...this._getMessage()} />
        </div>
        { this.props.onDone &&
          <div className="registration-panel-footer">
            <div className="registration-panel-footer-item" />
            <div className="registration-panel-footer-item">
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
      title: 'Registration Complete!',
      text: 'You will receive your tickets shortly via email',
      icon: 'check',
      color: 'green',
      animation: 'tada'
    }
  }

  _handleDone() {
    this.props.onDone()
  }


}

export default Step2
