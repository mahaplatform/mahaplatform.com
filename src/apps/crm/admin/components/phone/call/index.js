import PropTypes from 'prop-types'
import Ringing from './ringing'
import Active from './active'
import React from 'react'

class Call extends React.Component {

  static propTypes = {
    calls: PropTypes.array
  }

  render() {
    const { calls } = this.props
    const call = calls[0]
    if(call.status === 'ringing') {
      return <Ringing call={ call } />
    }
    if(call.status === 'active') {
      return <Active call={ call } />
    }
  }

}

export default Call
