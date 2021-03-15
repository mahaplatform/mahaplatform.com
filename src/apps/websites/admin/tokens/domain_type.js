import PropTypes from 'prop-types'
import React from 'react'

const options = {
  register: { title: 'Register Domain', description: 'Regsiter a new domain name through Maha' },
  transfer: { title: 'Transfer Domain', description: 'Transfer an existing domain name to Maha' },
  dns: { title: 'Point Domain', description: 'Point an externally registered domain name to Maha' }
}

const DomainTypeToken = ({ value }) => (
  <div className="token">
    <strong>{ options[value].title }<br /></strong>
    { options[value].description }
  </div>
)

DomainTypeToken.propTypes = {
  value: PropTypes.string
}

export default DomainTypeToken
