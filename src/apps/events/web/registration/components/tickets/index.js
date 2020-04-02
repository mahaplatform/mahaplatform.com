import TicketTypeToken from '../../tokens/ticket_type'
import OrganizerToken from '../../tokens/organizer'
import SessionToken from '../../tokens/session'
import { Button } from 'maha-client'
import PropTypes from 'prop-types'
import Quantity from '../quantity'
import React from 'react'

class Tickets extends React.Component {

  static propTypes = {
    event: PropTypes.object
  }

  state = {
    items: []
  }

  render() {
    const { event } = this.props
    return (
      <div className="registration-panel">
        <div className="registration-panel-body">
          <div className="registration-panel-content">
            <div className="registration-tickets">
              <h1>{ event.title }</h1>
              <p dangerouslySetInnerHTML={{ __html: event.description.replace(/\n/g, '<br />') }} />
              <h2>Sessions</h2>
              <div className="registration-tickets-sessions">
                { event.sessions.map((session, index) => (
                  <div className="registration-tickets-session" key={`session_${index}`}>
                    <SessionToken { ...session } />
                  </div>
                ))}
              </div>

              <h2>Organizers</h2>
              <div className="registration-tickets-organizers">
                { event.organizers.map((organizer, index) => (
                  <div className="registration-tickets-organizer" key={`organizer_${index}`}>
                    <OrganizerToken { ...organizer } />
                  </div>
                ))}
              </div>

              <h2>Tickets</h2>
              <div className="registration-tickets-tickettypes">
                { event.ticket_types.map((ticket_type, index) => (
                  <div className="registration-tickets-tickettype" key={`ticket_type_${index}`}>
                    <div className="registration-tickets-tickettype-token">
                      <TicketTypeToken { ...ticket_type } />
                    </div>
                    <div className="registration-tickets-tickettype-quantity">
                      <Quantity { ...this._getQuantity(ticket_type) } />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="registration-panel-footer">
          <div className="registration-panel-footer-item" />
          <div className="registration-panel-footer-item">
            <Button { ...this._getNext() } />
          </div>
        </div>
      </div>
    )
  }

  _getNext() {
    return {
      label: 'Next &raquo;',
      color: 'red'
    }
  }

  _getQuantity(ticket_type) {
    return {
      max: 5,
      onChange: this._handleUpdate.bind(this, ticket_type)
    }
  }

  _handleUpdate(ticket_type) {}

}

export default Tickets
