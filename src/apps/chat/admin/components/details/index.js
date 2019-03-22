import { Button, List, Star } from 'maha-admin'
import PropTypes from 'prop-types'
import Message from '../message'
import React from 'react'

class Details extends React.Component {

  static contextTypes = {
  }

  static propTypes = {
    message: PropTypes.object
  }

  render() {
    const { message } = this.props
    if(!message) return null
    return (
      <div className="chat-details">
        <List { ...this._getList() } />
      </div>
    )
  }

  _getList() {
    return {
      items: [
        { component: <Message { ...this._getMessage() } /> },
        { component: <Star { ...this._getStar() } /> },
        { component: <Button { ...this._getDelete() } /> }
      ]
    }
  }

  _getMessage() {
    const { message } = this.props
    return {
      ...message,
      inline: false,
      full: true,
      actions: false
    }
  }

  _getStar() {
    const { message } = this.props
    return {
      starText: 'Add Star',
      unstarText: 'Remove Star',
      is_starred: message.is_starred,
      label: 'message',
      table: 'chat_messages',
      id: message.id
    }
  }

  _getDelete() {
    return {
      icon: 'trash-o',
      label: 'Delete Message',
      className: 'reframe-list-item-link'
    }
  }

}

export default Details
