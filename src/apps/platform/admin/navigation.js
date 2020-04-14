const navigation = async (req) => ({
  items: [
    { label: 'Assets', route: '/assets' },
    { label: 'Apps', route: '/apps' },
    { label: 'Help', route: '/help/articles' },
    { label: 'Queues', route: '/queues' },
    { label: 'Settings', route: '/settings' },
    { label: 'Teams', route: '/teams' }
  ]
})

export default navigation
