const navigation = async (req) => ({
  items: [
    { label: 'Numbers', route: '/numbers' },
    { label: 'Incoming', route: '/faxes/incoming' },
    { label: 'Outgoing', route: '/faxes/outgoing' }
  ]
})

export default navigation
