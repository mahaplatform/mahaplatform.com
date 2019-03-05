import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Electron from './electron'
import Browser from './browser'
import Cordova from './cordova'
import React from 'react'
import _ from 'lodash'

class Device extends React.Component {

  static childContextTypes = {
    device: PropTypes.object
  }

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any,
    browser: PropTypes.string,
    device: PropTypes.string,
    fingerprint: PropTypes.string,
    id: PropTypes.number,
    os: PropTypes.string,
    platform: PropTypes.string,
    push_enabled: PropTypes.bool,
    status: PropTypes.string,
    user_id: PropTypes.number,
    onCreateDevice: PropTypes.func,
    onFetchDevice: PropTypes.func,
    onLoadFingerprint: PropTypes.func,
    onSaveFingerprint: PropTypes.func,
    onUpdateDevice: PropTypes.func
  }

  _handleJoin = this._handleJoin.bind(this)
  _handleLeave = this._handleLeave.bind(this)
  _handleReloadDevice = this._handleReloadDevice.bind(this)
  _handleSaveToken = this._handleSaveToken.bind(this)

  constructor(props) {
    super(props)
    this.host = this._getHost()
  }

  render() {
    const { status } = this.props
    if(status !== 'ready') return null
    return (
      <this.host>
        { this.props.children }
      </this.host>
    )
  }

  componentDidMount() {
    this.props.onLoadFingerprint()
  }

  componentDidUpdate(prevProps) {
    const { fingerprint, status, user_id } = this.props
    if(status !== prevProps.status) {
      if(status === 'generated') this.props.onCreateDevice(fingerprint)
      if(status === 'success') this.props.onSaveFingerprint(fingerprint)
    }
    if(user_id !== prevProps.user_id) {
      if(user_id !== null) this._handleJoin()
      if(user_id === null) this._handleLeave()
    }
  }

  getChildContext() {
    const { browser, device, fingerprint, os, platform, push_enabled } = this.props
    return {
      device: {
        browser,
        device,
        fingerprint,
        os,
        platform,
        push_enabled,
        saveToken: this._handleSaveToken
      }
    }
  }

  _getHost() {
    if(navigator.userAgent.match(/Cordova/) !== null) {
      return Cordova
    } else if(navigator.userAgent.match(/Electron/) !== null) {
      return Electron
    } else {
      return Browser
    }
  }

  _handleJoin() {
    const { network } = this.context
    const { id } = this.props
    network.join(`/admin/devices/${id}`)
    network.subscribe([
      { action: 'device', handler: this._handleReloadDevice }
    ])
  }

  _handleLeave() {
    const { network } = this.context
    const { id } = this.props
    network.leave(`/admin/devices/${id}`)
    network.unsubscribe([
      { action: 'device', handler: this._handleReloadDevice }
    ])
  }

  _handleReloadDevice() {
    const { fingerprint } = this.props
    this.props.onFetchDevice(fingerprint)
  }

  _handleSaveToken(push_token) {
    const { fingerprint, onUpdateDevice } = this.props
    onUpdateDevice(fingerprint, push_token)
  }

}

const mapStateToProps = (state, props) => ({
  user_id: _.get(state, 'maha.admin.user.id') || null
})

export default connect(mapStateToProps)(Device)
