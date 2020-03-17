import PropTypes from 'prop-types'
import React from 'react'

const Token = ({ name }) => (
  <div>{ name.value }</div>
)

Token.propTypes = {
  name: PropTypes.object
}

export default Token
