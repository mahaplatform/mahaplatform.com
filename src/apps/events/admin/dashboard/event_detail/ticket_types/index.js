import { Container, Infinite } from 'maha-admin'
import PropTypes from 'prop-types'
import Results from './results'
import React from 'react'

class TicketTypes extends React.Component {

  static contextTypes = {
    card: PropTypes.object
  }

  static propTypes = {
    config: PropTypes.object,
    controls: PropTypes.any
  }

  _handleBack = this._handleBack.bind(this)

  render() {
    return (
      <div className="maha-dashboard-card">
        <div className="maha-dashboard-card-header">
          <div className="maha-dashboard-card-back" onClick={ this._handleBack }>
            <i className="fa fa-chevron-left" />
            Back
          </div>
          <div className="maha-dashboard-card-header-details">
            <h2>Tickets Sold</h2>
            <h3>By Ticket Type</h3>
          </div>
        </div>
        <div className="maha-dashboard-card-body">
          <Infinite { ...this._getInfinite() } />
        </div>
      </div>
    )
  }

  _getInfinite() {
    const { config } = this.props
    return {
      endpoint: `/api/admin/events/dashboard/ticket_type_totals/${config.event_id}/ticket_types`,
      layout: Results,
      props: {
        config
      }
    }
  }

  _handleBack() {
    this.context.card.pop()
  }
}

const mapResources = (props, context) => ({
  event: `/api/admin/events/events/${props.config.event_id}`
})

export default Container(mapResources)(TicketTypes)
