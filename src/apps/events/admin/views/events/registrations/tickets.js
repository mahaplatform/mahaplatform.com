import PropTypes from 'prop-types'
import React from 'react'

class Tickets extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    event: PropTypes.object,
    registration: PropTypes.object,
    tickets: PropTypes.array
  }

  render() {
    const { tickets } = this.props
    return (
      <div className="maha-table">
        <table>
          <thead>
            <tr>
              <td>Attendee</td>
              <td>Ticket Type</td>
              <td />
            </tr>
          </thead>
          <tbody>
            { tickets.map((ticket, index) => (
              <tr key={`ticket_${index}`} onClick={ this._handleClick.bind(this, ticket) }>
                <td>{ ticket.name }</td>
                <td>{ ticket.ticket_type.name }</td>
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

  _handleClick(ticket) {
    const { router } = this.context
    const { event } = this.props
    router.history.push(`/admin/events/events/${event.id}/tickets/${ticket.id}`)
  }

}

export default Tickets
