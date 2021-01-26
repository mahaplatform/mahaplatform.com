import PropTypes from 'prop-types'
import Incoming from './incoming'
import Outgoing from './outgoing'
import Active from './active'
import React from 'react'

class Receiver extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    call: PropTypes.object,
    program: PropTypes.object,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  state = {
    status: 'ringing',
    sid: null
  }

  _handleStatus = this._handleStatus.bind(this)

  render() {
    const { status } = this.state
    const { call } = this.props
    return (
      <div className="maha-phone-receiver">
        { status === 'in-progress' &&
          <Active { ...this._getCall(call) } />
        }
        { (call.direction === 'inbound' && status === 'ringing') &&
          <Incoming { ...this._getCall(call) } />
        }
        { (call.direction === 'outbound' && status === 'ringing') &&
          <Outgoing { ...this._getCall(call) } />
        }
      </div>
    )
  }

  componentDidMount() {
    const sid = this.props.call.connection.parameters.CallSid
    this.setState({ sid }, this._handleJoin)
  }

  componentWillUnmount() {
    this._handleLeave()
  }

  _handleJoin() {
    const { network } = this.context
    const { sid } = this.state
    const target = `/calls/${sid}`
    network.join(target)
    network.subscribe([
      { target, action: 'callstatus', handler: this._handleStatus }
    ])
  }

  _handleLeave() {
    const { network } = this.context
    const { sid } = this.state
    const target = `/calls/${sid}`
    network.leave(target)
    network.subscribe([
      { target, action: 'callstatus', handler: this._handleStatus }
    ])
  }

  _getCall() {
    const { call, program } = this.props
    return {
      call,
      program
    }
  }

  _handleStatus(data) {
    this.setState({
      status: data.status
    })
  }

}

export default Receiver
