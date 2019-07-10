import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import React from 'react'

const OfferingToken = ({ title, questions }) => (
  <div className="token">
    <strong>{ title }</strong><br />
    { pluralize('question', questions.length, true) }
  </div>
)

OfferingToken.propTypes = {
  title: PropTypes.string,
  questions: PropTypes.array
}

export default OfferingToken
