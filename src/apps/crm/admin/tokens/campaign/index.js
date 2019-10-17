import CampaignType from '../campaign_type'
import React from 'react'

const campaigns = {
  inbound_voice: {
    icon: 'phone',
    title: 'Inbound Voice',
    description: 'Answer and handle inbound voice calls'
  },
  outbound_voice: {
    icon: 'phone',
    title: 'Voice Broadcast',
    description: 'Create an interactive voice workflow'
  },
  outbound_sms: {
    icon: 'comments',
    title: 'SMS Broadcast',
    description: 'Create an interactive text message workflow'
  },
  inbound_sms: {
    icon: 'comments',
    title: 'Inbound SMS',
    description: 'Respond to inbound SMS messages'
  },
  email: {
    icon: 'envelope',
    title: 'Email Blast',
    description: 'Create and send a bulk personalized email'
  },
  social: {
    icon: 'users',
    title: 'Social Post',
    description: 'Create and publish a post to Facebook, Instagram, or Twitter'
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
