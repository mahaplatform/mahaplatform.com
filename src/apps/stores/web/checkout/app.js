import { Analytics, Error, Logger, Network } from '@client'
import { hot } from 'react-hot-loader'
import Wrapper from './components/wrapper'
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
        <Analytics app_id={ `store-${window.store.id}` }>
          <Logger environment="checkout">
            <Error>
              <Network>
                <Wrapper { ...this._getCheckout() } />
              </Network>
            </Error>
          </Logger>
        </Analytics>
      </Root>
    )
  }

  _getCheckout() {
    const { store, token } = window
    return {
      Store: store,
      token
    }
  }

}

export default hot(module)(App)
