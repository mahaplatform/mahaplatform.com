import PropTypes from 'prop-types'
import React from 'react'

const FromToken = ({ contact, direction, from_number, program }) => (
  <div className="caller-token">
    { direction === 'inbound' ? contact.display_name : program.title }<br />
    <span>{ from_number.formatted }</span>
  </div>
)

FromToken.propTypes = {
  from_number: PropTypes.object
}

export default FromToken
