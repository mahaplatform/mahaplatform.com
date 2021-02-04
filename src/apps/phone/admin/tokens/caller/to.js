import PropTypes from 'prop-types'
import React from 'react'

const ToToken = ({ contact, direction, program, to_number }) => (
  <div className="caller-token">
    { direction === 'inbound' ? program.title : contact.display_name }<br />
    <span>{ to_number.formatted }</span>
  </div>
)

ToToken.propTypes = {
  to_number: PropTypes.object
}

export default ToToken
