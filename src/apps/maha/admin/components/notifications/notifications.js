import { CSSTransition } from 'react-transition-group'
import Notification from './notification'
import { connect } from 'react-redux'
import { Avatar, Logo } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Notifications extends React.Component {

  static childContextTypes = {
    notifications: PropTypes.object
  }

  static contextTypes = {
    host: PropTypes.object,
    network: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any,
    notifications: PropTypes.array,
    preferences: PropTypes.object,
    onClear: PropTypes.func,
    onMarkVisited: PropTypes.func,
    onPush: PropTypes.func,
    onRemove: PropTypes.func
  }

  _handleClear = this._handleClear.bind(this)
  _handleClick = this._handleClick.bind(this)
  _handleMarkVisited = this._handleMarkVisited.bind(this)
  _handlePushDesktop = this._handlePushDesktop.bind(this)
  _handlePushInApp = this._handlePushInApp.bind(this)
  _handlePushNotification = this._handlePushNotification.bind(this)
  _handleRemove = this._handleRemove.bind(this)

  render() {
    const { notifications } = this.props
    return (
      <div className="maha-notifications">
        { this.props.children }
        <CSSTransition in={ notifications.length > 0 } timeout={ 500 } classNames="drop" mountOnEnter={ true } unmountOnExit={ true }>
          <div className="maha-notifications-frame">
            <div className="maha-notifications-panel">
              { notifications.map((notification, index) => (
                <Notification { ...this._getNotification(notification, index) } key={ `notification_${index}` } />
              )) }
            </div>
          </div>
        </CSSTransition>
      </div>
    )
  }

  componentDidMount() {
    this.context.network.subscribe([
      { action: 'add_notification', handler: this._handlePushNotification }
    ])
  }

  componentWillUnmount() {
    this.context.network.unsubscribe([
      { action: 'add_notification', handler: this._handlePushNotification }
    ])
  }

  getChildContext() {
    return {
      notifications: {
        clear: this._handleClear,
        markVisited: this._handleMarkVisited,
        pushNotification: this._handlePushNotification,
        pushInApp: this._handlePushInApp,
        pushDesktop: this._handlePushDesktop,
        remove: this._handleRemove
      }
    }
  }

  _getNotification(notification, index) {
    return {
      notification,
      onClick: this._handleClick.bind(this, index),
      onRemove: this._handleRemove.bind(this, notification.code)
    }
  }

  _handleClear() {
    this.props.onClear()
  }

  _handleClick(index) {
    const { notifications } = this.props
    const notification = notifications[index]
    this.props.onRemove(notification.code)
    if(!notification.route) return
    this.context.router.history.push(notification.route)
  }

  _handleMarkVisited(id) {
    this.props.onMarkVisited(id)
  }

  _handlePlaySound(notification) {
    const { preferences } = this.props
    const sound = notification.sound || preferences.notification_sound || 'notification'
    const audio = new Audio(`/audio/${sound}.mp3`)
    audio.play()
  }

  _handleDesktopClick(notification, e) {
    e.preventDefault()
    e.target.close()
    window.focus()
    if(notification.route) this.context.router.history.push(notification.route)
  }

  _handlePushNotification(notification) {
    const { host } = this.context
    const { preferences } = this.props
    const { push_notifications_enabled, in_app_notifications_enabled, notification_sound_enabled, notification_types } = preferences
    const hasFocus = host.hasFocus()
    const notification_type = _.find(notification_types, { type: notification.type })
    const inapp_enabled = (!notification_type || notification_type.inapp_enabled) && in_app_notifications_enabled
    const push_enabled = (!notification_type || notification_type.push_enabled) && push_notifications_enabled
    const inapp = hasFocus && inapp_enabled
    const push = !hasFocus && push_enabled
    const sound = (inapp || push) && notification_sound_enabled
    if(sound) this._handlePlaySound(notification)
    if(inapp) return this._handlePushInApp(notification)
    if(push) return this._handlePushDesktop(notification)
  }

  _handlePushInApp(notification) {
    const { onPush } = this.props
    const code = _.random(Math.pow(36,9).toString(36), Math.pow(36, 10) - 1).toString(36)
    onPush(code, notification)
  }

  _handlePushDesktop(notification) {
    this.context.host.pushNotification(notification)
  }

  _handleRemove(code) {
    this.props.onRemove(code)
  }

}

const mapStateToProps = (state, props) => ({
  preferences: _.get(state, 'maha.admin.preferences')
})

export default connect(mapStateToProps)(Notifications)
