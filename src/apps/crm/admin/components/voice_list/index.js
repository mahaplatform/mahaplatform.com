import { Button, Infinite } from 'maha-admin'
import VoiceClient from '../voice_client'
import PropTypes from 'prop-types'
import Results from './results'
import React from 'react'

class VoiceList extends React.Component {

  static propTypes = {
    contact: PropTypes.object,
    phone_number: PropTypes.object,
    program: PropTypes.object
  }

  render() {
    return (
      <div className="crm-voice-channel">
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
      endpoint: `/api/admin/crm/contacts/${contact.id}/channels/programs/${program.id}/voice/${phone_number.id}/calls`,
      refresh: `/admin/crm/contacts/${contact.id}/channels/programs/${program.id}/voice/${phone_number.id}/calls`,
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

export default VoiceList
