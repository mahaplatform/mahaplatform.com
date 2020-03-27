import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Tickets = ({ event, tickets }) => {

  const _getButton = (ticket) => ({
    label: ticket.full_name,
    className: 'link',
    route: `/admin/events/events/${event.id}/tickets/${ticket.id}`
  })

  return (
    <div className="maha-table">
      <table className="ui unstackable table">
        <thead>
          <tr>
            <td>Attendee</td>
          </tr>
        </thead>
        <tbody>
          { tickets.map((ticket, index) => (
            <tr key={`ticket_${index}`}>
              <td><Button { ..._getButton(ticket) } /></td>
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  )

}

Tickets.propTypes = {
  event: PropTypes.object,
  tickets: PropTypes.array
}

export default Tickets
