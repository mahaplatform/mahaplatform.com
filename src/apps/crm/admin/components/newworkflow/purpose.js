import PropTypes from 'prop-types'
import React from 'react'

const purposes = {
  transactional: {
    title: 'Transactional',
    description: 'This workflow is for a service the contact has purchased or enrolled in. Any email or text message sent through this workflow will be sent to the contact\'s primary phone or email address'
  },
  marketing: {
    title: 'Marketing',
    description: 'This workflow is for marketing purposes. Any email and/or text messages sent through this workflow will only be sent to email addresses or phone numbers for which the contact has given their consent'
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
