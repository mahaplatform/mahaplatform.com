import { ModalPanel } from '@admin'
import PropTypes from 'prop-types'
import Incoming from './incoming'
import Outgoing from './outgoing'
import Active from './active'
import React from 'react'

class Call extends React.Component {

  static propTypes = {
    calls: PropTypes.array,
    program: PropTypes.object,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  render() {
    const call = this.props.calls[0]
    console.log(call.connection)
    console.log(call.connection._isAnswered)
    return (
      <ModalPanel { ...this._getPanel() }>
        { call &&
          <div className="maha-phone-receiver">
            { call.status === 'in-progress' &&
              <Active { ...this._getCall(call) } />
            }
            { (call.direction === 'inbound' && call.status === 'ringing') &&
              <Incoming { ...this._getCall(call) } />
            }
            { (call.direction === 'outbound' && call.status === 'ringing') &&
              <Outgoing { ...this._getCall(call) } />
            }
          </div>
        }
      </ModalPanel>
    )
  }

  _getCall(call) {
    const { program } = this.props
    return {
      call,
      program
    }
  }

  _getPanel() {
    return {
      title: 'Call'
    }
  }

}

export default Call
