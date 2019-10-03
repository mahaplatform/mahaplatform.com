import { Avatar } from 'maha-admin'
import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

class MessageToken extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    attachments: PropTypes.array,
    created_at: PropTypes.string,
    editing: PropTypes.bool,
    full: PropTypes.bool,
    receipts: PropTypes.array,
    text: PropTypes.string,
    type: PropTypes.string,
    user: PropTypes.object
  }

  render() {
    const { text, user } = this.props
    return (
      <div className="message-token">
        <div className="message-token-avatar">
          <Avatar user={ user } presence={ true } width={ 50 } />
        </div>
        <div className="message-token-details">
          <div className="message-token-text">
            <strong>{ user.full_name }</strong><br />
            <span>{ text }</span>
          </div>
          <div className="message-token-timestamp">
            { this._getTimestamp() }
          </div>
        </div>
        <div className="message-token-extra" />
        <div className="message-token-proceed">
          <i className="fa fa-fw fa-chevron-right" />
        </div>
      </div>
    )
  }

  _getTimestamp() {
    return moment(this.props.created_at).calendar(null, {
      sameDay: 'h:mmA',
      lastDay: '[Yesterday]',
      lastWeek: 'dddd',
      sameElse: 'M/D/YY'
    })
  }

}

export default MessageToken
