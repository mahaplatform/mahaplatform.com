import PropTypes from 'prop-types'
import React from 'react'

const Token = ({ workflow }) => (
  <div>
    { workflow &&
      <div>
        { workflow.title }
      </div>
    }
  </div>
)

Token.propTypes = {
  workflow: PropTypes.object
}

export default Token
