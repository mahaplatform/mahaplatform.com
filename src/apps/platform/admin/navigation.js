const navigation = async (req) => ({
  items: [
    { label: 'Activities', route: '/activities' },
    { label: 'Accounts', route: '/accounts' },
    { label: 'Assets', route: '/assets' },
    { label: 'Apps', route: '/apps' },
    { label: 'Banks', route: '/banks' },
    { label: 'Help', route: '/help/articles' },
    { label: 'Queues', route: '/queues' },
    { label: 'Settings', route: '/settings' },
    { label: 'Teams', route: '/teams' }
  ]
})

export default navigation
