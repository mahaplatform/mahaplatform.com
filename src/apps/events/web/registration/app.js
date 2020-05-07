import { hot } from 'react-hot-loader'
import Registration from './components/registration'
import { Error, Logger } from 'maha-client'
import Root from './components/root'
import PropTypes from 'prop-types'
import React from 'react'

Registration
class App extends React.Component {

  static propTypes = {
    config: PropTypes.object
  }

  render() {
    return (
      <Root key="root">
        <Logger environment="registration">
          <Error>
            <Registration { ...this._getRegistration() } />
          </Error>
        </Logger>
      </Root>
    )
  }

  _getRegistration() {
    const { event, token } = window
    return { event, token }
  }

}

export default hot(module)(App)
