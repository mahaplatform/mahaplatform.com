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
    const { store } = window
    return (
      <Root key="root" storeName={ store.code }>
        <Logger environment="cart">
          <Error>
            <Network>
              <Cart Store={ store } />
            </Network>
          </Error>
        </Logger>
      </Root>
    )
  }

}

export default hot(module)(App)
