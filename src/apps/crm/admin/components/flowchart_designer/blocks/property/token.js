import PropTypes from 'prop-types'
import React from 'react'

const Token = ({ property }) => (
  <div>
    { property &&
      <div>
        { property.label }
      </div>
    }
  </div>
)

Token.propTypes = {
  property: PropTypes.object
}

export default Token
