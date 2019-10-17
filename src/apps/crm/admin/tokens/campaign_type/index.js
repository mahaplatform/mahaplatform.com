import React from 'react'

const types = {
  inbound_voice: 'phone',
  outbound_voice: 'phone',
  voice: 'phone',
  inbound_sms: 'comment',
  outbound_sms: 'comment',
  sms: 'comment',
  email: 'envelope',
  social: 'users',
  postal: 'file'
}

const CampaignTypeToken = ({ value }) => (
  <div className={`crm-campaign-type-token ${value}`}>
    <i className={`fa fa-${types[value]}`} />
  </div>
)

export default CampaignTypeToken
