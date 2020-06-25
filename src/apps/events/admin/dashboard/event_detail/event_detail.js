import { Button, Container, Chart } from 'maha-admin'
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
    event: PropTypes.object,
    isExpanded: PropTypes.bool
  }

  render() {
    const { controls, event } = this.props
    return (
      <div className="maha-dashboard-card scrollable">
        <div className="maha-dashboard-card-header">
          <div className="maha-dashboard-card-header-details">
            <h2>{ event.title }</h2>
            <h3>Event Detail</h3>
          </div>
          { controls }
        </div>
        <div className="maha-dashboard-card-body">
          <Chart { ...this._getChart() } />
          <div className="crm-report">
            <div className="crm-report-metrics">
              <div className="crm-report-metric">
                <div className="crm-report-metric-title">
                  Registrations
                </div>
                <div className="crm-report-metric-value">
                  <div className="link" onClick={ this._handleRegistrations.bind(this)}>
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
                  <div className="link" onClick={ this._handleTicketTypes.bind(this) }>
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
            <div className="crm-report-table">
            </div>
          </div>
        </div>
        <div className="maha-dashboard-card-actions">
          <Button { ...this._getEvent() } />
        </div>
      </div>
    )
  }

  _getChart() {
    const { event } = this.props
    return {
      endpoint: `/api/admin/events/events/${event.id}/performance`,
      started_at: event.created_at
    }
  }

  _getEvent() {
    const { config } = this.props

    return {
      label: ' Manage Event',
      icon: 'gear',
      className: 'link',
      route: `/admin/events/events/${config.event_id}`
    }
  }

  _getRegistrations() {
    const { config, isExpanded, event } = this.props
    return {
      config,
      isExpanded,
      event
    }
  }

  _getTicketTypes() {
    const { config } = this.props
    return {
      config
    }
  }

  _handleRegistrations() {
    this.context.card.push(Registrations, this._getRegistrations())
  }

  _handleTicketTypes() {
    this.context.card.push(TicketTypes, this._getTicketTypes())
  }

}

const mapResources = (props, context) => ({
  event: `/api/admin/events/events/${props.config.event_id}`
})

export default Container(mapResources)(EventDetail)
