import CallChannel from '../../call'
import { ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Call extends React.Component {

  static propTypes = {
    channel: PropTypes.object,
    contact: PropTypes.object,
    program: PropTypes.object,
    onBack: PropTypes.func,
    onDone: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return <CallChannel { ...this._getCallChannel() } />
  }

  _getCallChannel() {
    const { channel, contact, program } = this.props
    return {
      channel,
      contact,
      program,
      title: 'Call Contact',
      cancelIcon: 'chevron-left',
      doneText: 'Done',
      onCancel: this._handleBack,
      onDone: this._handleDone
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleDone() {
    this.props.onDone()
  }

}

export default Call
