import PropTypes from 'prop-types'
import React from 'react'
import EmailCampaign from './email_campaign'

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
              <span>{ campaign.title }</span>
            </div>
            <div className="maha-list-item-data">
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
