import { Container, Infinite } from 'maha-admin'
import PropTypes from 'prop-types'
import Results from './results'
import React from 'react'

class TicketTypes extends React.Component {

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
            <h3>Ticket Type Total</h3>
          </div>
          { controls }
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

}

const mapResources = (props, context) => ({
  event: `/api/admin/events/events/${props.config.event_id}`
})

export default Container(mapResources)(TicketTypes)
