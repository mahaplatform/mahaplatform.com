import { Container } from 'maha-admin'
import Registrations from './registrations'
import TicketTypes from './ticket_types'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'

class EventDetail extends React.Component {

  static contextTypes = {
    card: PropTypes.object
  }

  static propTypes = {
    config: PropTypes.object,
    controls: PropTypes.any,
    event: PropTypes.object
  }

  render() {
    const { controls, event } = this.props
    return (
      <div className="maha-dashboard-card">
        <div className="maha-dashboard-card-header">
          <div className="maha-dashboard-card-header-details">
            <h2>{ event.title }</h2>
            <h3>Event Detail</h3>
          </div>
          { controls }
        </div>
        <div className="maha-dashboard-card-body">
          <div className="crm-report-metric">
            <div className="crm-report-metric-title">
              Registrations
            </div>
            <div className="crm-report-metric-value">
              <div className="link" onClick={ this._handleRegistrations.bind(this, event)}>
                { event.registrations_count }
              </div>
            </div>
          </div>
          <div className="crm-report-metric">
            <div className="crm-report-metric-title">
              Waiting List
            </div>
            <div className="crm-report-metric-value">
              { event.waitings_count }
            </div>
          </div>
          <div className="crm-report-metric">
            <div className="crm-report-metric-title">
              Tickets
            </div>
            <div className="crm-report-metric-value">
              <div className="link" onClick={ this._handleTicketTypes.bind(this, event) }>
                { event.tickets_count }
              </div>
            </div>
          </div>
          <div className="crm-report-metric">
            <div className="crm-report-metric-title">
              Revenue
            </div>
            <div className="crm-report-metric-value">
              { numeral(event.revenue).format('0.00') }
            </div>
          </div>
        </div>
      </div>
    )
  }

  _handleRegistrations(event) {
    this.context.card.push(Registrations, this._getRegistrations(event))
  }

  _getRegistrations(event) {
    const { config } = this.props
    return {
      config,
      event
    }
  }

  _handleTicketTypes(event) {
    this.context.card.push(TicketTypes, this._getTicketTypes(event))
  }

  _getTicketTypes(event) {
    const { config } = this.props
    return {
      config,
      event
    }
  }
}

const mapResources = (props, context) => ({
  event: `/api/admin/events/events/${props.config.event_id}`
})

export default Container(mapResources)(EventDetail)
