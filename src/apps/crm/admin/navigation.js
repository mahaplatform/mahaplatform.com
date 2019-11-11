const navigation = async (req, trx) => ({
  items: [
    { label: 'Contacts', route: '/contacts' },
    { label: 'Campaigns', route: '/campaigns' },
    { label: 'Emails', route: '/emails' },
    { label: 'Events', route: '/events' },
    { label: 'Forms', route: '/forms' },
    { label: 'Organizations', route: '/organizations' },
    { label: 'Programs', route: '/programs' },
    { label: 'Workflows', route: '/workflows' }
  ]
})

export default navigation
