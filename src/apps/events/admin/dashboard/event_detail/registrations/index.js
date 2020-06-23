import { Infinite } from 'maha-admin'
import PropTypes from 'prop-types'
import Results from './results'
import React from 'react'

class Registrations extends React.Component {

  static contextTypes = {
    card: PropTypes.object
  }

  static propTypes = {
    config: PropTypes.object
  }

  _handleBack = this._handleBack.bind(this)

  render() {
    return (
      <div className="maha-dashboard-card">
        <div className="maha-dashboard-card-back" onClick={ this._handleBack }>
          <i className="fa fa-chevron-left" />
          Back
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
      endpoint: `/api/admin/events/events/${config.event_id}/registrations`,
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

export default Registrations
