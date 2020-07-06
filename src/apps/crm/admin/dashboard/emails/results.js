import { Format } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import EmailCampaign from './email_campaign'

class Results extends React.Component {

  static contextTypes = {
    card: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    config: PropTypes.object,
    records: PropTypes.array
  }

  render() {
    const { records } = this.props
    return (
      <div className="maha-list">
        { records.map((campaign, index) => (
          <div className="maha-list-item maha-list-item-link" key={`campaign_${index}`} onClick={ this._handleCampaign.bind(this, campaign) }>
            <div className="maha-list-item-label">
              <div className="maha-email-dashboard-title">{ campaign.title }</div>
              { campaign.status && campaign.status === 'draft' &&
                <div className="maha-email-dashboard-stats">
                  <span className="maha-email-dashboard-stat">
                    <i>Draft</i>
                  </span>
                </div>
              }
              { campaign.status && campaign.status != 'draft' &&
                <div className="maha-email-dashboard-stats">
                  <span className="maha-email-dashboard-stat">
                    Sent
                    <span className="link maha-email-dashboard-stat-value">{ campaign.delivered }</span>
                  </span>
                  <span className="maha-email-dashboard-stat">
                    Opens
                    <span className="link maha-email-dashboard-stat-value">
                      <Format value={ campaign.open_rate } format="percent" />
                    </span>
                  </span>
                  <span className="maha-email-dashboard-stat">
                    Clicks
                    <span className="link maha-email-dashboard-stat-value">
                      <Format value={ campaign.click_rate } format="percent" />
                    </span>
                  </span>
                </div>
              }
            </div>
            <div className="maha-list-item-proceed">
              <i className="fa fa-chevron-right" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  _getCampaign(campaign) {
    const { config } = this.props
    return {
      config,
      campaign
    }
  }

  _handleCampaign(campaign) {
    if(campaign.status === 'draft') {
      this.context.router.history.push(`/admin/crm/campaigns/email/${campaign.id}`)
    } else {
      this.context.card.push(EmailCampaign, this._getCampaign(campaign))
    }
  }

}

export default Results
