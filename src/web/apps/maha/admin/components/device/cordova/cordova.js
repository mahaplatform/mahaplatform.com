import PropTypes from 'prop-types'
import React from 'react'

class Cordova extends React.Component {

  static childContextTypes = {
    host: PropTypes.object
  }

  static contextTypes = {
    device: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any,
    permission: PropTypes.string,
    user: PropTypes.object,
    onSetVersion: PropTypes.func
  }

  state = {
    hasFocus: true
  }

  _handleBlurFocus = this._handleBlurFocus.bind(this)
  _handleGetVersion = this._handleGetVersion.bind(this)
  _handleHasFocus = this._handleHasFocus.bind(this)
  _handleOpenWindow = this._handleOpenWindow.bind(this)
  _handlePushRoute = this._handlePushRoute.bind(this)
  _handleReceiveMessage = this._handleReceiveMessage.bind(this)
  _handleSetVersion = this._handleSetVersion.bind(this)
  _handleUpdateUnseen = this._handleUpdateUnseen.bind(this)

  render() {
    return this.props.children
  }

  componentDidMount() {
    window.addEventListener('message', this._handleReceiveMessage, false)
    this._handleGetVersion()
  }

  componentWillUnmount() {
    window.removeEventListener('message', this._handleReceiveMessage, false)
  }

  getChildContext() {
    return {
      host: {
        mobile: true,
        checkForUpdates: () => {},
        hasFocus: this._handleHasFocus,
        installUpdate: () => {},
        openWindow: this._handleOpenWindow,
        setTitle: () => {},
        updateUnseen: this._handleUpdateUnseen
      }
    }
  }

  _handleBlurFocus(hasFocus) {
    this.setState({ hasFocus })
  }

  _handleGetVersion() {
    this._handleSendMessage('getVersion')
  }

  _handleHasFocus() {
    return this.state.hasFocus
  }

  _handleOpenWindow(url) {
  }

  _handlePushRoute(route) {
    this.context.router.history.push(route)
  }

  _handleReceiveMessage(e) {
    if(e.origin !== 'file://') return
    const message = e.data
    if(message.action === 'setVersion') {
      this._handleSetVersion(message.data.version)
    }
    if(message.action === 'pushRoute') {
      this._handlePushRoute(message.data.route)
    }
    if(message.action === 'pause') {
      this._handleBlurFocus(false)
    }
    if(message.action === 'resume') {
      this._handleBlurFocus(true)
    }
  }

  _handleSetVersion(version) {
    this.props.onSetVersion(version)
  }

  _handleSendMessage(action, data = null) {
    window.parent.postMessage({
      action,
      data
    }, '*')
  }

  _handleUpdateUnseen(count) {
    this._handleSendMessage('updateBadge', { count })
  }

}

export default Cordova
