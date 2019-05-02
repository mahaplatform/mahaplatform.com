import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Presence extends React.Component {

  static contextTypes = {
    host: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any,
    presence: PropTypes.array,
    session_id: PropTypes.number,
    user_id: PropTypes.number,
    onSetPresence: PropTypes.func
  }

  _handleBlurFocus = this._handleBlurFocus.bind(this)
  _handleConnect = this._handleConnect.bind(this)
  _handleMessage = this._handleMessage.bind(this)
  _handlePresence = this._handlePresence.bind(this)
  _handleSignin = this._handleSignin.bind(this)
  _handleSignout = this._handleSignout.bind(this)
  _handleStatus = this._handleStatus.bind(this)

  render() {
    return this.props.children
  }

  componentDidMount() {
    const { network } = this.context
    window.addEventListener('blur', this._handleBlurFocus, false)
    window.addEventListener('focus', this._handleBlurFocus, false)
    window.addEventListener('message', this._handleMessage, false)
    network.addEventListener('presence', this._handlePresence)
  }

  componentDidUpdate(prevProps) {
    const { user_id } = this.props
    if(user_id !== prevProps.user_id) {
      if(user_id !== null) this._handleSignin()
      if(user_id === null) this._handleSignout()
    }
  }

  componentWillUnmount() {
    const { network } = this.context
    window.removeEventListener('blur', this._handleBlurFocus)
    window.removeEventListener('focus', this._handleBlurFocus)
    window.removeEventListener('message', this._handleMessage, false)
    network.removeEventListener('presence', this._handlePresence)
    this._handleSignout()
  }

  _handleBlurFocus() {
    const { host } = this.context
    const status = host.hasFocus() ? 'active' : 'absent'
    this._handleStatus(status)
  }

  _handleConnect() {
    const { user_id } = this.props
    if(user_id !== null) this._handleSignin()
  }

  _handleMessage(e) {
    const message = e.data
    if(message.action === 'pause') {
      this._handleStatus('absent')
    }
    if(message.action === 'resume') {
      this._handleStatus('active')
    }
  }

  _handlePresence(presence) {
    const { session_id } = this.props
    if(!session_id) return this.props.onSetPresence(presence)
    const found = presence.find(presence => presence.session_id === session_id)
    if(!found) this._handleSignin()
    this.props.onSetPresence(presence)
  }

  _handleSignin() {
    const { host } = this.context
    const status = host.hasFocus() ? 'active' : 'absent'
    this.context.network.emit('signin', { status })
  }

  _handleSignout() {
    this.context.network.emit('signout')
  }

  _handleStatus(status) {
    this.context.network.emit('status', { status })
  }

}

const mapStateToProps = (state, props) => ({
  session_id: _.get(state, 'maha.admin.session.id') || null,
  user_id: _.get(state, 'maha.admin.user.id') || null
})

export default connect(mapStateToProps)(Presence)
