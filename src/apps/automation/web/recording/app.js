import { Error, Logger } from 'maha-client'
import { hot } from 'react-hot-loader'
import Player from './player'
import React from 'react'

class App extends React.Component {

  render() {
    return (
      <Logger environment="recording">
        <Error>
          <Player { ...this._getPlayer() } />
        </Error>
      </Logger>
    )
  }

  _getPlayer() {
    const { recording } = window
    return {
      recording
    }
  }

}

export default hot(module)(App)
