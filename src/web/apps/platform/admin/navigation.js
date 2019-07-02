const navigation = async (req) => ({
  items: [
    { label: 'Teams', route: '/teams' },
    { label: 'Assets', route: '/assets' },
    { label: 'Apps', route: '/apps' }
  ]
})

export default navigation
