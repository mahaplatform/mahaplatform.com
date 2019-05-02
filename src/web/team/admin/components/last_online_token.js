import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

const LastOnlineToken = ({ last_online_at }) => {

  const status = _getStatus(last_online_at)

  return (
    <div className="reframe-list-item-content">
      <div className="reframe-list-item-content-label">Last Online</div>
      <div className="reframe-list-item-content-value">
        <span>
          <i className={`fa fa-fw fa-circle ${status.icon}`}/>
          { status.text }
        </span>
      </div>
    </div>
  )

}

LastOnlineToken.propTypes = {
  last_online_at: PropTypes.object
}

const _getStatus = (last_online_at) => {
  const diff = moment().diff(moment(last_online_at), 'minutes')
  if(!last_online_at) return { icon: 'absent', text: 'NEVER' }
  if(diff > 15) return { icon: 'absent', text: moment(last_online_at).format('MM/DD/YY @ hh:mm A') }
  if(diff > 10) return { icon: 'abandoned', text: moment(last_online_at).fromNow() }
  if(diff > 5) return { icon: 'waiting', text: moment(last_online_at).fromNow() }
  return { icon: 'present', text: 'ONLINE NOW' }
}

export default LastOnlineToken
