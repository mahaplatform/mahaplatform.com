import PropTypes from 'prop-types'
import React from 'react'

const SenderToken = ({ name, email }) => (
  <div className="token">
    { `${ name } <${ email }>` }
  </div>
)

SenderToken.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string
}

export default SenderToken
