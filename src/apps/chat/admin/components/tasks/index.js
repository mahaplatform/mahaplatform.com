import { Button, List } from '@admin'
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
    onEdit: PropTypes.func,
    onSubscriptions: PropTypes.func
  }

  _handleEdit = this._handleEdit.bind(this)
  _handleSubscriptions = this._handleSubscriptions.bind(this)

  render() {
    const { channel, title } = this.props
    return (
      <div className="chat-tasks">
        { title &&
          <div className="maha-tasks-title">
            <div className="maha-tasks-title-label">
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
      items.push({ component: <Button { ...this._getEdit() } /> })
      items.push({ component: <Button { ...this._getSubscriptions() } /> })
    }
    return { items }
  }

  _getEdit() {
    return {
      icon: 'pencil',
      label: 'Edit Conversation',
      className: 'maha-list-item-padded maha-list-item-link',
      handler: this._handleEdit
    }
  }

  _getSubscriptions() {
    return {
      icon: 'users',
      label: 'Manage Members',
      className: 'maha-list-item-padded maha-list-item-link',
      handler: this._handleSubscriptions
    }
  }

  _handleEdit() {
    this.props.onEdit()
  }

  _handleSubscriptions() {
    this.props.onSubscriptions()
  }

}

const mapStateToProps = (state, props) => ({
  user_id: state.maha.admin.user.id
})

export default connect(mapStateToProps)(Tasks)
