import { Button, Infinite } from 'maha-admin'
import PropTypes from 'prop-types'
import Results from './results'
import Call from '../../call'
import React from 'react'

class Voice extends React.Component {

  static propTypes = {
    channel: PropTypes.object,
    contact: PropTypes.object,
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
    const { channel, contact, program } = this.props
    return {
      label: 'Call Contact',
      color: 'red',
      modal: {
        component: <Call channel={ channel } program={ program } contact={ contact } />,
        options: {
          width: 375,
          height: 667
        }
      }
    }
  }

  _getInfinite() {
    const { channel, contact, program } = this.props
    return {
      endpoint: `/api/admin/crm/contacts/${contact.id}/channels/programs/${program.id}/voice/${channel.id}/calls`,
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

export default Voice
