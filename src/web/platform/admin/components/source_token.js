import PropTypes from 'prop-types'
import React from 'react'

const SourceToken = ({ text }) => (
  <div className="token">
    <img src={`/images/${text}.png`} width="16" height="16" />
    { text }
  </div>
)


SourceToken.propTypes = {
  text: PropTypes.string
}

export default SourceToken
