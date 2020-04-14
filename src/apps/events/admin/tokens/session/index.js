import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

const SessionToken = (session) => (
  <div className="session-token">
    <strong>{ session.title }</strong>
    { session.description &&
      <div>
        { session.description }
      </div>
    }
    <div>
      { moment(session.starts_at).format('MMM D, YYYY h:mmA') } - { moment(session.ends_at).format('h:mmA') }
    </div>
    { session.is_online ?
      <div>
        Online Session
      </div> :
      <div>
        { session.location.name }, { session.location.address.description }
      </div>
    }
  </div>
)

SessionToken.propTypes = {
  session: PropTypes.object
}

export default SessionToken
