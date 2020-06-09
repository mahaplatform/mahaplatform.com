import ContactAvatar from '../../../tokens/contact_avatar'
import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'
import _ from 'lodash'

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
        { records.map((voicemail, index) => (
          <div className="maha-phone-search-result" key={`result_${index}`} onClick={ this._handleClick.bind(this, voicemail)}>
            <div className="maha-phone-voicemail-result-token">
              <div className="maha-phone-voicemail-token">
                <div className="maha-phone-voicemail-token-avatar">
                  <ContactAvatar { ...voicemail.contact } />
                </div>
                <div className="maha-phone-voicemail-token-label">
                  { voicemail.contact.display_name }<br />
                  <span>{ this._getDuration(voicemail.duration) }</span>
                  <div className="maha-phone-voicemail-token-timestamp">
                    { this._getTimestamp(voicemail) }
                  </div>
                </div>
              </div>
            </div>
            <div className="maha-phone-voicemail-result-proceed">
              <i className="fa fa-chevron-right" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  _getDuration(duration) {
    const pad = (value) => _.padStart(value, 2, 0)
    const minutes = Math.floor(duration / 60)
    const seconds = (duration  - (minutes * 60)) % 60
    const parts = [ pad(minutes), pad(seconds) ]
    return parts.join(':')
  }

  _getTimestamp(voicemail) {
    const today = moment().startOf('day')
    const yesterday = moment().subtract(1, 'day').startOf('day')
    const created_at = moment(voicemail.created_at)
    if(today.format('YYMMDD') === created_at.format('YYMMDD')) return created_at.format('h:mmA')
    if(yesterday.format('YYMMDD') === created_at.format('YYMMDD')) return 'Yesterday'
    if(today.diff(created_at, 'days') < 7) return created_at.format('dddd')
    return created_at.format('MM/DD/YY')
  }

  _handleClick(voicemail) {
    this.props.onChoose(voicemail)
  }

}

export default Results
