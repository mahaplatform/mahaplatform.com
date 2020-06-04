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
      <div className="maha-phone-calls-results">
        { records.map((call, index) => (
          <div className="maha-phone-calls-result" key={`result_${index}`} onClick={ this._handleClick.bind(this, call)}>
            <div className="maha-phone-calls-result-token">
              <div className="maha-phone-calls-token">
                <div className="maha-phone-calls-token-avatar">
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
                <div className="maha-phone-calls-token-label">
                  { call.contact.full_name }<br />
                  <span>{ this._getDescription(call) }</span>
                  <div className="maha-phone-calls-token-timestamp">
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
    this.props.onChoose(call)
  }

}

export default Results
