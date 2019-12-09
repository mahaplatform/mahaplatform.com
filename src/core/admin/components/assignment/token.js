import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

const Token = ({ text, value }) => (
  <div className="maha-value-token">
    { _.get(value, text) }
  </div>
)

Token.propTypes = {
  text: PropTypes.any,
  value: PropTypes.object
}

export default Token
