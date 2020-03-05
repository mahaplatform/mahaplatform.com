import PropTypes from 'prop-types'
import React from 'react'

const Token = ({ email, subject, user }) => (
  <div>
    { user &&
      <div>
        To { user.full_name }
      </div>
    }
    { email &&
      <div>
        To { email }
      </div>
    }
    { subject &&
      <div>
        &quot;{ subject }&quot;
      </div>
    }
  </div>
)

Token.propTypes = {
  body: PropTypes.string,
  email: PropTypes.string,
  subject: PropTypes.string,
  user: PropTypes.object
}

export default Token
