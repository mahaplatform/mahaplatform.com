import { Error, Logger, Network } from 'maha-client'
import { hot } from 'react-hot-loader'
import Checkout from './components/checkout'
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
        <Logger environment="checkout">
          <Error>
            <Network>
              <Checkout />
            </Network>
          </Error>
        </Logger>
      </Root>
    )
  }

}

export default hot(module)(App)
