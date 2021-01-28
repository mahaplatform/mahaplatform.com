import Transfering from './transfering'
import { ModalPanel } from '@admin'
import PropTypes from 'prop-types'
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

  render() {
    const call = this.props.calls[0]
    return (
      <ModalPanel { ...this._getPanel() }>
        { call &&
          <div className="maha-phone-receiver">
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
        }
      </ModalPanel>
    )
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
