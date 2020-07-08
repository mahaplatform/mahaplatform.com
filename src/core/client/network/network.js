import PropTypes from 'prop-types'
import React from 'react'

class Network extends React.Component {

  static childContextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any,
    onRequest: PropTypes.func
  }

  _handleRequest = this._handleRequest.bind(this)

  render() {
    return this.props.children
  }

  getChildContext() {
    return {
      network: {
        request: this._handleRequest
      }
    }
  }

  _handleRequest(request) {
    const { onRequest } = this.props
    onRequest(request)
  }

}

export default Network
