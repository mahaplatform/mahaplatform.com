import { Analytics, Error, Logger, Network, Router } from '@client'
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
        <Analytics app_id={ `store-${window.store.id}` }>
          <Router>
            <Logger environment="store">
              <Error>
                <Network>
                  <Store { ...this._getStore() } />
                </Network>
              </Error>
            </Logger>
          </Router>
        </Analytics>
      </Root>
    )
  }

  _getStore() {
    const { store, token } = window
    return { store, token }
  }

}

export default hot(module)(App)
