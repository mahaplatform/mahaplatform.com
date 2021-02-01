import Transfering from './transfering'
import { ModalPanel } from '@admin'
import PropTypes from 'prop-types'
import Inactive from './inactive'
import Incoming from './incoming'
import Outgoing from './outgoing'
import Active from './active'
import React from 'react'

class Call extends React.Component {

  static propTypes = {
    calls: PropTypes.array,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  _handleDebug = this._handleDebug.bind(this)

  render() {
    const unfocused = this._getCalls(false)
    const focused = this._getCalls(true)
    return (
      <ModalPanel { ...this._getPanel() }>
        { unfocused.map((call, index) => (
          <Inactive key={`call_${index}`} call={ call } />
        )) }
        { focused.map((call, index) => (
          <div className="maha-phone-receiver" key={`call_${index}`}>
            { call.transfering !== null &&
              <Transfering { ...this._getCall(call) } />
            }
            { !call.transfering && call.status === 'in-progress' &&
              <Active { ...this._getCall(call) } />
            }
            { !call.transfering && call.direction === 'inbound' && call.status !== 'in-progress' &&
              <Incoming { ...this._getCall(call) } />
            }
            { !call.transfering && call.direction === 'outbound' && call.status !== 'in-progress' &&
              <Outgoing { ...this._getCall(call) } />
            }
          </div>
        )) }
        { process.env.NODE_ENV !== 'production' &&
          <div className="maha-phone-debug" onClick={ this._handleDebug }>
            Debug Calls
          </div>
        }
      </ModalPanel>
    )
  }

  _getActive() {
    return this.props.calls.find(call => {
      return call.active
    })
  }

  _getCalls(focused) {
    return this.props.calls.filter(call => {
      return call.focused === focused
    })
  }

  _getCall(call) {
    const { onPop, onPush } = this.props
    return {
      call,
      onPop,
      onPush
    }
  }

  _getPanel() {
    return {
      title: 'Call'
    }
  }

  _handleDebug() {
    this.props.calls.map(call => console.log(call))
  }

}

export default Call
