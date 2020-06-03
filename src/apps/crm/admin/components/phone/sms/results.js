import ContactAvatar from '../../../tokens/contact_avatar'
import PropTypes from 'prop-types'
import React from 'react'

class Results extends React.PureComponent {

  static propTypes = {
    records: PropTypes.array,
    onChoose: PropTypes.func
  }

  state = {
    selected: null
  }

  render() {
    const { records } = this.props
    return (
      <div className="maha-phone-sms-results">
        { records.map((channel, index) => (
          <div className="maha-phone-sms-result" key={`channel_${index}`} onClick={ this._handleChoose.bind(this, channel) }>
            <div className="maha-phone-sms-result-avatar">
              <ContactAvatar { ...channel.contact } />
            </div>
            <div className="maha-phone-sms-result-label">
              <div className="maha-phone-sms-result-message">
                <strong>{ channel.contact.display_name }</strong><br />
                { channel.last_message }
              </div>
            </div>
            <div className="maha-phone-sms-result-unread">
              { channel.unread > 0 &&
                <div className="crm-program-channels-channel-unread-count">
                  { channel.unread }
                </div>
              }
            </div>
            <div className="maha-phone-sms-result-proceed">
              <i className="fa fa-chevron-right" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  _handleChoose(channel) {
    this.props.onChoose(channel)
  }

}

export default Results
