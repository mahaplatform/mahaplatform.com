import PropTypes from 'prop-types'
import { Button } from '@admin'
import React from 'react'
import _ from 'lodash'

const DomainStatusToken = ({ check, status }) => (
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
      { status } { check &&
        <>
          (<Button { ...check } />)
        </>
      }
    </div>
  </div>
)

DomainStatusToken.propTypes = {
  check: PropTypes.object,
  status: PropTypes.string
}

export default DomainStatusToken
