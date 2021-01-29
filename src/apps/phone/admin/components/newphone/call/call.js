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

  _getActive() {
    return this.props.calls.find(call => {
      return call.active
    })
  }

  render() {
    const inactive = this._getCalls(false)
    const active = this._getCalls(true)
    return (
      <ModalPanel { ...this._getPanel() }>
        { inactive.map((call, index) => (
          <Inactive key={`call_${index}`} call={ call } />
        )) }
        { active.map((call, index) => (
          <div className="maha-phone-receiver" key={`call_${index}`}>
            { call.transfering !== null &&
              <Transfering { ...this._getCall(call) } />
            }
            { !call.transfering && call.status === 'in-progress-contact' &&
              <Active { ...this._getCall(call) } />
            }
            { !call.transfering && (call.direction === 'inbound' && call.status !== 'in-progress-contact') &&
              <Incoming { ...this._getCall(call) } />
            }
            { !call.transfering && (call.direction === 'outbound' && call.status !== 'in-progress-contact') &&
              <Outgoing { ...this._getCall(call) } />
            }
          </div>
        )) }
      </ModalPanel>
    )
  }

  _getCalls(active) {
    return this.props.calls.filter(call => {
      return call.active === active
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

}

export default Call
