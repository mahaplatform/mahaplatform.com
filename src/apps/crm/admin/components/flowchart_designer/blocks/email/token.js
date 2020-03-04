import PropTypes from 'prop-types'
import React from 'react'

const Token = ({ email }) => (
  <div>
    { email &&
      <div>
        { email.title }
      </div>
    }
  </div>
)

Token.propTypes = {
  email: PropTypes.object
}

export default Token
