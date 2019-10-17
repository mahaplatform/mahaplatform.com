import React from 'react'

const types = {
  inbound_voice: 'phone',
  inbound_sms: 'comments',
  email: 'envelope',
  voice: 'phone',
  sms: 'comments',
  postal: 'file',
  social: 'users'
}

const CampaignTypeToken = ({ value }) => (
  <div className={`crm-campaign-type-token ${value}`}>
    <i className={`fa fa-${types[value]}`} />
  </div>
)

export default CampaignTypeToken
