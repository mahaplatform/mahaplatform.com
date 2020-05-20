import VoiceClient from '../../voice_client'
import PropTypes from 'prop-types'
import React from 'react'

class Call extends React.Component {

  static propTypes = {
    contact: PropTypes.object,
    phone_number: PropTypes.object,
    program: PropTypes.object,
    onBack: PropTypes.func,
    onDone: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return <VoiceClient { ...this._getVoiceClient() } />
  }

  _getVoiceClient() {
    const { contact, phone_number, program } = this.props
    return {
      contact,
      phone_number,
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
