import { Link, AttachmentManager, Composer, DropZone, Loader } from 'maha-admin'
import { CSSTransition } from 'react-transition-group'
import QuotedMessage from '../quoted_message'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Message from '../message'
import getUrls from 'get-urls'
import moment from 'moment'
import Date from './date'
import React from 'react'
import _ from 'lodash'

class Channel extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    attachments: PropTypes.array,
    channel: PropTypes.object,
    link: PropTypes.object,
    link_status: PropTypes.string,
    messages: PropTypes.object,
    quoted_message: PropTypes.object,
    quoted_message_id: PropTypes.number,
    signpost: PropTypes.bool,
    status: PropTypes.string,
    text: PropTypes.string,
    total: PropTypes.number,
    user: PropTypes.object,
    onAddAttachments: PropTypes.func,
    onAddMessage: PropTypes.func,
    onAddQuotedMessage: PropTypes.func,
    onCreate: PropTypes.func,
    onFetchAll: PropTypes.func,
    onFetchLink: PropTypes.func,
    onFetch: PropTypes.func,
    onRemoveAttachment: PropTypes.func,
    onRemoveLink: PropTypes.func,
    onRemoveMessage: PropTypes.func,
    onRemoveQuotedMessage: PropTypes.func,
    onSetTyping: PropTypes.func,
    onShowMessage: PropTypes.func,
    onShowSignpost: PropTypes.func,
    onType: PropTypes.func,
    onUpdateAttachment: PropTypes.func
  }

  body = null
  channel = null

  _handleAddAssets = this._handleAddAssets.bind(this)
  _handleAddAttachments = this._handleAddAttachments.bind(this)
  _handleAddMessage = this._handleAddMessage.bind(this)
  _handleAddQuotedMessage = this._handleAddQuotedMessage.bind(this)
  _handleCreate = this._handleCreate.bind(this)
  _handleFetchLink = this._handleFetchLink.bind(this)
  _handleGrow = this._handleGrow.bind(this)
  _handleHello = this._handleHello.bind(this)
  _handleKeyUp = this._handleKeyUp.bind(this)
  _handlePaste = this._handlePaste.bind(this)
  _handleParse = this._handleParse.bind(this)
  _handleRemoveAttachment = this._handleRemoveAttachment.bind(this)
  _handleRemoveAttachments = this._handleRemoveAttachments.bind(this)
  _handleRemoveLink = this._handleRemoveLink.bind(this)
  _handleRemoveMessage = this._handleRemoveMessage.bind(this)
  _handleRemoveQuotedMessage = this._handleRemoveQuotedMessage.bind(this)
  _handleScroll = _.throttle(this._handleScroll.bind(this), 100)
  _handleShowMessage = this._handleShowMessage.bind(this)
  _handleScrollToBottom = this._handleScrollToBottom.bind(this)
  _handleType = _.debounce(this._handleType.bind(this), 250, { trailing: true })
  _handleTyping = _.debounce(this._handleTyping.bind(this), 250, { leading: true })
  _handleTypingMessage = this._handleTypingMessage.bind(this)
  _handleUpArrow = this._handleUpArrow.bind(this)
  _handleUpdateAsset = this._handleUpdateAsset.bind(this)
  _handleUpdateAttachment = this._handleUpdateAttachment.bind(this)

  render() {
    const { user } = this.props
    const { attachments, channel, link, link_status, messages, quoted_message, signpost, status } = this.props
    if(status === 'loading') return <Loader />
    return (
      <DropZone { ...this._getDropZone() }>
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
          { attachments.length > 0 &&
            <AttachmentManager { ...this._getAttachmentManager() } />
          }
          <div className="chat-channel-footer">
            { channel.typing && channel.typing.user_id !== user.id &&
              <div className="chat-channel-typing">
                { this._getTyping() }
              </div>
            }
            { quoted_message &&
              <div className="chat-channel-extra">
                <div className="chat-channel-extra-preview">
                  <QuotedMessage message={ quoted_message } />
                </div>
                <div className="chat-channel-extra-remove">
                  <i className="fa fa-fw fa-times" onClick={ this._handleRemoveQuotedMessage } />
                </div>
              </div>
            }
            { link_status &&
              <div className="chat-channel-typing">
                { link_status === 'loading' && <span>Fetching link preview</span> }
                { link_status === 'failed' && <span>Unable to fetch link preview</span> }
              </div>
            }
            { link &&
              <div className="chat-channel-extra">
                <div className="chat-channel-extra-preview">
                  <Link link={ link } />
                </div>
                <div className="chat-channel-extra-remove">
                  <i className="fa fa-fw fa-times" onClick={ this._handleRemoveLink } />
                </div>
              </div>
            }
            <Composer { ...this._getComposer() } />
          </div>
        </div>
      </DropZone>
    )
  }

  componentDidMount() {
    const { channel, onFetchAll } = this.props
    onFetchAll(channel.id, 0)
    this._handleAppear()
    this._handleJoin()
  }

  componentDidUpdate(prevProps) {
    const { channel, link, quoted_message_id, text, unsorted } = this.props
    if(unsorted.length > prevProps.unsorted.length && prevProps.status !== 'appending') {
      setTimeout(this._handleScrollToBottom, 250)
    }
    if(link !== prevProps.link) {
      setTimeout(this._handleScrollToBottom, 250)
    }
    if(text.length !== prevProps.text.length) {
      this._handleTyping()
    }
    if(quoted_message_id !== prevProps.quoted_message_id) {
      this._handleScrollToBottom()
    }
    if(channel.typing !== prevProps.channel.typing) {
      this._handleScrollToBottom()
    }
  }

  componentWillUnmount() {
    const { text } = this.props
    if(text.length > 0) this._handleTypingMessage('end_type_message')
    this._handleDisappear()
    this._handleLeave()
  }

  _getAttachmentManager() {
    const { attachments } = this.props
    return {
      attachments,
      onAddAssets: this._handleAddAssets,
      onCreate: this._handleCreate,
      onRemove: this._handleRemoveAttachment,
      onRemoveAll: this._handleRemoveAttachments,
      onUpdate: this._handleUpdateAttachment,
      onUpdateAsset: this._handleUpdateAsset
    }
  }

  _getDropZone() {
    return {
      onAdd: this._handleAddAssets,
      onUpdate: this._handleUpdateAsset
    }
  }

  _getTyping() {
    const { channel } = this.props
    const who = channel.subscriptions.length > 2 ? 'Someone' : channel.typing.full_name
    return `${who} is typing`
  }

  _getComposer() {
    return {
      onAddAssets: this._handleAddAssets,
      onChange: this._handleType,
      onKeyUp: this._handleKeyUp,
      onGrow: this._handleGrow,
      onPaste: this._handlePaste,
      onSubmit: this._handleCreate,
      onUpArrow: this._handleUpArrow,
      onUpdateAsset: this._handleUpdateAsset
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
    if(user.id === this.props.user.id ) return
    this.context.network.emit('chat', {
      action: 'hello',
      exclude: [this.props.user.id],
      data: {
        channel_id: this.props.channel.id,
        user: {
          id: this.props.user.id
        }
      }
    })
  }

  _handleFetchLink(url) {
    this.props.onFetchLink(url)
  }

  _handleGrow() {
    this._handleScrollToBottom()
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
          id: this.props.user.id
        }
      }
    })
  }

  _handleAddAssets(assets) {
    const { attachments, text } = this.props
    this._handleAddAttachments(assets.map((asset, index) => ({
      type: 'asset',
      caption: (attachments.length + index === 0) ? text : '',
      asset
    })))
  }

  _handleAddAttachments(attachments) {
    this.props.onAddAttachments(attachments)
  }

  _handleUpdateAsset(identifier, asset) {
    this._handleUpdateAttachment(identifier, { asset })
  }

  _handleUpdateAttachment(identifier, attachment) {
    this.props.onUpdateAttachment(identifier, attachment)
  }

  _handleDisappear() {
    this.context.network.emit('chat', {
      action: 'disappear',
      data: {
        channel_id: this.props.channel.id,
        user: {
          id: this.props.user.id
        }
      }
    })
  }

  _handleCreate(text) {
    const { attachments, channel, link, link_status, quoted_message, quoted_message_id, user, onCreate } = this.props
    if(text.length === 0 && link === null && link_status !== 'loading' && attachments.length === 0) return
    const message = {
      attachments: attachments.map(attachment => ({
        asset_id: attachment.asset.id,
        caption: attachment.caption
      })),
      link_id: link ? link.id : null,
      code: _.random(Math.pow(36,9).toString(36), Math.pow(36, 10) - 1).toString(36),
      quoted_message_id,
      text
    }
    this.props.onAddMessage({
      ...message,
      attachments,
      link,
      quoted_message,
      reactions: [],
      user,
      created_at: moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z',
      updated_at: moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z'
    })
    onCreate(channel.id, message)
  }

  _handleKeyUp(e) {
    if(e.keyCode !== 32) return
    this._handleParse(this.props.text)
  }

  _handlePaste(text) {
    this._handleParse(text)
  }

  _handleParse(text) {
    const { link } = this.props
    if(link) return
    const urls = Array.from(getUrls(text, {
      sortQueryParameters: false,
      removeTrailingSlash: true,
      stripWWW: false,
      stripFragment: false,
      normalizeProtocol: false
    }))
    if(urls.length === 0) return
    const url = urls[0]
    if(url.startsWith('https://mahaplatform.com') || url.startsWith('http://localhost')) return
    this._handleFetchLink(url)
  }

  _handleType(text) {
    this.props.onType(text)
  }

  _handleTyping() {
    const { text } = this.props
    const action = text.length > 0 ? 'begin_type_message' : 'end_type_message'
    this._handleTypingMessage(action)
  }

  _handleTypingMessage(action) {
    const { network } = this.context
    const { channel, user } = this.props
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

  _handleRemoveAttachment(index) {
    this.props.onRemoveAttachment(index)
  }

  _handleRemoveAttachments() {
    this.props.onRemoveAttachments()
  }

  _handleRemoveLink() {
    this.props.onRemoveLink()
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

const mapStateToProps = (state, props) => ({
  user: state.maha.admin.user
})

export default connect(mapStateToProps)(Channel)
