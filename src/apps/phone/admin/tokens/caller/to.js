import PropTypes from 'prop-types'
import React from 'react'

const ToToken = ({ contact, direction, program, to_number }) => (
  <div className="caller-token">
    { direction === 'inbound' && program &&
      <div>{ program.title }</div>
    }
    { direction === 'outbound' && contact &&
      <div>{ contact.display_name }</div>
    }
    <span>{ to_number.formatted }</span>
  </div>
)

ToToken.propTypes = {
  contact: PropTypes.object,
  direction: PropTypes.string,
  program: PropTypes.object,
  to_number: PropTypes.object
}

export default ToToken
