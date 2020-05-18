import PropTypes from 'prop-types'
import { List } from 'maha-admin'
import moment from 'moment'
import React from 'react'

class EmailChannel extends React.Component {

  static propTypes = {
    channel: PropTypes.object,
    contact: PropTypes.object,
    program: PropTypes.object
  }

  render() {
    return (
      <div className="crm-email-channel">
        <div className="crm-email-channel-sidebar">
          <List { ...this._getDeatails() } />
        </div>
        <div className="crm-email-channel-results">
          { Array(10).fill(0).map((i, index) => (
            <div className="crm-email-channel-result" key={`result_${index}`}>
              <div className="crm-email-channel-result-token">
                <div className="crm-email-channel-token">
                  <div className="crm-email-channel-token-icon">
                    <i className="fa fa-envelope-open" />
                  </div>
                  <div className="crm-email-channel-token-label">
                    <strong>Ken Schlather</strong><br />
                    A Statewide CRM for Cornell Cooperative Extension: Reminder
                    <div className="crm-email-channel-token-timestamp">
                      Feb 10
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
      </div>
    )
  }

  _getDeatails() {
    const { contact, program } = this.props
    return {
      items: [
        { label: 'Program', content: program.title },
        { label: 'Contact', content: contact.display_name },
        { label: 'Type', content: 'EMAIL' },
        { label: 'Consent', content: 'NO' },
        { label: 'Opted In', content: moment().format('MMM DD, YYYY') },
        { label: 'Opted Out', content: moment().format('MMM DD, YYYY') }
      ]
    }
  }

}

export default EmailChannel
