import { Format } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import EmailCampaign from './email_campaign'
import StatusToken from '../../tokens/status'

class Results extends React.Component {

  static contextTypes = {
    card: PropTypes.object
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
              <p>{ campaign.title }</p>
              { campaign.status && campaign.status === 'draft' &&
                <StatusToken value={ campaign.status } />
              }
              { campaign.status && campaign.status != 'draft' &&
                <div className="ui labels">
                  <div className="ui label">
                    Opens

                    <div className="detail">
                      { campaign.opened } (<Format value={ campaign.open_rate } format="percent" />)
                    </div>
                  </div>
                  <div className="ui label">
                    Clicks

                    <div className="detail">
                      { campaign.clicked } (<Format value={ campaign.click_rate } format="percent" />)
                    </div>
                  </div>
                  <div className="ui label">
                    Total Sent
                    <div className="detail">{ campaign.delivered }</div>
                  </div>
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
    this.context.card.push(EmailCampaign, this._getCampaign(campaign))
  }

}

export default Results
