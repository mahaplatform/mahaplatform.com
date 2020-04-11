import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

const EventToken = ({ end_date, start_date, title }) => (
  <div className="token">
    <strong>{ title }</strong> (
    { start_date === end_date ?
      moment(start_date).format('MMM DD') :
      `${moment(start_date).format('MMM DD')} - ${moment(end_date).format('MMM DD')}`
    })
  </div>
)

EventToken.propTypes = {
  end_date: PropTypes.object,
  start_date: PropTypes.object,
  title: PropTypes.string
}

export default EventToken
