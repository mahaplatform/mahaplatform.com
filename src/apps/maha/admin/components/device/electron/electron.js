import PropTypes from 'prop-types'
import Pasteur from 'pasteur'
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
    title: PropTypes.string,
    version: PropTypes.string,
    unseen: PropTypes.number,
    update: PropTypes.string,
    onLoadPush: PropTypes.func,
    onSaveToken: PropTypes.func,
    onSetProgress: PropTypes.func,
    onSetTitle: PropTypes.func,
    onSetUpdate: PropTypes.func,
    onSetUpdateReady: PropTypes.func,
    onSetVersion: PropTypes.func,
    onUpdateUnseen: PropTypes.func
  }

  _handleHasFocus = this._handleHasFocus.bind(this)
  _handleCheckForUpdates = this._handleCheckForUpdates.bind(this)
  _handleInstallUpdate = this._handleInstallUpdate.bind(this)
  _handleGetVersion = this._handleGetVersion.bind(this)
  _handleOpenWindow = this._handleOpenWindow.bind(this)
  _handlePushNotification = this._handlePushNotification.bind(this)
  _handlePushRoute  = this._handlePushRoute.bind(this)
  _handleSetProgress = this._handleSetProgress.bind(this)
  _handleSetUpdate = this._handleSetUpdate.bind(this)
  _handleSetUpdateReady = this._handleSetUpdateReady.bind(this)
  _handleSetVersion = this._handleSetVersion.bind(this)
  _handleSignin = this._handleSignin.bind(this)
  _handleUpdateTitle = this._handleUpdateTitle.bind(this)
  _handleUpdateUnseen  = this._handleUpdateUnseen.bind(this)

  render() {
    return this.props.children
  }

  componentDidMount() {
    this.pasteur = new Pasteur({
      debug: true,
      window,
      target: window.parent,
      name: 'app',
      targetName: 'host'
    })
    this.pasteur.on('pushRoute', this._handlePushRoute)
    this.pasteur.on('setProgress', this._handleSetProgress)
    this.pasteur.on('setVersion', this._handleSetVersion)
    this.pasteur.on('setUpdate', this._handleSetUpdate)
    this.pasteur.on('setUpdateReady', this._handleSetUpdateReady)
    this._handleGetVersion()
  }

  componentDidUpdate(prevProps) {
    const { title, unseen } = this.props
    if(title !== prevProps.title || unseen !== prevProps.unseen) {
      this._handleSetTitle()
    }
    if(unseen !== prevProps.unseen) {
      this._handleSetBadgeCount()
    }
  }

  componentWillUnmount() {
    this.pasteur.close()
  }

  getChildContext() {
    return {
      host: {
        mobile: false,
        checkForUpdates: this._handleCheckForUpdates,
        hasFocus: this._handleHasFocus,
        installUpdate: this._handleInstallUpdate,
        openWindow: this._handleOpenWindow,
        pushNotification: this._handlePushNotification,
        signin: this._handleSignin,
        setTitle: this._handleUpdateTitle,
        updateUnseen: this._handleUpdateUnseen
      }
    }
  }

  _handleCheckForUpdates() {
    this.pasteur.send('checkForUpdates')
  }

  _handleInstallUpdate() {
    if(this.props.status !== 'downloaded') return
    this.pasteur.send('installUpdate')
  }

  _handleGetVersion() {
    this.pasteur.send('getVersion')
  }

  _handleHasFocus() {
    return document.hasFocus()
  }

  _handlePushRoute(route) {
    this.context.router.history.push(route)
  }

  _handleOpenWindow(url) {
    this.pasteur.send('openWindow', url)
  }

  _handlePushNotification(notification) {
    this.pasteur.send('pushNotification', notification)
  }

  _handleSetBadgeCount() {
    const { unseen } = this.props
    this.pasteur.send('setBadgeCount', unseen)
  }

  _handleSetProgress(progress) {
    this.props.onSetProgress(progress)
  }

  _handleSetTitle() {
    const { unseen } = this.props
    const title = this.props.title || 'Maha'
    const titlecount = unseen > 0 ? ` (${unseen})` : ''
    this.pasteur.send('setTitle', title + titlecount)
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

  _handleSignin(url) {
    this.pasteur.send('openWindow', url)
  }

  _handleUpdateTitle(title) {
    this.props.onSetTitle(title)
  }

  _handleUpdateUnseen(count) {
    this.props.onUpdateUnseen(count)
  }

}

export default Electron
