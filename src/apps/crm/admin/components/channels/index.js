import PropTypes from 'prop-types'
import { Container, List } from 'maha-admin'
import Voice from './voice'
import Email from './email'
import React from 'react'
import Sms from './sms'

class Channels extends React.Component {

  static contextTypes = {
    network: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    channels: PropTypes.array,
    contact: PropTypes.object,
    program: PropTypes.object
  }

  state = {
    selected: 0
  }

  render() {
    const { channels } = this.props
    const { selected } = this.state
    const channel = channels[selected]
    const Component = this._getComponent(channel)
    return (
      <div className="crm-channels">
        <div className="crm-channels-sidebar">
          <List { ...this._getDeatails() } />
          { channels.map((channel, index) => (
            <div className={ this._getClass(index) } key={`channel_${index}`} onClick={ this._handleClick.bind(this, index) }>
              <div className="crm-channels-channel-icon">
                <i className={`fa fa-${this._getIcon(channel)}`} />
              </div>
              <div className="crm-channels-channel-label">
                { channel.label }
              </div>
            </div>
          ))}
        </div>
        <div className="crm-channels-body">
          { !channel.has_consented &&
            <div className="crm-channel-alert">
              This contact has not given you consent to send marketing related
              messages on this channel
            </div>
          }
          <Component { ...this._getChannel(channel) } key={`channel_${channel.id}`} />
        </div>
      </div>
    )
  }

  _getComponent(channel) {
    if(channel.type === 'email') return Email
    if(channel.type === 'sms') return Sms
    if(channel.type === 'voice') return Voice
  }

  _getChannel(channel) {
    const { contact, program } = this.props
    return {
      channel,
      contact,
      program
    }
  }

  _getClass(index) {
    const { selected } = this.state
    const classes = ['crm-channels-channel']
    if(index === selected) classes.push('selected')
    return classes.join(' ')
  }

  _getDeatails() {
    const { contact, program } = this.props
    return {
      items: [
        { label: 'Program', content: program.title },
        { label: 'Contact', content: contact.display_name }
      ]
    }
  }

  _getIcon(channel) {
    if(channel.type === 'email') return 'envelope'
    if(channel.type === 'sms') return 'comment'
    if(channel.type === 'voice') return 'phone'
    if(channel.type === 'mail') return 'map-marker'
  }

  _handleClick(selected) {
    this.setState({ selected })
  }

}

const mapResources = (props, context) => ({
  channels: `/api/admin/crm/contacts/${props.contact.id}/channels/programs/${props.program.id}`
})

export default Container(mapResources)(Channels)
