import PropTypes from 'prop-types'
import { Logo } from 'maha-admin'
import moment from 'moment'
import React from 'react'

const EventToken = ({ end_date, start_date, program, title }) => (
  <div className="event-token">
    <div className="event-token-logo">
      <Logo team={ program } width="24" />
    </div>
    <div className="event-token-label">
      { title } (
      { start_date === end_date ?
        moment(start_date).format('MMM DD') :
        `${moment(start_date).format('MMM DD')} - ${moment(end_date).format('MMM DD')}`
      })
    </div>
  </div>
)

EventToken.propTypes = {
  end_date: PropTypes.object,
  program: PropTypes.object,
  start_date: PropTypes.object,
  title: PropTypes.string
}

export default EventToken
