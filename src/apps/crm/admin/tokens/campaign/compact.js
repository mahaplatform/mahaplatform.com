import CampaignType from '../campaign_type'
import PropTypes from 'prop-types'
import React from 'react'

const CompactCampaignToken = ({ term, title, type, phone_number }) => (
  <div className="campaign-token">
    <CampaignType value={ type } />
    <div className="campaign-token-label">
      { title || term || phone_number.formatted }
    </div>
  </div>
)

CompactCampaignToken.propTypes = {
  phone_number: PropTypes.object,
  term: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string
}

export default CompactCampaignToken
