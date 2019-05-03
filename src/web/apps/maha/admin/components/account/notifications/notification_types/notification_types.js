import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class NotificationTypes extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.array,
    endpoint: PropTypes.string,
    ignored: PropTypes.array,
    items: PropTypes.array,
    notifications: PropTypes.array,
    status: PropTypes.string,
    onChange: PropTypes.func,
    onLoad: PropTypes.func,
    onReady: PropTypes.func,
    onSet: PropTypes.func,
    onToggle: PropTypes.func
  }

  render() {
    const { items } = this.props
    return (
      <div>
        <p>When you receive a notification, we will try our best to deliver every
          notification to you in the following order:
          <strong>in app</strong>, <strong>push</strong>, and then <strong>email</strong>.
          You can customize which notifications your wish to receive via which methods.
        </p>
        <div className="maha-notification-types">
          { items.map((app, index) => [
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
                  <div className="maha-notification-types-notification-method" onClick={ this._handleToggle.bind(this, item.id, 'inapp') }>
                    <i className={ this._getChecked(item.id, 'inapp') } />
                    In App
                  </div>
                  <div className="maha-notification-types-notification-method" onClick={ this._handleToggle.bind(this, item.id, 'push') }>
                    <i className={ this._getChecked(item.id, 'push') } />
                    Push
                  </div>
                  <div className="maha-notification-types-notification-method" onClick={ this._handleToggle.bind(this, item.id, 'email') }>
                    <i className={ this._getChecked(item.id, 'email') } />
                    Email
                  </div>
                </div>
              </div>
            ))
          ])}
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, endpoint, onSet, onLoad } = this.props
    if(defaultValue) onSet(defaultValue)
    onLoad(endpoint)
  }

  componentDidUpdate(prevProps) {
    const { ignored, status, onReady } = this.props
    if(status !== prevProps.status && status === 'success') onReady()
    if(!_.isEqual(ignored, prevProps.ignored)) this._handleChange()
  }

  _handleChange() {
    const { ignored } = this.props
    this.props.onChange(ignored.filter(value => {
      return !(value.inapp_enabled && value.push_enabled && value.email_enabled)
    }))
  }

  _getChecked(notification_type_id, method) {
    const { ignored } = this.props
    const record = _.find(ignored, { notification_type_id })
    const checked = record === undefined || record[`${method}_enabled`] === true
    return checked ? 'fa fa-check-circle' : 'fa fa-circle-o'
  }

  _handleToggle(notification_type_id, method) {
    this.props.onToggle(notification_type_id, method)
  }

}

export default NotificationTypes
