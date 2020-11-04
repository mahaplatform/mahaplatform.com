import PropTypes from 'prop-types'
import { Logo } from 'maha-admin'
import React from 'react'

const CompactCampaignToken = ({ phone_number, program , term, title, type }) => (
  <div className="campaign-token">
    <div className="campaign-token-logo">
      <Logo team={ program } width="24" />
    </div>
    <div className="campaign-token-label">
      { title || term || phone_number.formatted }
    </div>
  </div>
)

CompactCampaignToken.propTypes = {
  phone_number: PropTypes.object,
  program: PropTypes.object,
  term: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string
}

export default CompactCampaignToken
