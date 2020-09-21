import NotificationMethodToken from '../../tokens/notification_method'
import { RadioGroup } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Notifications extends React.Component {

  static propTypes = {
    team: PropTypes.object,
    token: PropTypes.string,
    onNotifications: PropTypes.func
  }

  _handleNotification = this._handleNotification.bind(this)

  render() {
    const { team } = this.props
    return (
      <div className="maha-signin-panel">
        <div className="maha-signin-form">
          <div className="maha-signin-content">
            <h2>Notification Preferences</h2>
            <p>
              If you are not signed in when a notification arrives
              for <strong>{ team.title }</strong>, we can send you an email.
              Please indicate how you would like to be contacted when you miss
              a notification.
            </p>
            <RadioGroup { ...this._getRadioGroup()} />
          </div>
        </div>
      </div>
    )
  }

  _getRadioGroup() {
    return {
      deselectable: false,
      options: ['none','ondemand','digest'],
      format: NotificationMethodToken,
      onChange: this._handleNotification
    }
  }

  _handleNotification(value) {
    const { token, onNotifications } = this.props
    onNotifications(token, value)
  }

}

export default Notifications
