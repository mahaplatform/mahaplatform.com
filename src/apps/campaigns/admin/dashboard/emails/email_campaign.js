import Performance from '../../../../campaigns/admin/views/email/performance'
import { Button, Container } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class EmailCampaign extends React.Component {

  static contextTypes = {
    card: PropTypes.object
  }

  static propTypes = {
    config: PropTypes.object,
    controls: PropTypes.any,
    isExpanded: PropTypes.bool,
    campaign_id: PropTypes.any,
    campaign: PropTypes.object,
    performance: PropTypes.object
  }

  _handleBack = this._handleBack.bind(this)

  render() {
    const { campaign } = this.props

    return (
      <div className="maha-dashboard-card">
        <div className="maha-dashboard-card-header maha-dashboard-card-back" onClick={ this._handleBack }>
          <i className="fa fa-chevron-left" />
          <div className="maha-dashboard-card-header-details">
            <h2>{ campaign.title }</h2>
          </div>
        </div>
        <div className="maha-dashboard-card-body scrollable">
          <Performance { ...this._getPerformance() }  />
        </div>
        <div className="maha-dashboard-card-footer">
          <Button { ...this._getDetailsButton() } />
        </div>
      </div>
    )
  }

  _getDetailsButton() {
    const { campaign } = this.props

    return {
      label: ' Manage Campaign',
      icon: 'gear',
      className: 'link',
      route: `/admin/campaigns/email/${campaign.id}`
    }
  }

  _getPerformance() {
    const { campaign, performance } = this.props
    return {
      campaign,
      performance
    }
  }

  _handleBack() {
    this.context.card.pop()
  }

}

const mapResources = (props, context) => ({
  performance: `/api/admin/campaigns/email/${props.campaign.id}/performance`
})

export default Container(mapResources)(EmailCampaign)
