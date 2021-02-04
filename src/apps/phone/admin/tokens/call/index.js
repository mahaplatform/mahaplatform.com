import PropTypes from 'prop-types'
import { Logo } from '@admin'
import moment from 'moment'
import React from 'react'

const CallToken = ({ created_at, program }) => (
  <div className="event-token">
    <div className="event-token-logo">
      <Logo team={ program } width="24" />
    </div>
    <div className="event-token-label">
      { moment(created_at).format('MM/DD/YY [@] hh:mmA') }
    </div>
  </div>
)

CallToken.propTypes = {
  created_at: PropTypes.object,
  program: PropTypes.object
}

export default CallToken
