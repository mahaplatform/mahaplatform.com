import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

const MessageDate = ({ date }) => {

  const formatted = moment(date).calendar(moment(), {
    sameDay: '[Today]',
    lastDay: '[Yesterday]',
    lastWeek: 'dddd, MMMM Do, YYYY',
    sameElse: 'dddd, MMMM Do, YYYY'
  })

  return (
    <div className="chat-channel-date">
      <div className="chat-channel-date-wrapper">
        <div className="chat-channel-date-text">
          { formatted }
        </div>
      </div>
    </div>
  )

}

MessageDate.propTypes = {
  date: PropTypes.string
}

export default MessageDate
