import PropTypes from 'prop-types'
import React from 'react'

class Electron extends React.Component {

  static childContextTypes = {
    host: PropTypes.object
  }

  static contextTypes = {
    device: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any,
    status: PropTypes.string,
    version: PropTypes.string,
    update: PropTypes.string,
    onLoadPush: PropTypes.func,
    onSaveToken: PropTypes.func,
    onSetProgress: PropTypes.func,
    onSetVersion: PropTypes.func,
    onSetUpdate: PropTypes.func,
    onSetUpdateReady: PropTypes.func
  }

  _handleHasFocus = this._handleHasFocus.bind(this)
  _handleCheckForUpdates = this._handleCheckForUpdates.bind(this)
  _handleInstallUpdate = this._handleInstallUpdate.bind(this)
  _handleGetVersion = this._handleGetVersion.bind(this)
  _handleOpenWindow = this._handleOpenWindow.bind(this)
  _handlePushRoute  = this._handlePushRoute.bind(this)
  _handleReceiveMessage = this._handleReceiveMessage.bind(this)
  _handleSendMessage = this._handleSendMessage.bind(this)
  _handleSetProgress = this._handleSetProgress.bind(this)
  _handleSetUpdate = this._handleSetUpdate.bind(this)
  _handleSetUpdateReady = this._handleSetUpdateReady.bind(this)
  _handleSetVersion = this._handleSetVersion.bind(this)
  _handleUpdateUnseen  = this._handleUpdateUnseen.bind(this)

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
        mobile: false,
        checkForUpdates: this._handleCheckForUpdates,
        hasFocus: this._handleHasFocus,
        installUpdate: this._handleInstallUpdate,
        openWindow: this._handleOpenWindow,
        setTitle: () => {},
        updateUnseen: this._handleUpdateUnseen
      }
    }
  }

  _handleCheckForUpdates() {
    this._handleSendMessage('checkForUpdates')
  }

  _handleInstallUpdate() {
    if(this.props.status !== 'downloaded') return
    this._handleSendMessage('installUpdate')
  }

  _handleGetVersion() {
    this._handleSendMessage('getVersion')
  }

  _handleHasFocus() {
    return document.hasFocus()
  }

  _handlePushRoute(route) {
    this.context.router.history.push(route)
  }

  _handleReceiveMessage(e) {
    const message = e.data
    if(message.target !== 'renderer') return
    if(message.action === 'pushRoute') {
      this._handlePushRoute(message.data.route)
    }
    if(message.action === 'setProgress') {
      this._handleSetProgress(message.data.progress)
    }
    if(message.action === 'setVersion') {
      this._handleSetVersion(message.data.version)
    }
    if(message.action === 'setUpdate') {
      this._handleSetUpdate(message.data.version)
    }
    if(message.action === 'setUpdateReady') {
      this._handleSetUpdateReady()
    }
  }

  _handleSendMessage(action, data = null) {
    window.parent.postMessage({
      action,
      target: 'main',
      data
    }, '*')
  }

  _handleOpenWindow(url) {
    this._handleSendMessage('openWindow', url)
  }

  _handleSetProgress(progress) {
    this.props.onSetProgress(progress)
  }

  _handleSetVersion(version) {
    this.props.onSetVersion(version)
  }

  _handleSetUpdate(update) {
    this.props.onSetUpdate(update)
  }

  _handleSetUpdateReady() {
    this.props.onSetUpdateReady()
  }

  _handleUpdateUnseen(count) {
    this._handleSendMessage('updateBadge', { count })
  }

}

export default Electron
