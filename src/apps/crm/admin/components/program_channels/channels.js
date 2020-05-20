import ContactToken from '../../tokens/contact'
import { Container } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Channels extends React.PureComponent {

  static propTypes = {
    channels: PropTypes.array,
    onChoose: PropTypes.func
  }

  render() {
    const { channels } = this.props
    return (
      <div className="crm-program-channels-channels">
        { channels.map((channel, index) => (
          <div className="crm-program-channels-channel" key={`channel_${index}`} onClick={ this._handleChoose.bind(this, channel) }>
            <ContactToken { ...channel.contact } />
          </div>
        ))}
      </div>
    )
  }

  _handleChoose(channel) {
    this.props.onChoose(channel)
  }

}

const mapResources = (props, context) => ({
  channels: `/api/admin/crm/programs/${props.program.id}/channels/sms`
})

export default Container(mapResources)(Channels)
