import * as components from '@public'
import { Modal, Network, Tasks } from '@public'
import Invoice from './components/invoice'
import { hot } from 'react-hot-loader'
import Root from './components/root'
import PropTypes from 'prop-types'
import React from 'react'

import Payment from './components/payment'
import ACH from './components/payment/ach'
import ApplePay from './components/payment/applepay'
import GooglePay from './components/payment/googlepay'
import Card from './components/payment/card'

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
        ApplePay,
        GooglePay,
        ACH,
        Card,
        Invoice,
        Payment
      ]
    }
  }

}

export default hot(module)(App)
