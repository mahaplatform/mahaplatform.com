import React from 'react'

const campaigns = {
  email: {
    icon: 'envelope-o',
    title: 'Email Blast',
    description: 'Create and send a bulk personalized email'
  },
  sms: {
    icon: 'comment',
    title: 'Interactive SMS',
    description: 'Create an interactive text message workflow'
  },
  voice: {
    icon: 'phone',
    title: 'Interactive Voice',
    description: 'Create an interactive voice workflow'
  },
  mail: {
    icon: 'file-o',
    title: 'Postal Mailing',
    description: 'Personalized documents to send via postal mail'
  }
}

const CampaignToken = ({ value }) => {
  const campaign = campaigns[value]
  return (
    <div className="campaign-token">
      <div className="campaign-token-icon">
        <i className={`fa fa-fw fa-${ campaign.icon }`} />
      </div>
      <div className="campaign-token-label">
        <strong>{ campaign.title }</strong><br />
        { campaign.description }
      </div>
    </div>
  )
}

export default CampaignToken
