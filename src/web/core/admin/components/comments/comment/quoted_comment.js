import Avatar from '../../avatar'
import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

class QuotedComment extends React.Component {

  static contextTypes = {
  }

  static propTypes = {
    comment: PropTypes.object
  }

  render() {
    const { comment } = this.props
    return (
      <div className="maha-message-quoted">
        <div className="maha-message-quoted-message">
          <div className="maha-message-quoted-message-header">
            <Avatar user={ comment.user } width={ 16 } presence={ false } />
            { comment.user.full_name }
          </div>
          <div className="maha-message-quoted-message-body">
            { comment.text }
          </div>
          <div className="maha-message-quoted-message-timestamp">
            { moment(comment.created_at).calendar(moment(), {
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

}

export default QuotedComment
