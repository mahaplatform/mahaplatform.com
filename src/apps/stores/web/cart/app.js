import { Error, Logger, Network } from 'maha-client'
import { hot } from 'react-hot-loader'
import Cart from './components/cart'
import Root from './components/root'
import PropTypes from 'prop-types'
import React from 'react'

class App extends React.Component {

  static propTypes = {
    config: PropTypes.object
  }

  render() {
    return (
      <Root key="root" storeName="maha">
        <Logger environment="cart">
          <Error>
            <Network>
              <Cart />
            </Network>
          </Error>
        </Logger>
      </Root>
    )
  }

}

export default hot(module)(App)
