import ContactToken from '../../tokens/contact'
import { Container } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Channels extends React.PureComponent {

  static propTypes = {
    channels: PropTypes.array,
    onChoose: PropTypes.func
  }

  state = {
    selected: null
  }

  render() {
    const { channels } = this.props
    return (
      <div className="crm-program-channels-channels">
        { channels.map((channel, index) => (
          <div className={ this._getClass(channel) } key={`channel_${index}`} onClick={ this._handleChoose.bind(this, channel) }>
            <ContactToken { ...channel.contact } />
          </div>
        ))}
      </div>
    )
  }

  _getClass(channel) {
    const { selected } = this.state
    const classes = ['crm-program-channels-channel']
    if(channel.id === selected) classes.push('selected')
    return classes.join(' ')
  }

  _handleChoose(channel) {
    this.setState({
      selected: channel.id
    })
    this.props.onChoose(channel)
  }

}

const mapResources = (props, context) => ({
  channels: `/api/admin/crm/programs/${props.program.id}/channels/${props.type}`
})

export default Container(mapResources)(Channels)
