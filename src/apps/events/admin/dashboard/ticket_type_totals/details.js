import PropTypes from 'prop-types'
import React from 'react'

class TicketTypeTotalDetails extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    config: PropTypes.object,
    event: PropTypes.object
  }

  render() {
    return (
      <div className="maha-dashboard-card-details">
        <div className="maha-dashboard-card-details-header">
          <i className="fa fa-chevron-left" />
          back
        </div>
        <div className="maha-dashboard-card-details-body">
          Details
        </div>
      </div>
    )
  }

}

export default TicketTypeTotalDetails
