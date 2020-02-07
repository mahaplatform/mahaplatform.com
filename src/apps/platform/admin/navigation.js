const navigation = async (req) => ({
  items: [
    { label: 'Assets', route: '/assets' },
    { label: 'Apps', route: '/apps' },
    { label: 'Settings', route: '/settings' },
    { label: 'Teams', route: '/teams' }
  ]
})

export default navigation
