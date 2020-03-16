const navigation = async (req, trx) => ({
  items: [
    { label: 'Contacts', route: '/contacts' },
    { label: 'Campaigns', items: [
      { label: 'Email', route: '/campaigns/email' },
      { label: 'Inbound SMS', route: '/campaigns/sms/inbound' },
      { label: 'Inbound Voice', route: '/campaigns/voice/inbound' },
      { label: 'Outbound SMS', route: '/campaigns/sms/outbound' },
      { label: 'Outbound Voice', route: '/campaigns/voice/outbound' }
    ] },
    { label: 'Emails', route: '/emails' },
    { label: 'Forms', route: '/forms' },
    { label: 'Organizations', route: '/organizations' },
    { label: 'Programs', route: '/programs' },
    { label: 'Workflows', route: '/workflows' }
  ]
})

export default navigation
