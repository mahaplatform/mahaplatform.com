import PropTypes from 'prop-types'
import React from 'react'

const purposes = {
  transactional: {
    title: 'Transactional',
    description: 'This communication is required as part of a service the contact has already purchased or registered for'
  },
  marketing: {
    title: 'Marketing',
    description: 'This communication is being sent for marketing purposes'
  }
}

const PurposeToken = ({ value }) => {
  const purpose = purposes[value]
  return (
    <div className="token">
      <strong>{ purpose.title }</strong><br />
      { purpose.description }
    </div>
  )
}

PurposeToken.propTypes = {
  value: PropTypes.string
}

export default PurposeToken
