import { ModalPanel } from '@admin'
import PropTypes from 'prop-types'
import Receiver from './receiver'
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
    return (
      <ModalPanel { ...this._getPanel() }>
        { call &&
          <Receiver { ...this._getReceiver(call) } />
        }
      </ModalPanel>
    )
  }

  _getReceiver(call) {
    const { program, onPop, onPush } = this.props
    return {
      call,
      program,
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
