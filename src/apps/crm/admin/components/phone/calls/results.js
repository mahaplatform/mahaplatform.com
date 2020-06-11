import ContactAvatar from '../../../tokens/contact_avatar'
import { Avatar, Logo } from 'maha-admin'
import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

class Results extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    contact: PropTypes.object,
    records: PropTypes.array,
    onChoose: PropTypes.func
  }

  render() {
    const { records } = this.props
    return (
      <div className="maha-phone-search-results">
        { records.map((call, index) => (
          <div className="maha-phone-search-result" key={`result_${index}`} onClick={ this._handleClick.bind(this, call)}>
            <div className="maha-phone-calls-result-token">
              <div className={ this._getClass(call) }>
                <div className="maha-phone-call-token-avatar">
                  { call.to_user &&
                    <Avatar user={ call.to_user } width="24" />
                  }
                  { !call.to_user && !call.contact &&
                    <Logo team={ call.program } width="24" />
                  }
                  { call.contact &&
                    <ContactAvatar { ...call.contact } />
                  }
                </div>
                <div className="maha-phone-call-token-label">
                  { this._getTo(call) }<br />
                  <span>{ this._getDescription(call) }</span>
                  <div className="maha-phone-call-token-timestamp">
                    { this._getTimestamp(call) }
                  </div>
                </div>
              </div>
            </div>
            <div className="maha-phone-calls-result-proceed">
              <i className="fa fa-chevron-right" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  _getClass(call) {
    const classes = ['maha-phone-call-token']
    if(!call.was_answered) classes.push('missed')
    return classes.join(' ')
  }

  _getTo(call) {
    const { contact, to_user, to } = call
    if(contact) return contact.display_name
    if(to_user) return to_user.full_name
    if(to) return to.formatted
    return 'Unknown'
  }

  _getDescription(call) {
    const { voice_campaign } = call
    if(voice_campaign && voice_campaign.direction === 'outbound') return 'outbound voice campaign'
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
    this.props.onChoose(call)
  }

}

export default Results
