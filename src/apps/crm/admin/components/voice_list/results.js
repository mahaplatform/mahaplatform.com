import ContactAvatar from '../../tokens/contact_avatar'
import { Avatar, Logo } from '@admin'
import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

class Results extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    contact: PropTypes.object,
    records: PropTypes.array
  }

  render() {
    const { records } = this.props
    return (
      <div className="crm-voice-channel-results">
        { records.map((call, index) => (
          <div className="crm-voice-channel-result" key={`result_${index}`} onClick={ this._handleClick.bind(this, call)}>
            <div className="crm-voice-channel-result-token">
              <div className="crm-voice-channel-token">
                <div className="crm-voice-channel-token-avatar">
                  { call.direction === 'outbound' && call.user &&
                    <Avatar user={ call.user } width="24" />
                  }
                  { call.direction === 'outbound' && call.program && !call.user &&
                    <Logo team={ call.program } width="24" />
                  }
                  { call.direction === 'inbound' && call.contact &&
                    <ContactAvatar { ...call.contact } />
                  }
                </div>
                <div className="crm-voice-channel-token-label">
                  <strong>{ this._getNumber(call) }</strong><br />
                  { this._getDescription(call) }
                  <div className="crm-voice-channel-token-timestamp">
                    { this._getTimestamp(call) }
                  </div>
                </div>
              </div>
            </div>
            <div className="crm-voice-channel-result-proceed">
              <i className="fa fa-chevron-right" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  _getDescription(call) {
    if(call.voice_campaign) return `${call.voice_campaign.direction} voice campaign`
    return `${ call.direction } call`
  }

  _getTimestamp(call) {
    const today = moment().startOf('day')
    const yesterday = moment().subtract(1, 'day').startOf('day')
    const created_at = moment(call.created_at)
    if(today.format('YYMMDD') === created_at.format('YYMMDD')) return created_at.format('h:mmA')
    if(yesterday.format('YYMMDD') === created_at.format('YYMMDD')) return 'Yesterday'
    if(today.diff(created_at, 'days') < 7) return created_at.format('dddd')
    return created_at.format('MM/DD/YY')
  }

  _getNumber(call) {
    return call.direction === 'outbound' ? call.from.formatted : call.to.formatted
  }

  _handleClick(call) {
    const { contact } = this.props
    this.context.router.history.push(`/crm/contacts/${contact.id}/calls/${call.id}`)
  }

}

export default Results
