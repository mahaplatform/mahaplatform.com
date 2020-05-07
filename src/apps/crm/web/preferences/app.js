import Preferences from './components/preferences'
import { Error, Logger } from 'maha-client'
import { hot } from 'react-hot-loader'
import Root from './components/root'
import PropTypes from 'prop-types'
import React from 'react'

class App extends React.Component {

  static propTypes = {}

  render() {
    return (
      <Root key="root">
        <Logger environment="preferences">
          <Error>
            <Preferences { ...this._getForm() } />
          </Error>
        </Logger>
      </Root>
    )
  }

  _getForm() {
    const { form, token } = window
    return { ...form, token }
  }

}

export default hot(module)(App)
