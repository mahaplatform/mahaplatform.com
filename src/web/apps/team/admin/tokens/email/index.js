import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

const EmailToken = ({ sent_at, subject, to, was_opened }) => (
  <div className="email-token">
    <div className="email-token-icon">
      { was_opened && <i className="fa fa-fw fa-envelope-open" /> }
      { !was_opened && <i className="fa fa-fw fa-envelope" /> }
    </div>
    <div className="email-token-details">
      <small>{ _relativeTime(sent_at) }</small><br />
      <strong>{ to.match(/([^<]*).*/)[1] }</strong><br />
      {subject }
    </div>
  </div>
)

EmailToken.propTypes = {
  sent_at: PropTypes.object,
  subject: PropTypes.string,
  to: PropTypes.string,
  was_opened: PropTypes.object
}

const _relativeTime = (sent_at) => {
  if(!sent_at) return 'NOT SENT'
  const datetime = moment(sent_at)
  if(datetime.isSame(moment(), 'd')) return datetime.format('h:mm A')
  if(datetime.isSame(moment().subtract(1, 'day'), 'd')) return 'Yesterday'
  return datetime.format('MMM D, YYYY')
}

export default EmailToken
