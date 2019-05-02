import { Message } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

export const Empty = ({ onNew, channel_type }) => {

  const _getMessage = () => {
    if(channel_type === 'active') {
      return {
        icon: 'comment',
        title: 'No channels',
        text: 'You havent yet started a conversation',
        button: {
          label: 'Start Conversation',
          handler: onNew
        }
      }
    } else if(channel_type === 'archived') {
      return {
        icon: 'archive',
        title: 'No conversations',
        text: 'You have not archived any conversations'
      }
    } else if(channel_type === 'starred') {
      return {
        icon: 'star',
        title: 'No conversations',
        text: 'You have not starred any conversations'
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
