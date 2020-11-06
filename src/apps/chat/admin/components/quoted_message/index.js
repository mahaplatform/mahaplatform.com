import { Avatar, RichText } from '@admin'
import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

class QuotedMessage extends React.Component {

  static contextTypes = {
  }

  static propTypes = {
    message: PropTypes.object
  }

  render() {
    const { message } = this.props
    return (
      <div className="maha-message-quoted">
        <div className="maha-message-quoted-message">
          <div className="maha-message-quoted-message-header">
            <Avatar user={ message.user } width={ 16 } presence={ false } />
            { message.user.full_name }
          </div>
          <div className="maha-message-quoted-message-body">
            <RichText { ...this._getRichtext() } />
          </div>
          <div className="maha-message-quoted-message-timestamp">
            { moment(message.created_at).calendar(moment(), {
              sameDay: '[Today @] h:mm A',
              lastDay: '[Yesterday @]',
              lastWeek: 'dddd, MMMM Do, YYYY [@] h:mm A',
              sameElse: 'dddd, MMMM Do, YYYY [@] h:mm A'
            }) }
          </div>
        </div>
      </div>
    )
  }

  _getRichtext() {
    const { message } = this.props
    return {
      attachments: [],
      text: message.text
    }
  }

}

export default QuotedMessage
