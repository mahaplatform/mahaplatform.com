import PropTypes from 'prop-types'
import Avatar from '../../components/avatar'
import React from 'react'

const UserToken = (props) => (
  <div className="user-token">
    <div className="user-token-avatar">
      <Avatar user={ props } width="40" presence={ props.presence } />
    </div>
    <div className="user-token-details">
      <div className="user-token-details-inner">
        { (props.id === props.user_id) ? 'You' : props.full_name }
        { props.is_active === false && <span className="user-token-activity">
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
