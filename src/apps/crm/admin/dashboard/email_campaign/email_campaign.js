import { Container, Button, ProgressBar } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import numeral from 'numeral'
import qs from 'qs'

class EmailCampaign extends React.Component {

  static contextTypes = {
    card: PropTypes.object
  }

  static propTypes = {
    config: PropTypes.object,
    controls: PropTypes.any,
    isExpanded: PropTypes.bool,
    campaign: PropTypes.object,
    performance: PropTypes.object
  }

  render() {
    const { controls, campaign, performance } = this.props

    console.log(campaign)
    console.log(performance)

    return (
      <div className="maha-dashboard-card">
        <div className="maha-dashboard-card-header">
          <div className="maha-dashboard-card-header-details">
            <h2>{ campaign.title }</h2>
            <h3>Email Campaign Performance</h3>
          </div>
          { controls }
        </div>
        <div className="maha-dashboard-card-body">
          <div className="crm-report">
            <div className="crm-report-table">
              <div className="crm-email-campaign-results-header">
                <div className="crm-email-campaign-results-header-item">
                  <div className="crm-email-campaign-results-stat">
                    <div className="crm-email-campaign-results-stat-title">
                      Open Rate
                    </div>
                    <div className="crm-email-campaign-results-stat-percent">
                      { numeral(performance.open_rate).format('0.0%') }
                    </div>
                  </div>
                  <ProgressBar labeled={ false } color="blue" percent={ performance.delivered > 0 ? (performance.opened / performance.delivered) : 0 } />
                </div>
                <div className="crm-email-campaign-results-header-item">
                  <div className="crm-email-campaign-results-stat">
                    <div className="crm-email-campaign-results-stat-title">
                      Click Rate
                    </div>
                    <div className="crm-email-campaign-results-stat-percent">
                      { numeral(performance.click_rate).format('0.0%') }
                    </div>
                  </div>
                  <ProgressBar labeled={ false } color="blue" percent={ performance.opened > 0 ? (performance.clicked / performance.opened) : 0 } />
                </div>
                <div className="crm-email-campaign-results-header-item">
                  <div className="crm-email-campaign-results-stat">
                    <div className="crm-email-campaign-results-stat-title">
                      Bounce Rate
                    </div>
                    <div className="crm-email-campaign-results-stat-percent">
                      { numeral(performance.bounce_rate).format('0.0%') }
                    </div>
                  </div>
                  <ProgressBar labeled={ false } color="blue" percent={ performance.bounced > 0 ? (performance.bounced / performance.sent) : 0 } />
                </div>
              </div>
            </div>
            <div className="crm-report-metrics">
              <div className="crm-report-metric">
                <div className="crm-report-metric-title">Opens</div>
                <div className="crm-report-metric-value">
                  { this._getButton(performance.opened, { was_opened: { $eq: true } }) }
                </div>
              </div>
              <div className="crm-report-metric">
                <div className="crm-report-metric-title">Clicks</div>
                <div className="crm-report-metric-value">
                  { this._getButton(performance.clicked, { was_clicked: { $eq: true } }) }
                </div>
              </div>
              <div className="crm-report-metric">
                <div className="crm-report-metric-title">Bounces</div>
                <div className="crm-report-metric-value">
                  { this._getBounces(performance.bounced) }
                </div>
              </div>
              <div className="crm-report-metric">
                <div className="crm-report-metric-title">Unsubscribes</div>
                <div className="crm-report-metric-value">
                  { this._getButton(performance.unsubscribed, { was_unsubscribed: { $eq: true } }) }
                </div>
              </div>
            </div>
            <div className="crm-report-table">
            </div>
          </div>
        </div>
      </div>
    )
  }

  _getButton(value, $filter) {
    const { campaign } = this.props
    const query = $filter ? `?${qs.stringify({ $filter }, { encode: false })}` : ''
    const button = {
      label: value,
      className: 'link',
      route: `/admin/crm/campaigns/email/${campaign.id}/deliveries${query}`
    }
    return <Button { ...button } />
  }

  _getBounces(value, type) {
    const { campaign } = this.props
    const query = type ? `?$filter[bounce_type][$eq]=${type}` : ''
    const button = {
      label: value,
      className: 'link',
      route: `/admin/crm/campaigns/email/${campaign.id}/bounces${query}`
    }
    return <Button { ...button } />
  }

}

const mapResources = (props, context) => ({
  campaign: `/api/admin/crm/campaigns/email/${props.config.campaign_id}`,
  performance: `/api/admin/crm/campaigns/email/${props.config.campaign_id}/performance`
})

export default Container(mapResources)(EmailCampaign)
