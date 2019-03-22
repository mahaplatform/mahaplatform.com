import React from 'react'
import PropTypes from 'prop-types'

const StrategyToken = ({ title, text }) => (
  <div className="token">
    <strong>{ title }</strong><br />
    { text }
  </div>
)

StrategyToken.propTypes = {
  text: PropTypes.text,
  title: PropTypes.title
}

export default StrategyToken
