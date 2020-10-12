import PropTypes from 'prop-types'
import React from 'react'

class Results extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    config: PropTypes.object,
    records: PropTypes.array
  }

  render() {
    const { records } = this.props
    return (
      <div className="maha-list">
        { records.map((ticket, index) => (
          <div className="maha-list-item maha-list-item-link" key={`ticket_${index}`} onClick={ this._handleTicket.bind(this, ticket) }>
            <div className="maha-list-item-label">
              { ticket.name }
            </div>
            <div className="maha-list-item-proceed">
              <i className="fa fa-chevron-right" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  _handleTicket(ticket) {
    const { config } = this.props
    this.context.router.history.push(`/events/events/${config.event_id}/tickets/${ticket.id}`)
  }

}

export default Results
