import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

const FeedDate = ({ date }) => {

  const formatted = moment(date).calendar(moment(), {
    sameDay: '[Today]',
    lastDay: '[Yesterday]',
    lastWeek: 'dddd, MMMM Do, YYYY',
    sameElse: 'dddd, MMMM Do, YYYY'
  })

  return (
    <div className="maha-feed-date">
      { formatted }
    </div>
  )

}

FeedDate.propTypes = {
  date: PropTypes.string
}

export default FeedDate
