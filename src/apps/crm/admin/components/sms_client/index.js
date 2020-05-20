import ContactAvatar from '../../tokens/contact_avatar'
import { Image, Logo, Message } from 'maha-admin'
import PropTypes from 'prop-types'
import Composer from './composer'
import moment from 'moment'
import React from 'react'
import _ from 'lodash'

class SmsClient extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    contact: PropTypes.object,
    phone_number: PropTypes.number,
    program: PropTypes.number
  }

  body = null
  thread = null

  state = {
    message: null,
    messages: []
  }

  _handleFetch = this._handleFetch.bind(this)
  _handleSend = this._handleSend.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)
  _handleScrollToBottom = this._handleScrollToBottom.bind(this)

  render() {
    const sessions = this._getMessages()
    return (
      <div className="crm-sms-channel">
        { sessions.length === 0 &&
          <Message { ...this._getEmpty() } />
        }
        { sessions.length > 0 &&
          <div className="crm-sms-channel-body" ref={ node => this.body = node }>
            <div className="crm-sms-channel-thread" ref={ node => this.thread = node }>
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
          </div>
        }
        <div className="crm-sms-channel-footer">
          <Composer { ...this._getComposer() } />
        </div>
      </div>
    )
  }

  componentDidMount() {
    this._handleJoin()
    this._handleFetch()
  }

  componentDidUpdate(prevProps, prevState) {
    const { messages } = this.state
    if(messages.length > prevState.messages.length) {
      this._handleScrollToBottom()
    }
  }

  componentWillUnmount() {
    this._handleLeave()
  }

  _getComposer() {
    return {
      placeholder: 'Enter text message',
      onSubmit: this._handleSend
    }
  }

  _getEmpty() {
    return {
      icon: 'comments',
      title: 'No messages',
      text: 'The contact has not sent or received any messages via this channel'
    }
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
          const last = session.blocks[session.blocks.length - 1]
          const blockIndex = last && _.isEqual(last.contact, message.contact) && _.isEqual(last.program, message.program) ? session.blocks.length - 1 : -1
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

  _handleFetch() {
    const { contact, phone_number, program } = this.props
    this.context.network.request({
      endpoint: `/api/admin/crm/contacts/${contact.id}/channels/programs/${program.id}/sms/${phone_number.id}/smses`,
      method: 'get',
      onSuccess: this._handleSuccess
    })
  }

  _handleJoin() {
    const { contact, phone_number, program } = this.props
    const { network } = this.context
    const channel = `/api/admin/crm/contacts/${contact.id}/channels/programs/${program.id}/sms/${phone_number.id}/smses`
    network.join(channel)
    network.subscribe([
      { target: channel, action: 'refresh', handler: this._handleFetch }
    ])
  }

  _handleLeave() {
    const { contact, phone_number, program } = this.props
    const { network } = this.context
    const channel = `/api/admin/crm/contacts/${contact.id}/channels/programs/${program.id}/sms/${phone_number.id}/smses`
    network.leave(channel)
    network.unsubscribe([
      { target: channel, action: 'refresh', handler: this._handleFetch }
    ])
  }

  _handleScrollToBottom() {
    this.body.scrollTop = this.thread.offsetHeight - this.body.offsetHeight + 10
  }

  _handleSend(data) {
    const { contact, phone_number, program } = this.props
    const { attachments, text } = data
    this.context.network.request({
      endpoint: `/api/admin/crm/contacts/${contact.id}/channels/programs/${program.id}/sms/${phone_number.id}/smses`,
      method: 'post',
      body: {
        body: text,
        asset_ids: attachments.map(asset => asset.id)
      }
    })
  }

  _handleSuccess({ data }) {
    this.setState({
      messages: data
    })
  }

}

export default SmsClient
