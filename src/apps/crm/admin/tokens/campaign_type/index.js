import React from 'react'

const types = {
  email: 'envelope',
  sms: 'comments',
  social: 'users',
  voice: 'phone',
  postal: 'file'
}

const CampaignTypeToken = ({ value }) => (
  <div className={`crm-campaign-type-token ${value}`}>
    <i className={`fa fa-${types[value]}`} />
  </div>
)

export default CampaignTypeToken
