import PropTypes from 'prop-types'
import React from 'react'

const ResourceToken = ({ description, title }) => (
  <div className="token">
    <strong>{ title}</strong><br />
    { description }
  </div>
)

ResourceToken.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string
}

export default ResourceToken
