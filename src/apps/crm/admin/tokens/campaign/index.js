import CampaignType from '../campaign_type'
import React from 'react'

const campaigns = {
  email: {
    icon: 'envelope',
    title: 'Email Blast',
    description: 'Create and send a bulk personalized email'
  },
  sms: {
    icon: 'comments',
    title: 'Interactive SMS',
    description: 'Create an interactive text message workflow'
  },
  social: {
    icon: 'users',
    title: 'Social Post',
    description: 'Create and publish a post to Facebook, Instagram, or Twitter'
  },
  voice: {
    icon: 'phone',
    title: 'Interactive Voice',
    description: 'Create an interactive voice workflow'
  },
  postal: {
    icon: 'file',
    title: 'Postal Mailing',
    description: 'Personalize documents to send via postal mail'
  }
}

const CampaignToken = ({ value }) => {
  const campaign = campaigns[value]
  return (
    <div className="campaign-token">
      <CampaignType value={ value } />
      <div className="campaign-token-label">
        <strong>{ campaign.title }</strong><br />
        { campaign.description }
      </div>
    </div>
  )
}

export default CampaignToken
