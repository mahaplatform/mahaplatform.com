import { Loader, Message } from 'maha-admin'
import Subscriptions from './subscriptions'
import Edit from '../../views/edit'
import PropTypes from 'prop-types'
import Channels from '../channels'
import Channel from '../channel'
import Info from '../info'
import React from 'react'
import New from '../new'

class Chat extends React.Component {

  static contextTypes = {
    confirm: PropTypes.object,
    modal: PropTypes.object,
    network: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    channels: PropTypes.array,
    channel: PropTypes.object,
    info: PropTypes.bool,
    selected: PropTypes.number,
    page: PropTypes.object,
    status: PropTypes.string,
    onChoose: PropTypes.func,
    onInfo: PropTypes.func,
    onLoadChat: PropTypes.func,
    onSaveChat: PropTypes.func
  }

  _handleChoose = this._handleChoose.bind(this)
  _handleEdit = this._handleEdit.bind(this)
  _handleInfo = this._handleInfo.bind(this)
  _handleNew = this._handleNew.bind(this)
  _handleShowMessage = this._handleShowMessage.bind(this)
  _handleSubscriptions = this._handleSubscriptions.bind(this)

  render() {
    const { channel, status } = this.props
    if(status === 'loading') return <Loader />
    return (
      <div className={ this._getClass() }>
        <div className="fullchat-left">
          <Channels { ...this._getChannels() } />
        </div>
        { channel &&
          <div className="fullchat-channel">
            <div className="fullchat-channel-header">
              <div className="fullchat-channel-header-detail">
                { channel.name || channel.label }
              </div>
              <div className="fullchat-channel-header-action" onClick={ this._handleInfo }>
                <i className="fa fa-info-circle" />
              </div>
            </div>
            <div className="fullchat-channel-body">
              <Channel { ...this._getChannel() } />
              <div className="fullchat-info">
                <Info { ...this._getInfo() } />
              </div>
            </div>
          </div>
        }
        { !channel &&
          <div className="fullchat-channel">
            <Message { ...this._getEmpty() } />
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    const { channels, page, onChoose, onLoadChat } = this.props
    onLoadChat()
    if(page.pathname.match(/^\/admin\/chat$/)) {
      if(channels.length === 0) return
      onChoose(channels[0].id)
    } else if(page.pathname.match(/^\/admin\/chat\/channels\/\d*/)) {
      onChoose(parseInt(page.params.id))
    }
  }

  componentDidUpdate(prevProps) {
    const { channels, info, onChoose, onSaveChat } = this.props
    if(info !== prevProps.info) {
      onSaveChat(info)
    }
    if(channels.length > prevProps.channels.length) {
      onChoose(channels[0].id)
    }
  }

  _getClass() {
    const { info } = this.props
    const classes = ['fullchat']
    if(info) classes.push('info')
    return classes.join(' ')
  }

  _getChannels() {
    const { channels, selected, status } = this.props
    return {
      channels,
      selected,
      showNew: true,
      status,
      onChoose: this._handleChoose,
      onNew: this._handleNew
    }
  }

  _getEmpty() {
    return {
      icon: 'comment',
      title: 'No Conversations',
      text: 'Choose a conversation from the list'
    }
  }

  _getHeader() {
    const { channel } = this.props
    return {
      ...channel,
      onInfo: this._handleInfo
    }
  }

  _getChannel() {
    const { channel, selected } = this.props
    return {
      key: `channel_${channel.id}`,
      channel,
      id: selected,
      onShowMessage: this._handleShowMessage
    }
  }

  _getInfo() {
    const { channel, selected } = this.props
    return {
      channel,
      id: selected,
      onEdit: this._handleEdit,
      onSubscriptions: this._handleSubscriptions
    }
  }

  _getNew() {
    return {
      endpoint: '/api/admin/chat/channels',
      method: 'POST',
      saveText: 'Start',
      title: 'New Conversation',
      onCancel: this._handleNew,
      onSuccess: this._handleChoose
    }
  }

  _getEdit() {
    const { channel } = this.props
    return {
      channel: channel
    }
  }

  _handleChoose(id) {
    this.context.router.history.replace(`/admin/chat/channels/${id}`)
    this.props.onChoose(id)
  }

  _handleEdit() {
    this.context.modal.push(<Edit { ...this._getEdit() } />)
  }

  _handleInfo() {
    this.props.onInfo()
  }

  _handleNew() {
    this.context.modal.push(<New { ...this._getNew() } />)
  }

  _handleShowMessage(message) {
    const { router } = this.context
    router.history.push(`/admin/chat/channels/${message.channel_id}/messages/${message.id}`)
  }

  _handleSubscriptions() {
    const { channel } = this.props
    this.context.modal.push(<Subscriptions channel={ channel } />)
  }

}

export default Chat
