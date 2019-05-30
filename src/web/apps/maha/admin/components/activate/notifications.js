import NotificationMethodToken from '../notification_method_token'
import { RadioGroup } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Notifications extends React.Component {

  static propTypes = {
    token: PropTypes.string,
    onNotifications: PropTypes.func
  }

  _handleNotification = this._handleNotification.bind(this)

  render() {
    return (
      <div className="maha-signin-panel">
        <div className="maha-signin-form">
          <div className="maha-signin-content">
            <h2>Notification Preferences</h2>
            <p>
              If you are not signed in when a notification arrives, we can
              send you an email. Please indicate how you would like to
              be contacted when you miss a notification.
            </p>
            <RadioGroup { ...this._getRadioGroup()} />
          </div>
        </div>
      </div>
    )
  }

  _getRadioGroup() {
    return {
      options: [
        { code: 'none', title: 'Do Nothing', text: 'Please do not send me any notifications via email' },
        { code: 'ondemand', title: 'On Demand', text: 'Send me an email whenever I miss a notification' },
        { code: 'digest', title: 'Daily Digest', text: 'Send me a daily email with all of my missed notifcations from the previous day' }
      ],
      value: 'code',
      text: 'title',
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
