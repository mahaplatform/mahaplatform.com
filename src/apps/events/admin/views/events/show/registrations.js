import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'

const Tickets = ({ event }) => {

  const registrations = [
    { id: 1, contact: { id: 1, full_name: 'Greg Kops' }, tickets: [{}], revenue: 60.00 },
    { id: 2, contact: { id: 1, full_name: 'Alice Kops' }, tickets: [{},{},{},{}], revenue: 240.00 },
    { id: 3, contact: { id: 1, full_name: 'Kenneth Schalther' }, tickets: [{},{}], revenue: 120.00 }
  ]

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
