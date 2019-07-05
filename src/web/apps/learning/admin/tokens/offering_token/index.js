import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

const OfferingToken = ({ assignments_count, limit, date, starts_at, ends_at }) => (
  <div className="learning-offering-token">
    <strong>{ moment(date).format('dddd, MMMM DD, YYYY') }</strong><br />
    { moment(`2019-01-01 ${starts_at}`).format('hh:mm A') } - { moment(`2019-01-01 ${ends_at}`).format('hh:mm A') }<br />
    { limit && assignments_count < limit &&
      <span className="alert">{ limit - assignments_count } seats remaining</span>
    }
    { limit && assignments_count === limit &&
      <span className="alert">This offering is full</span>
    }
  </div>
)

OfferingToken.propTypes = {
  assignments_count: PropTypes.number,
  date: PropTypes.string,
  limit: PropTypes.number,
  starts_at: PropTypes.string,
  ends_at: PropTypes.string
}

export default OfferingToken
