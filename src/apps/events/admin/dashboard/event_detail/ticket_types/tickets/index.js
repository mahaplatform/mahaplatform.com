import { Infinite } from '@admin'
import PropTypes from 'prop-types'
import Results from './results'
import React from 'react'

class Tickets extends React.Component {

  static contextTypes = {
    card: PropTypes.object
  }

  static propTypes = {
    config: PropTypes.object,
    ticket_type: PropTypes.object
  }

  _handleBack = this._handleBack.bind(this)

  render() {
    const { ticket_type } = this.props
    return (
      <div className="maha-dashboard-card">
        <div className="maha-dashboard-card-header maha-dashboard-card-back" onClick={ this._handleBack }>
          <i className="fa fa-chevron-left" />
          <div className="maha-dashboard-card-header-details">
            <h2>{ ticket_type.name } </h2>
          </div>
        </div>
        <div className="maha-dashboard-card-body">
          <Infinite { ...this._getInfinite() } />
        </div>
      </div>
    )
  }

  _getInfinite() {
    const { config, ticket_type } = this.props
    return {
      endpoint:`/api/admin/events/dashboard/ticket_type_totals/${config.event_id}/ticket_types/${ticket_type.id}/tickets`,
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

export default Tickets
