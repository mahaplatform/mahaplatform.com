import * as components from 'maha-public'
import { Modal, Network, Tasks } from 'maha-public'
import Invoice from './components/invoice'
import { hot } from 'react-hot-loader'
import Root from './components/root'
import PropTypes from 'prop-types'
import React from 'react'

import Payment from './components/payment'
import Card from './components/card'
import ACH from './components/ach'

class App extends React.Component {

  static propTypes = {
    config: PropTypes.object
  }

  render() {
    return (
      <Root { ...this._getRoot() }>
        <Network>
          <Modal>
            <Tasks>
              <Invoice />
            </Tasks>
          </Modal>
        </Network>
      </Root>
    )
  }

  _getRoot() {
    return {
      reducers: [
        ...Object.values(components).filter(component => {
          return component.reducer !== undefined
        }),
        ACH,
        Card,
        Invoice,
        Payment
      ]
    }
  }

}

export default hot(module)(App)
