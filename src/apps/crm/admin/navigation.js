const navigation = async (req, trx) => ({
  items: [
    { label: 'Contacts', route: '/contacts' },
    { label: 'Campaigns', route: '/campaigns' },
    { label: 'Forms', route: '/forms' },
    { label: 'Organizations', route: '/organizations' },
    { label: 'Programs', route: '/programs' },
    { label: 'Templates', route: '/templates' },
    { label: 'Workflows', route: '/workflows' }
  ]
})

export default navigation
