import PropTypes from 'prop-types'
import React from 'react'

const EmailToken = ({ code, subject}) => (
  <div className="token">
    <strong>{ code }</strong><br />
    { subject }
  </div>
)

EmailToken.propTypes = {
  code: PropTypes.string,
  subject: PropTypes.string
}
export default EmailToken
