import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Network extends React.Component {

  static childContextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    channels: PropTypes.object,
    handlers: PropTypes.array,
    children: PropTypes.any,
    listeners: PropTypes.object,
    revision: PropTypes.string,
    status: PropTypes.string,
    text: PropTypes.string,
    online: PropTypes.bool,
    onAddEventListener: PropTypes.func,
    onClearAlert: PropTypes.func,
    onConnect: PropTypes.func,
    onDisconnect: PropTypes.func,
    onEmit: PropTypes.func,
    onInit: PropTypes.func,
    onJoin: PropTypes.func,
    onJoined: PropTypes.func,
    onLeave: PropTypes.func,
    onLeft: PropTypes.func,
    onRequest: PropTypes.func,
    onRemoveEventListener: PropTypes.func,
    onSetAlert: PropTypes.func,
    onSetRevision: PropTypes.func,
    onSubscribe: PropTypes.func,
    onUnsubscribe: PropTypes.func
  }

  _handleAddEventListener = this._handleAddEventListener.bind(this)
  _handleConnect = this._handleConnect.bind(this)
  _handleDisconnect = this._handleDisconnect.bind(this)
  _handleEmit = this._handleEmit.bind(this)
  _handleJoin = this._handleJoin.bind(this)
  _handleJoined = this._handleJoined.bind(this)
  _handleLeave = this._handleLeave.bind(this)
  _handleLeft = this._handleLeft.bind(this)
  _handleMessage = this._handleMessage.bind(this)
  _handleReceiveMessage = this._handleReceiveMessage.bind(this)
  _handleRemoveEventListener = this._handleRemoveEventListener.bind(this)
  _handleRequest = this._handleRequest.bind(this)
  _handleRevision = this._handleRevision.bind(this)
  _handleSendMessage = this._handleSendMessage.bind(this)
  _handleSubscribe = this._handleSubscribe.bind(this)
  _handleUnsubscribe = this._handleUnsubscribe.bind(this)

  render() {
    const { text } = this.props
    return (
      <div className={ this._getClass() }>
        <div className="maha-network-body">
          { this.props.children }
        </div>
        <CSSTransition in={ text !== null } timeout={ 500 } classNames="drop" mountOnEnter={ true } unmountOnExit={ true }>
          <div className="maha-network-status">
            { text }
          </div>
        </CSSTransition>
      </div>
    )
  }

  componentDidMount() {
    this.props.onInit(this._handleReceiveMessage)
    this._handleAddEventListener('connect', this._handleConnect)
    this._handleAddEventListener('disconnect', this._handleDisconnect)
    this._handleAddEventListener('message', this._handleMessage)
    this._handleAddEventListener('join', this._handleJoined)
    this._handleAddEventListener('leave', this._handleLeft)
    this._handleAddEventListener('revision', this._handleRevision)
  }

  componentDidUpdate(prevProps) {
    const { online } = this.props
    if(online !== prevProps.online) {
      if(prevProps.online === true) this._handleOfflineAlert()
      if(prevProps.online === false) this._handleOnlineAlert()
    }
  }

  componentWillUnmount() {
    this._handleRemoveEventListener('connect', this._handleConnect)
    this._handleRemoveEventListener('disconnect', this._handleDisconnect)
    this._handleRemoveEventListener('message', this._handleMessage)
    this._handleRemoveEventListener('join', this._handleJoined)
    this._handleRemoveEventListener('leave', this._handleLeft)
    this._handleRemoveEventListener('revision', this._handleRevision)
  }

  getChildContext() {
    return {
      network: {
        addEventListener: this._handleAddEventListener,
        emit: this._handleEmit,
        join: this._handleJoin,
        leave: this._handleLeave,
        message: this._handleSendMessage,
        removeEventListener: this._handleRemoveEventListener,
        request: this._handleRequest,
        subscribe: this._handleSubscribe,
        unsubscribe: this._handleUnsubscribe
      }
    }
  }

  _getClass() {
    const { status } = this.props
    const classes = ['maha-network']
    if(status) classes.push(status)
    return classes.join(' ')
  }

  _getHandlers(target, action) {
    const targetHandlers = _.filter(this.props.handlers, { target, action })
    if(target) return targetHandlers.length > 0 ? targetHandlers : []
    const actionHandlers = _.filter(this.props.handlers, { action })
    if(actionHandlers.length > 0) return actionHandlers
    return null
  }

  _handleAddEventListener(event, handler) {
    this.props.onAddEventListener(event, handler)
  }

  _handleConnect() {
    this.props.onConnect()
    if(this.props.online === null) return
    setTimeout(() => this._handleJoin(Object.keys(this.props.channels)), 500)
  }

  _handleOnlineAlert() {
    this.props.onSetAlert('success', 'You\'re back online!')
    setTimeout(this.props.onClearAlert, 2500)
  }

  _handleDisconnect() {
    this.props.onDisconnect()
  }

  _handleEmit(verb, data) {
    this.props.onEmit(verb, null, data)
  }

  _handleJoin(channels) {
    this.props.onJoin(_.castArray(channels))
  }

  _handleJoined(channels) {
    this.props.onJoined(channels)
  }

  _handleLeave(channels) {
    this.props.onLeave(_.castArray(channels))
  }

  _handleLeft(channels) {
    this.props.onLeft(channels)
  }

  _handleOfflineAlert() {
    this.props.onSetAlert('error', 'Unable to connect to the server')
  }

  _handleReceiveMessage(event, data) {
    const { listeners } = this.props
    if(!listeners[event]) return
    listeners[event].map(handler => handler(data))
  }

  _handleMessage(message) {
    const { target, action } = message
    const handlers = this._getHandlers(target, action)
    if(!handlers) return
    handlers.map(handler => handler.handler(message.data))
  }

  _handleRemoveEventListener(action, handler) {
    this.props.onRemoveEventListener(action, handler)
  }

  _handleRequest(request) {
    const { onRequest } = this.props
    onRequest(request)
  }

  _handleRevision(revision) {
    this.props.onSetRevision(revision)
  }

  _handleSendMessage({ channel, target, action, data }) {
    this.props.onEmit('message', channel, {
      target: target || channel,
      action,
      data
    })
  }

  _handleSubscribe(handlers) {
    this.props.onSubscribe(_.castArray(handlers))
  }

  _handleUnsubscribe(handlers) {
    this.props.onUnsubscribe(_.castArray(handlers))
  }

}

export default Network
