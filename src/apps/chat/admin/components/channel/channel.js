import { CSSTransition } from 'react-transition-group'
import { Loader } from 'maha-admin'
import PropTypes from 'prop-types'
import Composer from './composer'
import Message from '../message'
import moment from 'moment'
import Date from './date'
import React from 'react'
import _ from 'lodash'

class Channel extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    channel: PropTypes.object,
    messages: PropTypes.object,
    quoted_message: PropTypes.object,
    quoted_message_id: PropTypes.number,
    signpost: PropTypes.bool,
    status: PropTypes.string,
    total: PropTypes.number,
    unsorted: PropTypes.array,
    onAddMessage: PropTypes.func,
    onAddQuotedMessage: PropTypes.func,
    onCreate: PropTypes.func,
    onEdit: PropTypes.func,
    onFetchAll: PropTypes.func,
    onFetch: PropTypes.func,
    onRemoveMessage: PropTypes.func,
    onRemoveQuotedMessage: PropTypes.func,
    onSetTyping: PropTypes.func,
    onShowMessage: PropTypes.func,
    onShowSignpost: PropTypes.func
  }

  body = null
  channel = null

  _handleAddMessage = this._handleAddMessage.bind(this)
  _handleAddQuotedMessage = this._handleAddQuotedMessage.bind(this)
  _handleCreate = this._handleCreate.bind(this)
  _handleHello = this._handleHello.bind(this)
  _handleRemoveMessage = this._handleRemoveMessage.bind(this)
  _handleRemoveQuotedMessage = this._handleRemoveQuotedMessage.bind(this)
  _handleScroll = _.throttle(this._handleScroll.bind(this), 100)
  _handleShowMessage = this._handleShowMessage.bind(this)
  _handleScrollToBottom = this._handleScrollToBottom.bind(this)
  _handleTyping = _.debounce(this._handleTyping.bind(this), 250, { leading: true })
  _handleTypingMessage = this._handleTypingMessage.bind(this)
  _handleUpArrow = this._handleUpArrow.bind(this)

  render() {
    const { user } = this.context.admin
    const { channel, messages, signpost, status } = this.props
    if(status === 'loading') return <Loader />
    return (
      <div className="chat-channel" ref={ node => this.channel = node }>
        <div className="chat-channel-messages">
          <div className="chat-channel-thread" onScroll={ this._handleScroll } ref={ node => this.body = node }>
            <div className="chat-channel-thread-panel" ref={ node => this.thread = node }>
              { status === 'appending' &&
                <div className="chat-channel-more">
                  Loading more...
                </div>
              }
              { Object.values(messages).map((day, index) => (
                <div className="chat-channel-day" key={`date_${index}`}>
                  <Date date={ day.date } />
                  <div className="chat-channel-day-messages">
                    { day.messages.map((message, index) => (
                      <Message { ...this._getMessage(message) } key={`message_${message.id}`} />
                    ))}
                  </div>
                </div>
              )) }
            </div>
          </div>
          <CSSTransition in={ signpost } classNames="popin" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
            <div className="chat-signpost-bottom" onClick={ this._handleScrollToBottom }>
              <i className="fa fa-chevron-down" />
            </div>
          </CSSTransition>
        </div>
        <div className="chat-channel-footer">
          { channel.typing && channel.typing.user_id !== user.id &&
            <div className="chat-channel-typing">
              { this._getTyping() }
            </div>
          }
          <Composer { ...this._getComposer() } />
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { channel, onFetchAll } = this.props
    onFetchAll(channel.id, 0)
    this._handleAppear()
    this._handleJoin()
  }

  componentDidUpdate(prevProps) {
    const { channel, quoted_message_id, unsorted } = this.props
    if(unsorted.length > prevProps.unsorted.length && prevProps.status !== 'appending') {
      setTimeout(this._handleScrollToBottom, 250)
    }
    if(quoted_message_id !== prevProps.quoted_message_id) {
      this._handleScrollToBottom()
    }
    if(channel.typing !== prevProps.channel.typing) {
      this._handleScrollToBottom()
    }
  }

  componentWillUnmount() {
    this._handleTypingMessage('end_type_message')
    this._handleDisappear()
    this._handleLeave()
  }

  _getTyping() {
    const { channel } = this.props
    const who = channel.subscriptions.length > 2 ? 'Someone' : channel.typing.full_name
    return `${who} is typing`
  }

  _getComposer() {
    const { quoted_message } = this.props
    return {
      placeholder: 'Type a message',
      quoted: quoted_message,
      onSubmit: this._handleCreate
    }
  }

  _getMessage(message) {
    const { channel } = this.props
    return {
      ...message,
      channel,
      receipts: channel.last_viewed[message.id],
      onShow: this._handleShowMessage.bind(this, message),
      onQuoteMessage: this._handleAddQuotedMessage.bind(this, message.id)
    }
  }

  _handleJoin() {
    const { network } = this.context
    const target = '/admin/chat/messages'
    network.subscribe([
      { target, action: 'appear', handler: this._handleHello },
      { target, action: 'add_message', handler: this._handleAddMessage },
      { target, action: 'remove_message', handler: this._handleRemoveMessage }
    ])
  }

  _handleLeave() {
    const { network } = this.context
    const target = '/admin/chat/messages'
    network.unsubscribe([
      { target, action: 'appear', handler: this._handleHello },
      { target, action: 'add_message', handler: this._handleAddMessage },
      { target, action: 'remove_message', handler: this._handleRemoveMessage }
    ])
  }

  _handleHello({ channel_id, user }) {
    if(channel_id !== this.props.channel.id) return
    if(user.id === this.context.admin.user.id ) return
    this.context.network.emit('chat', {
      action: 'hello',
      exclude: [this.context.admin.user.id],
      data: {
        channel_id: this.props.channel.id,
        user: {
          id: this.context.admin.user.id
        }
      }
    })
  }

  _handleAddMessage(message) {
    const { channel } = this.props
    if(message.channel_id !== channel.id) return
    this.props.onAddMessage(message)
    this.props.onFetch(channel.id, message.id)
  }

  _handleAppear() {
    this.context.network.emit('chat', {
      action: 'appear',
      data: {
        channel_id: this.props.channel.id,
        user: {
          id: this.context.admin.user.id
        }
      }
    })
  }

  _handleDisappear() {
    this.context.network.emit('chat', {
      action: 'disappear',
      data: {
        channel_id: this.props.channel.id,
        user: {
          id: this.context.admin.user.id
        }
      }
    })
  }

  _handleCreate({ attachments, link, quoted, text }) {
    const { onAddMessage, onCreate } = this.props
    const { user } = this.context.admin
    const { channel } = this.props
    const message = {
      code: _.random(100000000, 999999999).toString(36),
      text
    }
    onAddMessage({
      ...message,
      quoted_message: quoted,
      attachments,
      link,
      reactions: [],
      user,
      created_at: moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z',
      updated_at: moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z'
    })
    onCreate(channel.id, {
      ...message,
      asset_ids: attachments.map(asset => asset.id),
      link_id: link ? link.id : null,
      quoted_message_id: quoted ? quoted.id : null
    })
  }

  _handleTyping() {
    // const { text } = this.props
    // const action = text.length > 0 ? 'begin_type_message' : 'end_type_message'
    // this._handleTypingMessage(action)
  }

  _handleTypingMessage(action) {
    const { user } = this.context.admin
    const { network } = this.context
    const { channel } = this.props
    network.emit('chat', {
      action,
      data: {
        channel_id: channel.id,
        exclude: [user.id],
        user: {
          id: user.id,
          full_name: user.full_name
        }
      }
    })
  }

  _handleScroll() {
    const { channel, messages, signpost, total } = this.props
    const showSignpost = (this.body.scrollTop < this.thread.offsetHeight - this.body.offsetHeight - 100)
    const loadMore = (messages.length < total && this.body.scrollTop < 100)
    if(signpost !== showSignpost) this.props.onShowSignpost(showSignpost)
    if(loadMore) this.props.onFetchAll(channel.id, messages.length)
  }

  _handleShowMessage(message) {
    this.props.onShowMessage(message)
  }

  _handleAddQuotedMessage(id) {
    this.props.onAddQuotedMessage(id)
  }

  _handleRemoveQuotedMessage() {
    this.props.onRemoveQuotedMessage()
  }

  _handleRemoveMessage({ channel_id, code }) {
    const { channel } = this.props
    if(channel_id !== channel.id) return
    this.props.onRemoveMessage(code)
  }

  _handleScrollToBottom() {
    this.body.scrollTop = this.thread.offsetHeight - this.body.offsetHeight + 10
  }

  _handleUpArrow() {
    const { messages, onEdit } = this.props
    onEdit(messages[0].id)
  }

}

export default Channel
