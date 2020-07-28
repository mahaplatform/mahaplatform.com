import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'

const ProjectToken = ({ balance, description }) => (
  <div className="token credit-token">
    { description } (balance { numeral(balance).format('0.00') })
  </div>
)

ProjectToken.propTypes = {
  balance: PropTypes.numeral,
  description: PropTypes.string
}

export default ProjectToken
