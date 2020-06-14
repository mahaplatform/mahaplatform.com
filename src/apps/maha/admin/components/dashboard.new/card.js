import PropTypes from 'prop-types'
import { Logo } from 'maha-admin'
import React from 'react'

class Card extends React.Component {

  static contextTypes = {
    configuration: PropTypes.object,
    tasks: PropTypes.object
  }

  static propTypes = {
    card: PropTypes.object
  }

  _handleTasks = this._handleTasks.bind(this)

  render() {
    const { dashboardCards } = this.context.configuration
    const { card } = this.props
    const type = dashboardCards.find(dashboardCard => {
      return dashboardCard.code === card.type.code
    })
    return (
      <div className="maha-dashboard-card-container">
        <div className="maha-dashboard-card">
          <div className="maha-dashboard-card-header">
            <div className="maha-dashboard-card-header-details">
              <div className="maha-dashboard-card-header-details-title">
                { card.title }
              </div>
              <div className="maha-dashboard-card-header-details-cardtitle">
                { card.type.app ?
                  <div className={ `maha-dashboard-card-header-details-appicon ${card.type.app.color}` }>
                    <i className={ `fa fa-${card.type.app.icon}` } />
                  </div> :
                  <div className="maha-dashboard-card-header-details-appicon blue">
                    <i className="fa fa-bars" />
                  </div>
                }

                { card.type.title }
              </div>
            </div>
            <div className="maha-dashboard-card-header-icon" onClick={ this._handleTasks }>
              <i className="fa fa-ellipsis-v" />
            </div>
          </div>
          <div className="maha-dashboard-card-body">
            <type.component config={ card.config } />
          </div>
        </div>
      </div>
    )
  }

  _handleTasks() {
    this.context.tasks.open({
      items: [
        { label: 'Edit Card' },
        { label: 'Remove Card' }
      ]
    })
  }

}

export default Card
