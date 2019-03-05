import Subscriptions from './subscriptions'
import PropTypes from 'prop-types'
import { List } from 'maha-admin'
import Header from '../header'
import Tasks from '../tasks'
import React from 'react'

class Info extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    confirm: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    channel: PropTypes.object,
    id: PropTypes.number,
    showHeader: PropTypes.bool,
    onEdit: PropTypes.func,
    onSubscriptions: PropTypes.func
  }

  _handleArchive = this._handleArchive.bind(this)
  _handleDelete = this._handleDelete.bind(this)
  _handleLeave = this._handleLeave.bind(this)

  render() {
    const { channel, showHeader } = this.props
    if(!channel) return null
    return (
      <div className={ this._getClass() }>
        { showHeader && <Header { ...this._getHeader() } /> }
        <div className="chat-info-body">
          <Tasks { ...this._getTasks() } />
          <List { ...this._getList() } />
        </div>
      </div>
    )
  }

  _getClass() {
    const { channel } = this.props
    const classes = ['chat-info']
    if(channel.is_archived) classes.push('archived')
    return classes.join(' ')
  }

  _getHeader() {
    return this.props.channel
  }

  _getTasks() {
    const { channel, id, onEdit, onSubscriptions } = this.props
    return {
      channel,
      id,
      title: false,
      onArchive: this._handleArchive,
      onDelete: this._handleDelete,
      onEdit,
      onLeave: this._handleLeave,
      onSubscriptions
    }
  }

  _getList() {
    const { channel } = this.props
    const items = [
      { component: <Subscriptions channel={ channel } /> }
    ]
    return { items }
  }

  _handleArchive(channel) {
    const { network, confirm } = this.context
    const action = channel.is_archived ? 'activate' : 'archive'
    const yes = () => network.request({
      method: 'PATCH',
      endpoint: `/api/admin/chat/channels/${channel.id}/archive`
    })
    confirm.open(`Are you sure you want to ${action} this conversation?`, yes)

  }

  _handleDelete(channel) {
    const { network, confirm } = this.context
    const yes = () => network.request({
      method: 'DELETE',
      endpoint: `/api/admin/chat/channels/${channel.id}`
    })
    confirm.open('Are you sure you want to permanently delete this channel?', yes)
  }

  _handleLeave(channel) {
    const { network, confirm } = this.context
    const yes = () => network.request({
      method: 'PATCH',
      endpoint: `/api/admin/chat/channels/${channel.id}/leave`
    })
    confirm.open('Are you sure you want to leave this channel?', yes)
  }

}

export default Info
