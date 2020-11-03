const navigation = async (req, trx) => ({
  items: [
    { label: 'Email', route: '/campaigns/email', rights: ['crm:manage_email_campaigns'] },
    { label: 'Inbound SMS', route: '/campaigns/sms/inbound', rights: ['crm:manage_sms_campaigns'] },
    { label: 'Inbound Voice', route: '/campaigns/voice/inbound', rights: ['crm:manage_voice_campaigns'] },
    { label: 'Outbound SMS', route: '/campaigns/sms/outbound', rights: ['crm:manage_sms_campaigns'] },
    { label: 'Outbound Voice', route: '/campaigns/voice/outbound', rights: ['crm:manage_voice_campaigns'] }
  ]
})

export default navigation
