import CampaignType from '../campaign_type'
import PropTypes from 'prop-types'
import React from 'react'

const CompactCampaignToken = ({ title, type }) => (
  <div className="campaign-token">
    <CampaignType value={ type } />
    <div className="campaign-token-label">
      { title }
    </div>
  </div>
)

CompactCampaignToken.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string
}

export default CompactCampaignToken
