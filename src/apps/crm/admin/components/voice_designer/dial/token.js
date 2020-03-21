import PropTypes from 'prop-types'
import React from 'react'

const Token =  ({ number }) => (
  <div>
    { number }
  </div>
)

Token.propTypes = {
  number: PropTypes.string
}

export default Token
