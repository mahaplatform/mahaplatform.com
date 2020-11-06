import { connect } from 'react-redux'
import { Avatar } from '@admin'
import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'
import _ from 'lodash'

class Subscriptions extends React.Component {

  static contextTypes = {
    admin: PropTypes.object
  }

  static propTypes = {
    channel: PropTypes.object,
    typing: PropTypes.array,
    presence: PropTypes.array,
    user_id: PropTypes.number
  }

  render() {
    const { channel, user_id } = this.props
    return (
      <div className="chat-info-subscriptions">
        { channel.subscriptions.map((user, index) => (
          <div className="chat-info-subscription" key={`subscription${index}`}>
            <div className="chat-info-subscription-avatar">
              <Avatar user={ user } width="40" presence={ true } />
            </div>
            <div className="chat-info-subscription-details">
              <strong>{ (user.id === user_id) ? 'You' : user.full_name }</strong><br />
              <span>{ this._isTyping(user) ? <em>typing...</em> : this._getStatus(user) }</span>
            </div>
            { user.device &&
              <div className="chat-info-subscription-device" title={ `${ user.device.os_name } ${ user.device.browser_name } on a ${ user.device.device_name }`}>
                <i className={`fa fa-fw fa-${ user.device.device_type }`} />
              </div>
            }
          </div>
        )) }
      </div>
    )
  }

  _isTyping(user) {
    const { channel, typing } = this.props
    return _.findIndex(typing, { channel_id: channel.id, user_id: user.id }) >= 0
  }

  _getStatus(user) {
    if(user.active) return 'Active now'
    const presence = _.find(this.props.presence, { user_id: user.id })
    if(presence) return 'Online'
    return 'Last online '+moment(user.last_online_at).calendar(null, {
      sameDay: '[today at] h:mmA',
      lastDay: '[yesterday at] h:mmA',
      lastWeek: 'dddd [at] h:mmA',
      sameElse: 'M/D/YY [at] h:mmA'
    })
  }

}

const mapStateToProps = (state, props) => ({
  presence: state.maha.presence.presence,
  typing: state.chat.root.typing,
  user_id: state.maha.admin.user.id
})

export default connect(mapStateToProps)(Subscriptions)
