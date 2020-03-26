import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

const Sessions = ({ event }) => {

  const sessions = [
    { id: 1, title: 'Session 1', location: { title: 'CCE Tompkins', address: { description: '615 Willow Ave, Ithaca, NY 14850 ' } }, date: '2019-04-12', start_time: '10:00:00', end_time: '11:30:00', attendances: [{},{},{},{}] },
    { id: 2, title: 'Session 2', location: { title: 'CCE Tompkins', address: { description: '615 Willow Ave, Ithaca, NY 14850 ' } }, date: '2019-04-19', start_time: '10:00:00', end_time: '11:30:00', attendances: [{},{}] }
  ]

  event.tickets_count = 6

  const _getButton = (session) => ({
    label: session.title,
    className: 'link',
    route: `/admin/events/events/${event.id}/sessions/${session.id}`
  })

  return (
    <div className="maha-table">
      <table className="ui unstackable table">
        <thead>
          <tr>
            <td>Title</td>
            <td>Time</td>
            <td className="collpasing">Attendees</td>
            <td className="collpasing" />
          </tr>
        </thead>
        <tbody>
          { sessions.map((session, index) => (
            <tr key={`session_${index}`}>
              <td>
                <strong>{ session.title }</strong><br />
                { session.location.title }, { session.location.address.description }
              </td>
              <td>{ moment(`${session.date} ${session.start_time}`).format('MMM DD, YYYY') }<br />{ moment(`${session.date}  ${session.start_time}`).format('h:mm A') } - { moment(`${session.date}  ${session.end_time}`).format('h:mm A') }</td>
              <td className="right aligned">{ session.attendances.length } / { event.tickets_count }</td>
              <td className="proceed">
                <i className="fa fa-chevron-right" />
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  )

}

Sessions.propTypes = {
  event: PropTypes.object,
  sessions: PropTypes.array
}

export default Sessions
