import PropTypes from 'prop-types'
import React from 'react'

class Notifications extends React.Component {

  static propTypes = {
    notifications: PropTypes.array
  }

  render() {
    const { notifications } = this.props
    return (
      <div className="maha-notification-types">
        { notifications.map((app, index) => [
          <div className="maha-notification-types-app" key={`app_${index}`}>
            <div className={`maha-notification-types-app-icon ${app.color}`}>
              <i className={`fa fa-fw fa-${app.icon}`} />
            </div>
            { app.title }
          </div>,
          app.items.map((item, i) => (
            <div className="maha-notification-types-notification" key={`notification_${i}`}>
              <div className="maha-notification-types-notification-label">
                { item.description }<br />
              </div>
              <div className="maha-notification-types-notification-methods">
                <div className="maha-notification-types-notification-method-display">
                  <i className={ this._getChecked(item, 'inapp') } />
                  In App
                </div>
                <div className="maha-notification-types-notification-method-display">
                  <i className={ this._getChecked(item, 'push') } />
                  Push
                </div>
                <div className="maha-notification-types-notification-method-display">
                  <i className={ this._getChecked(item, 'email') } />
                  Email
                </div>
              </div>
            </div>
          ))
        ])}
      </div>
    )
  }

  _getChecked(notification, method) {
    return notification[`${method}_enabled`] ? 'fa fa-check-circle' : 'fa fa-circle-o'
  }

}

export default Notifications
