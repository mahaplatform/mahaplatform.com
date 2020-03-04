import PropTypes from 'prop-types'
import React from 'react'

const Token = ({ message }) => (
  <div>
    { message &&
      <div>
        &quot;{ message }&quot;
      </div>
    }
  </div>
)

Token.propTypes = {
  message: PropTypes.string
}

export default Token
