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

  render() {
    const { channel, showHeader } = this.props
    if(!channel) return null
    return (
      <div className="chat-info">
        { showHeader && <Header { ...this._getHeader() } /> }
        <div className="chat-info-body">
          <Tasks { ...this._getTasks() } />
          <List { ...this._getList() } />
        </div>
      </div>
    )
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
      onEdit,
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

}

export default Info
