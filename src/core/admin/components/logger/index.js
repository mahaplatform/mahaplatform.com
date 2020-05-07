import React from 'react'
import PropTypes from 'prop-types'
import Rollbar from 'rollbar'

class Logger extends React.Component {

  static childContextTypes = {
    logger: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any
  }

  _handleError = this._handleError.bind(this)
  _handleLogin = this._handleLogin.bind(this)

  render() {
    return this.props.children
  }

  componentDidMount() {
    window.Rollbar = this.rollbar = this._getRollbar()
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
        environment: 'admin'
      }
    })
  }

  _handleLogin(user) {
    this.rollbar.configure({
      payload: {
        person: {
          id: user.id,
          username: user.full_name,
          email: user.email
        }
      }
    })
  }

  _handleError(error, info) {
    this.rollbar.error(error, info)
  }

}

export default Logger
