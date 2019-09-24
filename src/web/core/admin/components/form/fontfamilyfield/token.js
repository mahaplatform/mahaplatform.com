import PropTypes from 'prop-types'
import React from 'react'

const FontFamilyToken = ({ text, value }) => (
  <div className="token" style={{ fontFamily: value }}>
    { text }
  </div>
)

FontFamilyToken.propTypes = {
  text: PropTypes.string,
  value: PropTypes.string
}

export default FontFamilyToken
