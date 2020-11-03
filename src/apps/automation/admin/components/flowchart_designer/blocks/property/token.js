import PropTypes from 'prop-types'
import React from 'react'

const Token = ({ name }) => (
  <div>
    { name &&
      <div>
        { name }
      </div>
    }
  </div>
)

Token.propTypes = {
  name: PropTypes.string
}

export default Token
