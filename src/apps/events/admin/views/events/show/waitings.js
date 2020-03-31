import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Waitings = ({ event, waitings }) => {

  const _getButton = (waiting) => ({
    label: waiting.contact.full_name,
    className: 'link',
    route: `/admin/events/events/${event.id}/waitings/${waiting.id}`
  })

  return (
    <div className="maha-table">
      <table>
        <thead>
          <tr>
            <td>Contact</td>
            <td className="collapsing">Tickets</td>
          </tr>
        </thead>
        <tbody>
          { waitings.map((waiting, index) => (
            <tr key={`waiting_${index}`}>
              <td><Button { ..._getButton(waiting) } /></td>
              <td className="right aligned">{ waiting.num_tickets }</td>
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  )

}

Waitings.propTypes = {
  event: PropTypes.object,
  waitings: PropTypes.array
}

export default Waitings
