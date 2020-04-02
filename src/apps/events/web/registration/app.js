import { hot } from 'react-hot-loader'
import Registration from './components/registration'
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
        <Registration { ...this._getRegistration() } />
      </Root>
    )
  }

  _getRegistration() {
    const { event, token } = window
    return { event, token }
  }

}

export default hot(module)(App)
