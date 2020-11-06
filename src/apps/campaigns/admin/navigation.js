const navigation = async (req, trx) => ({
  items: [
    { label: 'Email', rights: ['campaigns:manage_email_campaigns'], route: '/email' },
    { label: 'Inbound SMS', rights: ['campaigns:manage_sms_campaigns'], route: '/sms/inbound' },
    { label: 'Inbound Voice', rights: ['campaigns:manage_voice_campaigns'], route: '/voice/inbound' },
    { label: 'Outbound SMS', rights: ['campaigns:manage_sms_campaigns'], route: '/sms/outbound' },
    { label: 'Outbound Voice', rights: ['campaigns:manage_voice_campaigns'], route: '/voice/outbound' }
  ]
})

export default navigation
