const navigation = async (req, trx) => ({
  items: [
    { label: 'Contacts', route: '/contacts' },
    { label: 'Campaigns', items: [
      { label: 'Email Campaigns', route: '/campaigns/email' },
      { label: 'SMS Campaigns', route: '/campaigns/sms' },
      { label: 'Voice Campaigns', route: '/campaigns/voice' }
    ] },
    { label: 'Emails', route: '/emails' },
    { label: 'Forms', route: '/forms' },
    { label: 'Organizations', route: '/organizations' },
    { label: 'Programs', route: '/programs' },
    { label: 'Workflows', route: '/workflows' }
  ]
})

export default navigation
