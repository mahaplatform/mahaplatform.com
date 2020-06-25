import PropTypes from 'prop-types'
import React from 'react'
import Tickets from './tickets'

class Results extends React.Component {

  static contextTypes = {
    card: PropTypes.object
  }

  static propTypes = {
    config: PropTypes.object,
    records: PropTypes.array
  }

  render() {
    const { records } = this.props
    return (
      <div className="maha-list">
        { records.map((ticket_type, index) => (
          <div className="maha-list-item maha-list-item-link" key={`ticket_type_${index}`} onClick={ this._handleTickets.bind(this, ticket_type) }>
            <div className="maha-list-item-label">
              <span className={ this._getClass(ticket_type) }>{ ticket_type.name }</span>
            </div>
            <div className="maha-list-item-data">
              { this._getTotal(ticket_type) }
            </div>
            <div className="maha-list-item-proceed">
              <i className="fa fa-chevron-right" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  _getClass(ticket_type) {
    const classes = []
    if(ticket_type.remaining === 0) classes.push('alert')
    return classes.join(' ')
  }

  _getTickets(ticket_type) {
    const { config } = this.props
    return {
      config,
      ticket_type
    }
  }

  _getTotal(ticket_type) {
    const parts = [ticket_type.tickets_count]
    if(ticket_type.total_tickets) parts.push(ticket_type.total_tickets)
    return parts.join('/')
  }

  _handleTickets(ticket_type) {
    this.context.card.push(Tickets, this._getTickets(ticket_type))
  }

}

export default Results
