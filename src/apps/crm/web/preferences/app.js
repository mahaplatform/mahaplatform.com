import Preferences from './components/preferences'
import { hot } from 'react-hot-loader'
import Root from './components/root'
import PropTypes from 'prop-types'
import React from 'react'

class App extends React.Component {

  static propTypes = {}

  render() {
    return (
      <Root key="root">
        <Preferences { ...this._getForm() } />
      </Root>
    )
  }

  _getForm() {
    const { form, token } = window
    return { ...form, token }
  }

}

export default hot(module)(App)
