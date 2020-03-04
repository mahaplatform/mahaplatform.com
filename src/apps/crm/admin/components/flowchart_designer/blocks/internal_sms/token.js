import PropTypes from 'prop-types'
import React from 'react'

const Token = ({ number, message }) => (
  <div>
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
  number: PropTypes.string,
  message: PropTypes.string
}

export default Token
