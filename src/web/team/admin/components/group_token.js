import PropTypes from 'prop-types'
import React from 'react'

const GroupToken = ({ title }) => (
  <div className="token group-token">
    { title }
  </div>
)

GroupToken.propTypes = {
  title: PropTypes.string
}

export default GroupToken
