const navigation = async (req, trx) => ({
  items: [
    { label: 'Contacts', route: '/contacts' },
    { label: 'Campaigns', route: '/campaigns' },
    { label: 'Forms', route: '/forms' },
    { label: 'Organizations', route: '/organizations' },
    { label: 'Programs', route: '/programs' }
  ]
})

export default navigation
