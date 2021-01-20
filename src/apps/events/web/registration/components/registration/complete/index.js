import { Button, Message } from '@client'
import PropTypes from 'prop-types'
import React from 'react'

class Complete extends React.Component {

  static contextTypes = {
    analytics: PropTypes.object
  }

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

  componentDidMount() {
    this.context.analytics.trackPageView('Complete')
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

export default Complete
