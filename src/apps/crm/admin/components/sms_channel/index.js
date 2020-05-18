import ContactAvatar from '../../tokens/contact_avatar'
import { List, Logo } from 'maha-admin'
import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'
import _ from 'lodash'

class SmsChannel extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    channel: PropTypes.object,
    contact: PropTypes.object,
    program: PropTypes.object
  }

  state = {
    messages: []
  }

  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    const { channel } = this.props
    const dates = this._getMessages()
    return (
      <div className="crm-sms-channel">
        <div className="crm-sms-channel-sidebar">
          <List { ...this._getDeatails() } />
        </div>
        <div className="crm-sms-channel-body">
          { !channel.has_consented &&
            <div className="crm-sms-channel-alert">
              This contact has not given you consent to send marketing related
              messages on this channel
            </div>
          }
          <div className="crm-sms-channel-results">
            { dates.map((date,index) => (
              <div className="crm-sms-channel-result" key={`date_${index}`}>
                <div className="crm-sms-channel-date-label">
                  { date.date }
                </div>
                { date.messages.map((message, index) => (
                  <div className={`crm-sms-channel-token ${message.type}`} key={`result_${index}`}>
                    <div className="crm-sms-channel-token-avatar">
                      { message.program &&
                        <Logo team={ message.program } width="24" />
                      }
                      { message.contact &&
                        <ContactAvatar { ...message.contact } />
                      }
                    </div>
                    <div className="crm-sms-channel-token-details">
                      <div className="crm-sms-channel-token-message">
                        { message.text }
                      </div>
                    </div>
                    <div className="crm-sms-channel-token-padding" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this._handleFetch()
  }

  _getMessages() {
    const { contact, program } = this.props
    const messages = [
      { id: 1, program, contact: null, text: 'Message 1', created_at: moment().subtract(38, 'hours') },
      { id: 2, program, contact: null, text: 'Message 2', created_at: moment().subtract(38, 'hours') },
      { id: 3, program: null, contact, text: 'Message 3', created_at: moment().subtract(37, 'hours') },
      { id: 4, program, contact: null, text: 'Message 4', created_at: moment().subtract(24, 'hours') },
      { id: 5, program: null, contact, text: 'Message 5', created_at: moment().subtract(24, 'hours') },
      { id: 6, program: null, contact, text: 'Message 6', created_at: moment().subtract(24, 'hours') },
      { id: 7, program, contact: null, text: 'Message 7', created_at: moment().subtract(8, 'hours') },
      { id: 8, program: null, contact, text: 'Message 8', created_at: moment().subtract(8, 'hours') }
    ]
    return Object.values(messages.reduce((sorted, message) => {
      const day = moment(message.created_at).format('YYYYMMDD')
      const messages = _.get(sorted, `[${day}].messages`)
      const last_message = messages ? messages[messages.length - 1] : null
      return {
        ...sorted,
        [day]: {
          date: moment(message.created_at).format('MM/DD/YY'),
          messages: [
            ...messages || [],
            {
              type: message.program ? 'program' : 'contact',
              program: last_message && _.isEqual(last_message.program, message.program) ? null : message.program,
              contact: last_message && _.isEqual(last_message.contact, message.contact) ? null : message.contact,
              text: message.text
            }
          ]
        }
      }
    }, {}))

  }

  _getDeatails() {
    const { contact, program } = this.props
    return {
      items: [
        { label: 'Program', content: program.title },
        { label: 'Contact', content: contact.display_name },
        { label: 'Type', content: 'SMS' },
        { label: 'Consent', content: 'NO' },
        { label: 'Opted In', content: moment().format('MMM DD, YYYY') },
        { label: 'Opted Out', content: moment().format('MMM DD, YYYY') }
      ]
    }
  }

  _handleFetch() {
    const { channel, contact, program } = this.props
    this.context.network.request({
      endpoint: `/api/admin/crm/contacts/${contact.id}/channels/programs/${program.id}/sms/${channel.id}/smses`,
      method: 'get',
      onSuccess: this._handleSuccess
    })
  }

  _handleSuccess(data) {
    console.log(data)
  }

}

export default SmsChannel
