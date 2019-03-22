import PropTypes from 'prop-types'
import React from 'react'

const SourceToken = ({ text }) => (
  <div className="source-token">
    <div className="source-token-icon">
      <img src={`/images/${text}.png`} />
    </div>
    <div className="source-token-text">
      { text }
    </div>
  </div>
)

SourceToken.propTypes = {
  text: PropTypes.string
}

export default SourceToken
