import VoiceList from '../voice_list'
import PropTypes from 'prop-types'
import React from 'react'

class Voice extends React.PureComponent {

  static propTypes = {
    channel: PropTypes.channel,
    program: PropTypes.object
  }

  render() {
    return <VoiceList { ...this._getVoiceList() } />
  }

  _getVoiceList() {
    const { channel, program } = this.props
    const { contact, phone_number } = channel
    return {
      contact,
      phone_number,
      program
    }
  }

}

export default Voice
