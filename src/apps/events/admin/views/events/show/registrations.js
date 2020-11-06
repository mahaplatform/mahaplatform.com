import { Button } from '@admin'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'

const Tickets = ({ event, registrations }) => {

  const _getButton = (registration) => ({
    label: registration.contact.full_name,
    className: 'link',
    route: `/admin/events/events/${event.id}/registration/${registration.id}`
  })

  return (
    <div className="maha-table">
      <table>
        <thead>
          <tr>
            <td>Contact</td>
            <td className="collapsing">Tickets</td>
            <td className="collapsing">Revenue</td>
          </tr>
        </thead>
        <tbody>
          { registrations.map((registration, index) => (
            <tr key={`registration_${index}`}>
              <td><Button { ..._getButton(registration) } /></td>
              <td className="right aligned">{ registration.tickets.length }</td>
              <td className="right aligned">{ numeral(registration.revenue).format('0.00') }</td>
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  )

}

Tickets.propTypes = {
  event: PropTypes.object,
  registrations: PropTypes.array
}

export default Tickets
