import PropTypes from 'prop-types'
import { List } from 'maha-admin'
import moment from 'moment'
import React from 'react'

class EmailChannel extends React.Component {

  static contextTypes = {
    network: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    channel: PropTypes.object,
    contact: PropTypes.object,
    program: PropTypes.object
  }

  state = {
    emails: []
  }

  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    const { emails } = this.state
    return (
      <div className="crm-email-channel">
        <div className="crm-email-channel-sidebar">
          <List { ...this._getDeatails() } />
        </div>
        <div className="crm-email-channel-results">
          { emails.map((email, index) => (
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
      </div>
    )
  }

  componentDidMount() {
    this._handleFetch()
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

  _handleClick(email) {
    const { contact } = this.props
    this.context.router.history.push(`/admin/crm/contacts/${contact.id}/emails/${email.id}`)
  }

  _handleFetch() {
    const { channel, contact, program } = this.props
    this.context.network.request({
      endpoint: `/api/admin/crm/contacts/${contact.id}/channels/programs/${program.id}/email/${channel.id}/emails`,
      method: 'get',
      onSuccess: this._handleSuccess
    })
  }

  _handleSuccess({ data }) {
    this.setState({
      emails: data
    })
  }

}

export default EmailChannel
