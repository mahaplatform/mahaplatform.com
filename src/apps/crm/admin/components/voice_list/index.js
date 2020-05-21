import { Button, Container, Infinite } from 'maha-admin'
import VoiceClient from '../voice_client'
import PropTypes from 'prop-types'
import Results from './results'
import React from 'react'

class VoiceList extends React.Component {

  static propTypes = {
    channel: PropTypes.object,
    contact: PropTypes.object,
    phone_number: PropTypes.object,
    program: PropTypes.object
  }

  render() {
    const { channel } = this.props
    return (
      <div className="crm-voice-channel">
        { !channel.has_consented &&
          <div className="crm-channel-alert">
            This contact has not given consent to send marketing related
            messages on this channel
          </div>
        }
        <div className="crm-voice-channel-body">
          <Infinite { ...this._getInfinite() } />
        </div>
        <div className="crm-voice-channel-footer">
          <Button { ...this._getButton() } />
        </div>
      </div>
    )
  }

  _getButton() {
    const { contact, phone_number, program } = this.props
    return {
      label: 'Call Contact',
      color: 'red',
      modal: {
        component: <VoiceClient phone_number={ phone_number } program={ program } contact={ contact } />,
        options: {
          width: 375,
          height: 667
        }
      }
    }
  }

  _getInfinite() {
    const { contact, phone_number, program } = this.props
    return {
      endpoint: `/api/admin/crm/programs/${program.id}/channels/voice/${phone_number.id}/calls`,
      refresh: `/admin/crm/programs/${program.id}/channels/voice/${phone_number.id}/calls`,
      empty: {
        icon: 'phone',
        title: 'No Calls',
        text: 'The contact has not made or received any calls via this channel',
        buttons: [
          { label: 'Call Conatct', handler: () => {} }
        ]
      },
      layout: Results,
      props: { contact }
    }
  }

}

const mapResources = (props, context) => ({
  channel: `/api/admin/crm/programs/${props.program.id}/channels/voice/${props.phone_number.id}`
})

export default Container(mapResources)(VoiceList)
