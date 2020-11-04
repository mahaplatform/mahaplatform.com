import PropTypes from 'prop-types'
import { Logo } from 'maha-admin'
import React from 'react'

const FormToken = ({ program, title }) => (
  <div className="form-token">
    <div className="form-token-logo">
      <Logo team={ program } width="24" />
    </div>
    <div className="form-token-label">
      { title }
    </div>
  </div>
)

FormToken.propTypes = {
  program: PropTypes.object,
  title: PropTypes.string
}

export default FormToken
