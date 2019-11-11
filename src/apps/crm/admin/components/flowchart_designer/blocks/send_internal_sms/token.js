import PropTypes from 'prop-types'
import React from 'react'

const Token = ({ user, message }) => (
  <div>
    { user &&
      <div>
        To { user.full_name }
      </div>
    }
    { message &&
      <div>
        &quot;{ message }&quot;
      </div>
    }
  </div>
)

Token.propTypes = {
  user: PropTypes.object,
  message: PropTypes.string
}

export default Token
