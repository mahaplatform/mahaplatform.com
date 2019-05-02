import PropTypes from 'prop-types'
import Avatar from '../../components/avatar'
import React from 'react'

const UserToken = (props) => (
  <div className="user-token">
    <div className="user-token-avatar">
      <Avatar user={ props } width="40" />
    </div>
    <div className="user-token-details">
      <strong>{ props.full_name }</strong><br />
      { props.email }
    </div>
  </div>
)

UserToken.propTypes = {
  full_name: PropTypes.string,
  email: PropTypes.string
}

export default UserToken
