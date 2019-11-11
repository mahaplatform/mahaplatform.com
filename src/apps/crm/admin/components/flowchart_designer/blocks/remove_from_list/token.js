import PropTypes from 'prop-types'
import React from 'react'

const Token = ({ list }) => (
  <div>
    { list &&
      <div>
        { list.title }
      </div>
    }
  </div>
)

Token.propTypes = {
  list: PropTypes.object
}

export default Token
