const navigation = async (req, trx) => ({
  items: [
    { label: 'Contacts', route: '/contacts' },
    { label: 'Campaigns', items: [
      { label: 'Email', route: '/campaigns/email' },
      { label: 'Outbound SMS', route: '/campaigns/sms' },
      { label: 'Outbound Voice', route: '/campaigns/voice' }
    ] },
    { label: 'Emails', route: '/emails' },
    { label: 'Forms', route: '/forms' },
    { label: 'Organizations', route: '/organizations' },
    { label: 'Programs', route: '/programs' },
    { label: 'Workflows', route: '/workflows' }
  ]
})

export default navigation
