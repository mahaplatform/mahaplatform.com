import PropTypes from 'prop-types'
import { Logo } from '@admin'
import React from 'react'

const GroupToken = (group) => (
  <div className="group-token">
    <div className="group-token-logo">
      <Logo team={ group } width="24" />
    </div>
    <div className="group-token-details">
      { group.title }
    </div>
  </div>
)

GroupToken.propTypes = {
  title: PropTypes.string,
  id: PropTypes.number
}

export default GroupToken
