import PropTypes from 'prop-types'
import Rollbar from 'rollbar'
import React from 'react'

class Logger extends React.Component {

  static childContextTypes = {
    logger: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any,
    environment: PropTypes.string
  }

  state = {
    ready: false
  }

  rollbar = null

  _handleError = this._handleError.bind(this)

  render() {
    if(!this.state.ready) return null
    return this.props.children
  }

  componentDidMount() {
    window.Rollbar = this.rollbar = this._getRollbar()
    this.setState({
      ready: true
    })
  }

  getChildContext() {
    return {
      logger: {
        login: this._handleLogin,
        error: this._handleError
      }
    }
  }

  _getRollbar() {
    const { environment } = this.props
    if(process.env.NODE_ENV !== 'production') {
      return {
        configure: () => {},
        error: console.error
      }
    }
    return Rollbar.init({
      accessToken: process.env.ROLLBAR_CLIENT_TOKEN,
      captureUncaught: true,
      payload: {
        environment,
        client: {
          javascript: {
            source_map_enabled: true
          }
        }
      }
    })
  }

  _handleError(error, info) {
    this.rollbar.error(error, info)
  }

}

export default Logger
