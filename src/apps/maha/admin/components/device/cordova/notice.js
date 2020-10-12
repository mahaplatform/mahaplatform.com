import PropTypes from 'prop-types'
import React from 'react'

class Notice extends React.Component {

  static propTypes = {
    status: PropTypes.string,
    onClose: PropTypes.func,
    onNeverAskAgain: PropTypes.func,
    onPromptNotifications: PropTypes.func
  }

  render() {
    const { status } = this.props
    return (
      <div className="maha-notice">
        <div className="maha-notice-image">
          <img src="/images/notifications.jpg" />
        </div>
        <div className="maha-notice-body">
          { status === 'notification_denied' ?
            <div className="maha-notice-message">
              <h3>Notifications Blocked</h3>
              <p>
                You&apos;ve disallowed push notifications. If you want to
                enable them in the future, you&apos;ll need to open your
                settings to change that.
              </p>
              <p>
                <button className="ui fluid green button" onClick={ this._handleClose }>Done</button>
              </p>
            </div> :
            <div className="maha-notice-message">
              <h3>Don&apos;t miss a message or notification!</h3>
              <p>
                Maha can send push notifications to alert you when there
                are actions that require your attention! We need your
                permission to enable push notifications</p>
              <p>
                <button className="ui fluid green button" onClick={ this._handlePromptNotifications }>Enable Notifications</button>
              </p>
              <p>
                <span onClick={ this._handleClose }>Ask me next time</span><br />
                <span onClick={ this._handleNeverAskAgain }>Never ask again on this device</span>
              </p>
            </div>
          }
        </div>
      </div>
    )
  }

  _handleClose = this._handleClose.bind(this)
  _handleNeverAskAgain = this._handleNeverAskAgain.bind(this)
  _handlePromptNotifications = this._handlePromptNotifications.bind(this)

  _handleClose() {
    this.props.onClose()
  }

  _handleNeverAskAgain() {
    this.props.onNeverAskAgain()
  }

  _handlePromptNotifications() {
    this.props.onPromptNotifications()
  }

}

export default Notice
