const navigation = async (req, trx) => ({
  items: [
    { label: 'Email', route: '/email', rights: ['crm:manage_email_campaigns'] },
    { label: 'Inbound SMS', route: '/sms/inbound', rights: ['crm:manage_sms_campaigns'] },
    { label: 'Inbound Voice', route: '/voice/inbound', rights: ['crm:manage_voice_campaigns'] },
    { label: 'Outbound SMS', route: '/sms/outbound', rights: ['crm:manage_sms_campaigns'] },
    { label: 'Outbound Voice', route: '/voice/outbound', rights: ['crm:manage_voice_campaigns'] }
  ]
})

export default navigation
