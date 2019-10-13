const navigation = async (req, trx) => ({
  items: [
    { label: 'Automation', route: '/workflows' },
    { label: 'Contacts', route: '/contacts' },
    { label: 'Campaigns', route: '/campaigns' },
    { label: 'Fields', route: '/fields' },
    { label: 'Forms', route: '/forms' },
    { label: 'Lists', route: '/lists' },
    { label: 'Organizations', route: '/organizations' },
    { label: 'Senders', route: '/senders' },
    { label: 'Templates', route: '/templates' },
    { label: 'Topics', route: '/topics' }
  ]
})

export default navigation
