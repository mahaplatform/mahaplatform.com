import PropTypes from 'prop-types'
import React from 'react'

const Token = ({ message, number, user }) => (
  <div>
    { user &&
      <div>
        To { user.full_name }
      </div>
    }
    { number &&
      <div>
        To { number }
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
  message: PropTypes.string,
  number: PropTypes.string,
  user: PropTypes.object
}

export default Token
