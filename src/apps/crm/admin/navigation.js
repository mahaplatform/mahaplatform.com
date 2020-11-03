const navigation = async (req, trx) => ({
  items: [
    { label: 'Contacts', route: '/contacts' },
    { label: 'Programs', route: '/programs' }
  ]
})

export default navigation
