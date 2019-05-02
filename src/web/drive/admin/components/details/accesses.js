import AccessToken from '../access_token'
import PropTypes from 'prop-types'
import React from 'react'

const Accesses = ({ accesses }) => (
  <div className="drive-details-accesses">
    { accesses.map((access, index) => (
      <AccessToken { ...access } key={`access_${index}`} />
    )) }
  </div>
)

Accesses.propTypes ={
  accesses: PropTypes.array
}

export default Accesses
