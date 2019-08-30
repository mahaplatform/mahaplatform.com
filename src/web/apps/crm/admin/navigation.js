const navigation = (req, trx) => ({
  items: [
    { label: 'Administration', rights: [], items: [
      { label: 'Custom Fields', route: '/fields' },
      { label: 'Topics', route: '/topics' },
      { label: 'Programs', route: '/programs' }
    ] },
    { label: 'Contacts', route: '/contacts' },
    { label: 'Lists', route: '/lists' },
    { label: 'Organizations', route: '/organizations' }
  ]
})

export default navigation
