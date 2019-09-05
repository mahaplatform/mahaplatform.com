import PropTypes from 'prop-types'
import React from 'react'

const FontToken = ({ text, value }) => (
  <div className="token" style={{ fontFamily: value }}>
    { text }
  </div>
)

FontToken.propTypes = {
  text: PropTypes.string,
  value: PropTypes.string
}

export default FontToken
