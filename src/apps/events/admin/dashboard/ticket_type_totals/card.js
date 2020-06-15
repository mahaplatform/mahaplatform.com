import { Container } from 'maha-admin'
import PropTypes from 'prop-types'
import Details from './details'
import React from 'react'

class TicketTypeTotals extends React.Component {

  static contextTypes = {
    card: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    config: PropTypes.object,
    event: PropTypes.object
  }

  _handleDetails = this._handleDetails.bind(this)

  render() {
    const { event } = this.props
    return (
      <div className="maha-dashboard-card-list ticket-type-totals">
        <table className="ui unstackable compact table">
          <tbody>
            { event.ticket_types.map((ticket_type, index) => (
              <tr key={`ticket_type_${index}`} onClick={ this._handleDetails.bind(this, ticket_type) }>
                <td>
                  <span className={ this._getClass(ticket_type) }>{ ticket_type.name }</span>
                </td>
                <td className="right aligned">
                  { this._getTotal(ticket_type) }
                </td>
                <td className="right aligned">
                  <i className="fa fa-chevron-right" />
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

  _getDetails() {
    return {}
  }

  _getTotal(ticket_type) {
    const parts = [ticket_type.tickets_count]
    if(ticket_type.total_tickets) parts.push(ticket_type.total_tickets)
    return parts.join('/')
  }

  _handleDetails(ticket_type) {
    this.context.card.push(Details, this._getDetails())
  }

}

const mapResources = (props, context) => ({
  event: `/api/admin/events/events/${props.config.event_id}`
})

export default Container(mapResources)(TicketTypeTotals)
