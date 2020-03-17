import PropTypes from 'prop-types'
import React from 'react'

const Token =  ({ strategy, voice, loop, recording_id, message }) => (
  <div>
    { strategy }
  </div>
)

Token.propTypes = {
  strategy: PropTypes.string,
  voice: PropTypes.string,
  loop: PropTypes.number,
  recording_id: PropTypes.number,
  message: PropTypes.string
}

export default Token
