import { Analytics, Error, Logger, Network } from '@client'
import Registration from './components/registration'
import { hot } from 'react-hot-loader'
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
        <Analytics app_id={ `event-${window.event.id}` }>
          <Logger environment="registration">
            <Error>
              <Network>
                <Registration { ...this._getRegistration() } />
              </Network>
            </Error>
          </Logger>
        </Analytics>
      </Root>
    )
  }

  _getRegistration() {
    const { event, token } = window
    return { event, token }
  }

}

export default hot(module)(App)
