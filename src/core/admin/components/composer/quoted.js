import PropTypes from 'prop-types'
import Avatar from '../avatar'
import moment from 'moment'
import React from 'react'

class Quoted extends React.Component {

  static propTypes = {
    quoted: PropTypes.object
  }

  render() {
    const { quoted } = this.props
    return (
      <div className="maha-message-quoted">
        <div className="maha-message-quoted-message">
          <div className="maha-message-quoted-message-header">
            <Avatar user={ quoted.user } width={ 16 } presence={ false } />
            { quoted.user.full_name }
          </div>
          <div className="maha-message-quoted-message-body">
            { quoted.text }
          </div>
          <div className="maha-message-quoted-message-timestamp">
            { moment(quoted.created_at).calendar(moment(), {
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

export default Quoted
