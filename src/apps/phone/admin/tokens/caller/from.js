import PropTypes from 'prop-types'
import React from 'react'

const FromToken = ({ contact, direction, from_number, program }) => (
  <div className="caller-token">
    { direction === 'inbound' && contact &&
      <div>{ contact.display_name }</div>
    }
    { direction === 'outbound' && program &&
      <div>{ program.title }</div>
    }
    <span>{ from_number.formatted }</span>
  </div>
)

FromToken.propTypes = {
  contact: PropTypes.object,
  direction: PropTypes.string,
  from_number: PropTypes.object,
  program: PropTypes.object
}

export default FromToken
