import { Button, List } from 'maha-admin'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

class Tasks extends React.Component {

  static contextTypes = {
    confirm: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    channel: PropTypes.object,
    id: PropTypes.number,
    title: PropTypes.bool,
    user_id: PropTypes.number,
    onArchive: PropTypes.func,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    onLeave: PropTypes.func,
    onSubscriptions: PropTypes.func
  }

  _handleArchive = this._handleArchive.bind(this)
  _handleDelete = this._handleDelete.bind(this)
  _handleEdit = this._handleEdit.bind(this)
  _handleLeave = this._handleLeave.bind(this)
  _handleSubscriptions = this._handleSubscriptions.bind(this)

  render() {
    const { channel, title } = this.props
    return (
      <div className="chat-tasks">
        { title &&
          <div className="reframe-tasks-title">
            <div className="reframe-tasks-title-label">
              { channel.name || channel.label }
            </div>
          </div>
        }
        <List { ...this._getList() } />
      </div>
    )
  }

  _getPanel() {
    return {
      title: 'Info',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
  }

  _getList() {
    const { channel, user_id } = this.props
    const isOwner = channel.owner.id === user_id
    const items = []
    if(isOwner) {
      if(channel.is_archived) {
        items.push({ component: <Button { ...this._getActivate() } /> })
        items.push({ component: <Button { ...this._getDelete() } /> })
      } else {
        items.push({ component: <Button { ...this._getEdit() } /> })
        items.push({ component: <Button { ...this._getArchive() } /> })
        items.push({ component: <Button { ...this._getDelete() } /> })
        items.push({ component: <Button { ...this._getSubscriptions() } /> })
      }
    }
    if(!channel.is_archived && !isOwner) {
      items.push({ component: <Button { ...this._getLeave() } /> })
    }
    return { items }
  }

  _getActivate() {
    return {
      icon: 'check-circle',
      label: 'Activate Conversation',
      className: 'reframe-list-item-link',
      handler: this._handleArchive
    }
  }

  _getArchive() {
    return {
      icon: 'archive',
      label: 'Archive Conversation',
      className: 'reframe-list-item-link',
      handler: this._handleArchive
    }
  }

  _getEdit() {
    return {
      icon: 'pencil',
      label: 'Edit Conversation',
      className: 'reframe-list-item-link',
      handler: this._handleEdit
    }
  }

  _getDelete() {
    return {
      icon: 'trash',
      label: 'Delete Channel',
      className: 'reframe-list-item-link',
      handler: this._handleDelete
    }
  }

  _getSubscriptions() {
    return {
      icon: 'users',
      label: 'Manage Members',
      className: 'reframe-list-item-link',
      handler: this._handleSubscriptions
    }
  }

  _getLeave() {
    return {
      icon: 'arrow-circle-left',
      label: 'Leave Conversation',
      className: 'reframe-list-item-link',
      handler: this._handleLeave
    }
  }

  _handleEdit() {
    this.props.onEdit()
  }

  _handleSubscriptions() {
    this.props.onSubscriptions()
  }

  _handleArchive() {
    const { channel } = this.props
    this.props.onArchive(channel)
  }

  _handleDelete() {
    const { channel } = this.props
    this.props.onDelete(channel)
  }

  _handleLeave() {
    const { channel } = this.props
    this.props.onLeave(channel)
  }

}

const mapStateToProps = (state, props) => ({
  user_id: state.maha.admin.user.id
})

export default connect(mapStateToProps)(Tasks)
