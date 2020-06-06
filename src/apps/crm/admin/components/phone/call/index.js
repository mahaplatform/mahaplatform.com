import { ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import Inactive from './inactive'
import Incoming from './incoming'
import Active from './active'
import React from 'react'

class Call extends React.Component {

  static propTypes = {
    calls: PropTypes.array
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
              { call.status === 'ringing' ?
                <Incoming call={ call } /> :
                <Active call={ call } />
              }
            </div>
          )) }
        </div>
      </ModalPanel>
    )
  }

  _getCalls(active) {
    return this.props.calls.filter(call => {
      return call.active === active
    })
  }

  _getPanel() {
    return {
      title: 'Incoming Call',
      color: 'violet'
    }
  }

}

export default Call
