import { ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import Inactive from './inactive'
import Incoming from './incoming'
import Active from './active'
import React from 'react'

class Call extends React.Component {

  static propTypes = {
    calls: PropTypes.array,
    programs: PropTypes.array,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  render() {
    const inactive = this._getCalls(false)
    const active = this._getCalls(true)
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-phone-receiver">
          { inactive.map((call, index) => (
            <Inactive key={`call_${index}`} call={ call } />
          )) }
          { active.map((call, index) => (
            <div className="maha-phone-receiver-active" key={`call_${index}`}>
              { call.status === 'active' ?
                <Active { ...this._getActive(call) } /> :
                <Incoming call={ call } />
              }
            </div>
          )) }
        </div>
      </ModalPanel>
    )
  }

  _getActive(call) {
    const { programs, onPop, onPush } = this.props
    return {
      call,
      programs,
      onPop,
      onPush
    }
  }

  _getCalls(active) {
    return this.props.calls.filter(call => {
      return call.active === active
    })
  }

  _getPanel() {
    return {
      title: 'Incoming Call'
    }
  }

}

export default Call
