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
  <div className="crm-campaign-type-token">
    <div className={`crm-campaign-type-token-icon ${value}`}>
      <i className={`fa fa-${types[value]}`} />
    </div>
  </div>
)

export default CampaignTypeToken
