import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Push extends React.Component {

  static childContextTypes = {
    push: PropTypes.object
  }

  static contextTypes = {
    device: PropTypes.object
  }

  static propTypes = {
    asking: PropTypes.bool,
    children: PropTypes.any,
    permission: PropTypes.string,
    push: PropTypes.string,
    push_enabled: PropTypes.bool,
    user_id: PropTypes.number,
    status: PropTypes.string,
    token: PropTypes.string,
    onAsk: PropTypes.func,
    onGetPermission: PropTypes.func,
    onGetToken: PropTypes.func,
    onLoadPermission: PropTypes.func,
    onLoadPush: PropTypes.func,
    onRegisterWorker: PropTypes.func,
    onRequestPermission: PropTypes.func,
    onSavePush: PropTypes.func
  }

  _handleClose = this._handleClose.bind(this)
  _handleGetToken = this._handleGetToken.bind(this)
  _handleLoaded = this._handleLoaded.bind(this)
  _handleNeverAskAgain = this._handleNeverAskAgain.bind(this)
  _handleRequestPermission = this._handleRequestPermission.bind(this)

  render() {
    const { asking, permission, push } = this.props
    return (
      <div className="maha-push">
        { this.props.children }
        <CSSTransition component={ null } in={ asking } timeout={ 500 } classNames="fade" mountOnEnter={ true } unmountOnExit={ true }>
          <div className="maha-push-modal-overlay" />
        </CSSTransition>
        <CSSTransition component={ null } in={ asking } timeout={ 500 } classNames="fadein" mountOnEnter={ true } unmountOnExit={ true }>
          <div className="maha-push-modal">
            <div className="maha-push-modal-image">
              <img src="/admin/images/notifications.jpg" />
            </div>
            <div className="maha-push-modal-body">
              { push === 'unknown' && permission === 'denied' &&
                <div className="maha-push-modal-message">
                  <h3>Notifications Blocked</h3>
                  <p>
                    You&apos;ve disallowed push notifications. If you want to
                    enable them in the future, you&apos;ll need to open your
                    device settings to change that.
                  </p>
                  <p>
                    <button className="ui fluid green button" onClick={ this._handleClose }>Done</button>
                  </p>
                </div>
              }
              { push === 'never' &&
                <div className="maha-push-modal-message">
                  <h3>Notifications Ignored</h3>
                  <p>
                    We won&apos;t bother you about push notifications any more.
                    If you want to enable them in the future, you can do so in
                    your noticiation preferences.
                  </p>
                  <p>
                    <button className="ui fluid green button" onClick={ this._handleClose }>Done</button>
                  </p>
                </div>
              }
              { permission === 'unknown' && push === 'unknown' &&
                <div className="maha-push-modal-message">
                  <h3>Don&apos;t miss a message or notification!</h3>
                  <p>
                    Maha can send push notifications to alert you when there
                    are actions that require your attention! We need your
                    permission to enable push notifications</p>
                  <p>
                    <button className="ui fluid green button" onClick={ this._handleRequestPermission }>Enable Notifications</button>
                  </p>
                  <p>
                    <span onClick={ this._handleClose }>Ask me next time</span><br />
                    <span onClick={ this._handleNeverAskAgain }>Never ask again on this device</span>
                  </p>
                </div>
              }
            </div>
          </div>
        </CSSTransition>
      </div>
    )
  }

  componentDidMount() {
    this.props.onRegisterWorker()
  }

  componentDidUpdate(prevProps) {
    const { push, status, token, user_id } = this.props
    if(status !== prevProps.status && status === 'worker_registered') {
      this._handleLoadPermission()
    }
    if(status !== prevProps.status && status === 'permission_loaded') {
      this._handleLoadPush()
    }
    if(push !== prevProps.push && !prevProps.push ) {
      this._handleLoaded()
    }
    if(status !== prevProps.status && status === 'push_loaded') {
      this._handleAsk()
    }
    if(user_id !== prevProps.user_id) {
      this._handleAsk()
    }
    if(status !== prevProps.status && status === 'permission_requested') {
      this._handleGetToken()
    }
    if(token !== prevProps.token && token) {
      this._handleSaveToken()
    }
  }

  getChildContext() {
    return {
      push: {
        requestPermission: this._handleRequestPermission,
        pushNotification: this._handlePushNotification
      }
    }
  }

  _handleAsk() {
    const { permission, push, user_id } = this.props
    if(permission !== 'unknown' || push !== 'unknown' || !user_id) return
    this.props.onAsk(true)
  }

  _handleClose() {
    this.props.onAsk(false)
  }

  _handleGetToken() {
    this.props.onGetToken()
  }

  _handleLoaded() {
    const { permission, push_enabled } = this.props
    if(!push_enabled && permission === 'granted') this._handleGetToken()
  }

  _handleLoadPermission() {
    this.props.onLoadPermission()
  }

  _handleLoadPush() {
    this.props.onLoadPush()
  }

  _handleNeverAskAgain() {
    this.props.onSavePush('never')
  }


  _handleRequestPermission() {
    this.props.onRequestPermission()
  }

  _handleSaveToken() {
    const { token } = this.props
    this.context.device.saveToken(token)
  }

}

const mapStateToProps = (state, props) => ({
  push_enabled: state.maha.device.push_enabled,
  user_id: _.get(state, 'maha.admin.user.id') || null
})

export default connect(mapStateToProps)(Push)
