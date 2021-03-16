import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

const DomainStatusToken = ({ status }) => (
  <div className="domain-status-token">
    <div className="domain-status-token-icon">
      { _.includes(['pending','inprogress'], status) &&
        <i className="fa fa-circle-o-notch fa-spin" />
      }
      { status === 'success' &&
        <i className="fa fa-check-circle-o" />
      }
    </div>
    <div className="domain-status-token-details">
      { status }
    </div>
  </div>
)

DomainStatusToken.propTypes = {
  status: PropTypes.string
}

export default DomainStatusToken
