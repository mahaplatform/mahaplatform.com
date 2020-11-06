import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Network extends React.Component {

  static childContextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any,
    onJoin: PropTypes.func,
    onLeave: PropTypes.func,
    onRequest: PropTypes.func,
    onSubscribe: PropTypes.func,
    onUnsubscribe: PropTypes.func
  }

  _handleJoin = this._handleJoin.bind(this)
  _handleLeave = this._handleLeave.bind(this)
  _handleRequest = this._handleRequest.bind(this)
  _handleSubscribe = this._handleSubscribe.bind(this)
  _handleUnsubscribe = this._handleUnsubscribe.bind(this)

  render() {
    return this.props.children
  }

  getChildContext() {
    return {
      network: {
        join: this._handleJoin,
        leave: this._handleLeave,
        request: this._handleRequest,
        subscribe: this._handleSubscribe,
        unsubscribe: this._handleUnsubscribe
      }
    }
  }

  _handleJoin(channels) {
    this.props.onJoin(_.castArray(channels))
  }

  _handleLeave(channels) {
    this.props.onLeave(_.castArray(channels))
  }

  _handleRequest(request) {
    const { onRequest } = this.props
    onRequest(request)
  }

  _handleSubscribe(handlers) {
    this.props.onSubscribe(_.castArray(handlers))
  }

  _handleUnsubscribe(handlers) {
    this.props.onUnsubscribe(_.castArray(handlers))
  }

}

export default Network
