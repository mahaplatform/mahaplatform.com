import PropTypes from 'prop-types'
import React from 'react'

const Token = ({ topic }) => (
  <div>
    { topic &&
      <div>
        { topic.title }
      </div>
    }
  </div>
)

Token.propTypes = {
  topic: PropTypes.object
}

export default Token
