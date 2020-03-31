const navigation = async (req) => ({
  items: [
    { label: 'Events', route: '/events' },
    { label: 'Locations', route: '/locations' },
    { label: 'Organizers', route: '/organizers' }
  ]
})

export default navigation
