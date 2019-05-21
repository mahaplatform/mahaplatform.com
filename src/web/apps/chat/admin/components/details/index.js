import { List } from 'maha-admin'
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
        { component: <Message { ...this._getMessage() } /> }
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

}

export default Details
