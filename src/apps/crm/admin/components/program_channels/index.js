import PropTypes from 'prop-types'
import Channels from './channels'
import Types from './types'
import Voice from './voice'
import Email from './email'
import React from 'react'
import Sms from './sms'

class ProgramChannels extends React.PureComponent {

  static propTypes = {
    program: PropTypes.object
  }

  state = {
    channel: null,
    type: 'email'
  }

  _handleChannel = this._handleChannel.bind(this)
  _handleType = this._handleType.bind(this)

  render() {
    const { channel } = this.state
    const Component = this._getComponent()
    return (
      <div className="crm-program-channels">
        <div className="crm-program-channels-sidebar">
          <div className="crm-program-channels-sidebar-header">
            <Types { ...this._getTypes() } />
          </div>
          <div className="crm-program-channels-sidebar-body">
            <Channels { ...this._getChannels() } />
          </div>
        </div>
        { channel &&
          <Component { ...this._getChannel() } />
        }
      </div>
    )
  }

  _getChannel() {
    const { channel } = this.state
    const { program } = this.props
    return {
      key: `channels_${channel.id}`,
      channel,
      program
    }
  }

  _getChannels() {
    const { type } = this.state
    const { program } = this.props
    return {
      key: `channels_${type}`,
      program,
      type,
      onChoose: this._handleChannel
    }
  }

  _getComponent() {
    const { type } = this.state
    if(type === 'email') return Email
    if(type === 'sms') return Sms
    if(type === 'voice') return Voice
  }

  _getTypes() {
    const { type } = this.state
    return {
      type,
      onChoose: this._handleType
    }
  }

  _handleChannel(channel) {
    this.setState({ channel })
  }

  _handleType(type) {
    this.setState({ type })
  }

}

export default ProgramChannels
