const navigation = async (req, trx) => ({
  items: [
    { label: 'Teams', rights: [], route: '/teams' },
    { label: 'Assets', rights: [], route: '/assets' },
    { label: 'Apps', rights: [], route: '/apps' }
  ]
})

export default navigation
