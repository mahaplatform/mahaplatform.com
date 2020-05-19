import ContactAvatar from '../../../tokens/contact_avatar'
import PropTypes from 'prop-types'
import { Image, Logo } from 'maha-admin'
import moment from 'moment'
import React from 'react'
import _ from 'lodash'

class Sms extends React.Component {

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
    const sessions = this._getMessages()
    return (
      <div className="crm-sms-channel-results">
        { sessions.map((session,index) => (
          <div className="crm-sms-channel-result" key={`date_${index}`}>
            <div className="crm-sms-channel-date-label">
              { session.timestamp.format('MM/DD/YY, h:mmA') }
            </div>
            { session.blocks.map((block, bindex) => (
              <div className={`crm-sms-channel-token ${block.type}`} key={`result_${bindex}`}>
                <div className="crm-sms-channel-token-avatar">
                  { block.program &&
                    <Logo team={ block.program } width="24" />
                  }
                  { block.contact &&
                    <ContactAvatar { ...block.contact } />
                  }
                </div>
                <div className="crm-sms-channel-token-details">
                  <div className="crm-sms-channel-token-messages">
                    { block.messages.map((message, mindex) => (
                      <div className="crm-sms-channel-token-message" key={`message_${mindex}`}>
                        <div className="crm-sms-channel-token-message-body">
                          { message.text }
                          { message.attachments.map((attachment, aindex) => (
                            <div className="crm-sms-channel-token-message-attachment" key={`attachment_${aindex}`}>
                              <Image src={attachment.asset.path} transforms={{ w: 200 }} />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="crm-sms-channel-token-padding" />
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }

  componentDidMount() {
    this._handleFetch()
  }

  _getMessages() {
    const { messages } = this.state
    return messages.slice().reverse().reduce((sessions, message) => {
      const created_at = moment(message.created_at)
      const sessionIndex = sessions.findIndex(session => {
        return created_at.diff(session.timestamp, 'minutes') < 90
      })
      return [
        ...sessions.map((session, index) => {
          if(index !== sessionIndex) return session
          const blockIndex = session.blocks.findIndex(block => {
            return _.isEqual(block.contact, message.contact) && _.isEqual(block.program, message.program)
          })
          return {
            ...session,
            blocks: [
              ...session.blocks.map((block, bindex) => {
                if(bindex !== blockIndex) return block
                return {
                  ...block,
                  messages: [
                    ...block.messages,
                    { text: message.body, attachments: message.attachments }
                  ]
                }
              }),
              ...blockIndex < 0 ? [{
                type: message.program ? 'program' : 'contact',
                program: message.program,
                contact: message.contact,
                messages: [
                  { text: message.body, attachments: message.attachments }
                ]
              }] : []
            ]
          }
        }),
        ...sessionIndex < 0 ? [{
          timestamp: moment(message.created_at),
          blocks: [
            {
              type: message.program ? 'program' : 'contact',
              program: message.program,
              contact: message.contact,
              messages: [
                { text: message.body, attachments: message.attachments }
              ]
            }
          ]
        }] : []
      ]
    }, [])
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

  _handleSuccess({ data }) {
    this.setState({
      messages: data
    })
  }

}

export default Sms
