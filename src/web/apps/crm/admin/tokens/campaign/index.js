import React from 'react'

const campaigns = {
  email_blast: {
    icon: 'envelope-o',
    title: 'Email Blast',
    description: 'Send a one-time email'
  },
  email_drip: {
    icon: 'tint',
    title: 'Email Drip',
    description: 'Create a time-based series of emails'
  },
  sms_blast: {
    icon: 'comment',
    title: 'SMS Blast',
    description: 'Send a one-time text message'
  },
  sms_workflow: {
    icon: 'comments',
    title: 'SMS Workflow',
    description: 'Create a text message workflow'
  },
  voice: {
    icon: 'phone',
    title: 'Voice Autodialer',
    description: 'Create a voice workflow'
  },
  mail: {
    icon: 'file-o',
    title: 'Mail Merge',
    description: 'Create a document for the postal mail'
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
