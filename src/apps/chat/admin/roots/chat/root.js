import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Root extends React.Component {

  static contextTypes = {
    host: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    active: PropTypes.array,
    channels: PropTypes.array,
    channels_status: PropTypes.string,
    count: PropTypes.number,
    messages: PropTypes.object,
    typing: PropTypes.array,
    unread: PropTypes.object,
    unread_status: PropTypes.string,
    user_id: PropTypes.number,
    onActivateChannel: PropTypes.func,
    onArchiveChannel: PropTypes.func,
    onAppear: PropTypes.func,
    onAddChannel: PropTypes.func,
    onAddTyping: PropTypes.func,
    onAddMessage: PropTypes.func,
    onDisappear: PropTypes.func,
    onFetchChannels: PropTypes.func,
    onFetchUnread: PropTypes.func,
    onRemoveChannel: PropTypes.func,
    onRemoveTyping: PropTypes.func,
    onUpdateChannel: PropTypes.func,
    onUpdateRead: PropTypes.func,
    onUpdateUnread: PropTypes.func
  }

  _handleActivateChannel = this._handleActivateChannel.bind(this)
  _handleArchiveChannel = this._handleArchiveChannel.bind(this)
  _handleAppear = this._handleAppear.bind(this)
  _handleAddChannel = this._handleAddChannel.bind(this)
  _handleAddMessage = this._handleAddMessage.bind(this)
  _handleAddTyping = this._handleAddTyping.bind(this)
  _handleDisappear = this._handleDisappear.bind(this)
  _handleRemoveChannel = this._handleRemoveChannel.bind(this)
  _handleRemoveTyping = this._handleRemoveTyping.bind(this)
  _handleUpdateChannel = this._handleUpdateChannel.bind(this)
  _handleUpdateRead = this._handleUpdateRead.bind(this)
  _handleUpdateUnread = this._handleUpdateUnread.bind(this)

  render() {
    return null
  }

  componentDidMount() {
    this.props.onFetchChannels()
    this.props.onFetchUnread()
    this._handleJoin()
  }

  componentWillUnmount() {
    this._handleLeave()
  }

  _handleJoin() {
    const { network } = this.context
    const target = '/admin/chat/messages'
    network.join(target)
    network.subscribe([
      { target, action: 'appear', handler: this._handleAppear },
      { target, action: 'add_channel', handler: this._handleAddChannel },
      { target, action: 'add_message', handler: this._handleAddMessage },
      { target, action: 'begin_type_message', handler: this._handleAddTyping },
      { target, action: 'disappear', handler: this._handleDisappear },
      { target, action: 'end_type_message', handler: this._handleRemoveTyping },
      { target, action: 'hello', handler: this._handleAppear },
      { target, action: 'activate_channel', handler: this._handleActivateChannel },
      { target, action: 'archive_channel', handler: this._handleArchiveChannel },
      { target, action: 'remove_channel', handler: this._handleRemoveChannel },
      { target, action: 'update_channel', handler: this._handleUpdateChannel },
      { target, action: 'update_read', handler: this._handleUpdateRead },
      { target, action: 'update_unread', handler: this._handleUpdateUnread }
    ])
  }

  _handleLeave() {
    const { network } = this.context
    const target = '/admin/chat/messages'
    network.leave(target)
    network.unsubscribe([
      { target, action: 'appear', handler: this._handleAppear },
      { target, action: 'add_channel', handler: this._handleAddChannel },
      { target, action: 'add_message', handler: this._handleAddMessage },
      { target, action: 'begin_type_message', handler: this._handleAddTyping },
      { target, action: 'end_type_message', handler: this._handleRemoveTyping },
      { target, action: 'hello', handler: this._handleAppear },
      { target, action: 'replace_message', handler: this._handleReplaceMessage },
      { target, action: 'activate_channel', handler: this._handleActivateChannel },
      { target, action: 'archive_channel', handler: this._handleArchiveChannel },
      { target, action: 'remove_channel', handler: this._handleRemoveChannel },
      { target, action: 'remove_message', handler: this._handleRemoveMessage },
      { target, action: 'update_channel', handler: this._handleUpdateChannel },
      { target, action: 'update_read', handler: this._handleUpdateRead },
      { target, action: 'update_unread', handler: this._handleUpdateUnread }
    ])
  }

  _handleActivateChannel({ channel_id }) {
    this.props.onActivateChannel(channel_id)
  }

  _handleArchiveChannel({ channel_id }) {
    this.props.onArchiveChannel(channel_id)
  }

  _handleAppear({ channel_id, user }) {
    this.props.onAppear(channel_id, user.id)
  }

  _handleAddChannel({ channel }) {
    this.props.onAddChannel(channel)
  }

  _handleAddMessage(message) {
    this.props.onAddMessage(message)
  }

  _handleAddTyping({ channel_id, user }) {
    const { typing, onAddTyping } = this.props
    if(_.findIndex(typing, { channel_id, user_id: user.id }) >= 0) return
    onAddTyping(channel_id, user.id, user.full_name)
  }

  _handleDisappear({ channel_id, user }) {
    this.props.onDisappear(channel_id, user.id)
  }

  _handleRemoveChannel({ channel_id }) {
    this.props.onRemoveChannel(channel_id)
  }

  _handleRemoveTyping({ channel_id, user }) {
    const { typing, onRemoveTyping } = this.props
    if(_.findIndex(typing, { channel_id, user_id: user.id }) < 0) return
    onRemoveTyping(channel_id, user.id, user.full_name)
  }

  _handleUpdateChannel({ channel }) {
    this.props.onUpdateChannel(channel)
  }

  _handleUpdateRead(receipt) {
    const user_id = this.props.user_id
    const channel_id = receipt.channel_id
    const reader_id = receipt.user_id
    const message = receipt.message
    this.props.onUpdateRead(user_id, channel_id, reader_id, message)
  }

  _handleUpdateUnread(unread) {
    this.props.onUpdateUnread(unread)
  }

}

const mapStateToProps = (state, props) => ({
  user_id: state.maha.admin.user.id
})

export default connect(mapStateToProps)(Root)
