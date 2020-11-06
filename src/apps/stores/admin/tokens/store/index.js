import PropTypes from 'prop-types'
import { Logo } from '@admin'
import React from 'react'

const StoreToken = ({ program, title }) => (
  <div className="store-token">
    <div className="store-token-logo">
      <Logo team={ program } width="24" />
    </div>
    <div className="store-token-label">
      { title }
    </div>
  </div>
)

StoreToken.propTypes = {
  program: PropTypes.object,
  title: PropTypes.string
}

export default StoreToken
