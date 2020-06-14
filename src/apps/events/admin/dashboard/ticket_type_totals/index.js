import { Container } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class TicketTypeTotals extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    config: PropTypes.object,
    event: PropTypes.object
  }

  render() {
    const { event } = this.props
    return (
      <div className="events-dashboard-ticket-type-totals">
        <table className="ui unstackable compact table">
          <tbody>
            { event.ticket_types.map((ticket_type, index) => (
              <tr key={`ticket_type_${index}`}>
                <td>
                  <span className={ this._getClass(ticket_type) }>{ ticket_type.name }</span>
                </td>
                <td className="right aligned">
                  <span className="link">
                    { this._getTotal(ticket_type) }
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  _getClass(ticket_type) {
    const classes = []
    if(ticket_type.remaining === 0) classes.push('alert')
    return classes.join(' ')
  }

  _getTotal(ticket_type) {
    const parts = [ticket_type.tickets_count]
    if(ticket_type.total_tickets) parts.push(ticket_type.total_tickets)
    return parts.join('/')
  }

}

const mapResources = (props, context) => ({
  event: `/api/admin/events/events/${props.config.event_id}`
})

export default Container(mapResources)(TicketTypeTotals)
