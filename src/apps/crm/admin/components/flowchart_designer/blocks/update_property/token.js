import PropTypes from 'prop-types'
import React from 'react'

const Token = ({ field }) => (
  <div>
    { field &&
      <div>
        { field.label }
      </div>
    }
  </div>
)

Token.propTypes = {
  field: PropTypes.object
}

export default Token
