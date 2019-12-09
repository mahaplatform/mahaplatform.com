import Payment from './components/payment'
import Invoice from './components/invoice'
import Network from './components/network'
import Modal from './components/modal'
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
      <Root { ...this._getRoot() }>
        <Network>
          <Modal>
            <Invoice />
          </Modal>
        </Network>
      </Root>
    )
  }

  _getRoot() {
    return {
      reducers: [
        Invoice,
        Network,
        Payment
      ]
    }
  }

}

export default hot(module)(App)
