import { Message } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

export const Empty = ({ onNew, channel_type }) => {

  const _getMessage = () => {
    return {
      icon: 'comment',
      title: 'No channels',
      text: 'You havent yet started a conversation',
      button: {
        label: 'Start Conversation',
        handler: onNew
      }
    }
  }

  return <Message { ..._getMessage() } />

}

Empty.propTypes = {
  onNew: PropTypes.func,
  channel_type: PropTypes.string
}

export const NotFound = () => {

  const message = {
    icon: 'times',
    title: 'No Conversations',
    text: 'No conversations matched your query'
  }

  return <Message { ...message } />

}
