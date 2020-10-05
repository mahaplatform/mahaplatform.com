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
      <div className="crm-email-channel-results">
        { records.map((email, index) => (
          <div className="crm-email-channel-result" key={`result_${index}`} onClick={ this._handleClick.bind(this, email)}>
            <div className="crm-email-channel-result-token">
              <div className="crm-email-channel-token">
                <div className="crm-email-channel-token-icon">
                  { email.was_opened ?
                    <i className="fa fa-envelope-open" /> :
                    <i className="fa fa-envelope" />
                  }
                </div>
                <div className="crm-email-channel-token-label">
                  <strong>{ email.from }</strong><br />
                  { email.subject }
                  <div className="crm-email-channel-token-timestamp">
                    { moment(email.sent_at).format('MMM DD') }
                  </div>
                </div>
              </div>
            </div>
            <div className="crm-email-channel-result-proceed">
              <i className="fa fa-chevron-right" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  _handleClick(email) {
    this.context.router.history.push(`/admin/emails/${email.code}`)
  }

}

export default Results
