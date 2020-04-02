import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

const SessionToken = (session) => (
  <div className="session-token">
    <strong>{ session.title }</strong>
    <div>
      <i className="fa fa-fw fa-calendar" />
      { moment(`${session.date}`).format('MMM D, YYYY') }, { moment(`2020-01-01 ${session.start_time}`).format('h:mmA') } - { moment(`2020-01-01 ${session.end_time}`).format('h:mmA') }
    </div>
    { session.is_online ?
      <div>
        <i className="fa fa-fw fa-desktop" />
        Online Session
      </div> :
      <div>
        <i className="fa fa-fw fa-map-marker" />
        { session.location.name }, { session.location.address.description }
      </div>
    }
  </div>
)

SessionToken.propTypes = {
  session: PropTypes.object
}

export default SessionToken
