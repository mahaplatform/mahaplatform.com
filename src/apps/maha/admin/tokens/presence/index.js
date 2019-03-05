import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import moment from 'moment'
import React from 'react'

const LastOnlineToken = ({ last_online_at, last_active_at }) => {

  const last = last_active_at || last_online_at

  const status = _getStatus(last)

  return (
    <span>
      { status }
    </span>
  )

}

LastOnlineToken.propTypes = {
  last_online_at: PropTypes.object,
  last_active_at: PropTypes.object
}

const _getStatus = (last_online_at) => {
  const diff = moment().diff(moment(last_online_at), 'minutes')
  if(!last_online_at) return 'NEVER'
  if(diff > 1440) return moment(last_online_at).format('MM/DD/YY @ hh:mm A')
  if(diff > 60) return pluralize('hours', Math.floor(diff / 60), true) + ' ago'
  if(diff > 15) return pluralize('minutes', diff, true) + ' ago'
  if(diff > 10) return moment(last_online_at).fromNow()
  if(diff > 5) return moment(last_online_at).fromNow()
  return 'ONLINE NOW'
}

export default LastOnlineToken
