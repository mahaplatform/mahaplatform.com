import PropTypes from 'prop-types'
import Avatar from '../../components/avatar'
import React from 'react'

const CompactUserToken = (props) => (
  <div className="compact-user-token">
    <div className="compact-user-token-avatar">
      <Avatar user={ props } width="40" presence={ props.presence } />
    </div>
    <div className="compact-user-token-details">
      { (props.id === props.user_id) ? 'You' : props.full_name }
    </div>
  </div>
)

CompactUserToken.propTypes = {
  full_name: PropTypes.string,
  id: PropTypes.number,
  presence: PropTypes.bool,
  user_id: PropTypes.number
}

export default CompactUserToken
