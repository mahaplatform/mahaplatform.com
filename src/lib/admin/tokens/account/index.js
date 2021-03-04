import PropTypes from 'prop-types'
import Avatar from '../../components/avatar'
import React from 'react'

const AccountToken = (props) => {
  return (
    <div className="account-token">
      <div className="account-token-avatar">
        <Avatar user={ props } width="40" />
      </div>
      <div className="account-token-details">
        <div className="account-token-details-inner">
          { props.full_name } &lt;{ props.email }&gt;
        </div>
      </div>
    </div>
  )
}

AccountToken.propTypes = {
  email: PropTypes.string,
  full_name: PropTypes.string,
  id: PropTypes.number
}

export default AccountToken
