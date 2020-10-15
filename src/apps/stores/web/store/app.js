import { BrowserRouter as Router } from 'react-router-dom'
import { Error, Logger, Network } from 'maha-client'
import { hot } from 'react-hot-loader'
import Store from './components/store'
import Root from './components/root'
import PropTypes from 'prop-types'
import React from 'react'

class App extends React.Component {

  static propTypes = {
    config: PropTypes.object
  }

  render() {
    return (
      <Root key="root">
        <Router>
          <Logger environment="registration">
            <Error>
              <Network>
                <Store Store={{ code: 'maha' }} />
              </Network>
            </Error>
          </Logger>
        </Router>
      </Root>
    )
  }

}

export default hot(module)(App)
