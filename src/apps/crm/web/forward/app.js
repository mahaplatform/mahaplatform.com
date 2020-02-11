import Forward from './components/forward'
import { hot } from 'react-hot-loader'
import Root from './components/root'
import React from 'react'

class App extends React.Component {

  render() {
    return (
      <Root key="root">
        <Forward { ...this._getForward() } />
      </Root>
    )
  }

  _getForward() {
    const { form, token } = window
    return { ...form, token }
  }

}

export default hot(module)(App)
