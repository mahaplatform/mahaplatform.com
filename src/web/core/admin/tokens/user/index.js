import PropTypes from 'prop-types'
import Avatar from '../../components/avatar'
import React from 'react'

const UserToken = (props) => (
  <div className="compact-user-token">
    <div className="compact-user-token-avatar">
      <Avatar user={ props } width="40" presence={ props.presence } />
    </div>
    <div className="compact-user-token-details">
      <div className="compact-user-token-details-inner">
        { (props.id === props.user_id) ? 'You' : props.full_name }
        { props.is_active === false && <span className="compact-user-token-activity">
          INACTIVE
        </span> }
      </div>
    </div>
  </div>
)

UserToken.propTypes = {
  full_name: PropTypes.string,
  id: PropTypes.number,
  is_active: PropTypes.bool,
  presence: PropTypes.bool,
  user_id: PropTypes.number
}

export default UserToken
