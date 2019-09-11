import React from 'react'

const campaigns = {
  email: {
    icon: 'envelope-o',
    title: 'Email Campaign',
    description: 'Create an email workflow'
  },
  sms: {
    icon: 'comment',
    title: 'SMS Campaign',
    description: 'Create a text message workflow'
  },
  voice: {
    icon: 'phone',
    title: 'Voice Campaign',
    description: 'Create a voice workflow'
  },
  mail: {
    icon: 'file-o',
    title: 'Postal Mail Campaign',
    description: 'Create a document for the mail'
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
