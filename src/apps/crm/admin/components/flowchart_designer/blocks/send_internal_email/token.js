import PropTypes from 'prop-types'
import React from 'react'

const Token = ({ user, email }) => (
  <div>
    { user &&
      <div>
        To { user.full_name }
      </div>
    }
    { email &&
      <div>
        { email.title }
      </div>
    }
  </div>
)

Token.propTypes = {
  user: PropTypes.object,
  email: PropTypes.object
}

export default Token
