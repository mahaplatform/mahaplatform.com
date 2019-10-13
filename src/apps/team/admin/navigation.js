const navigation = async (req) => ({
  items: [
    { label: 'Activities', rights: ['team:manage_team'], route: '/activities' },
    { label: 'Apps', rights: ['team:manage_apps'], route: '/apps' },
    { label: 'Communication', items: [
      { label: 'Email', rights: ['team:manage_team'], route: '/emails' },
      { label: 'Calls', route: '/calls' },
      { label: 'Numbers', route: '/phone_numbers' },
      { label: 'Faxes', route: '/faxes' },
      { label: 'SMS', route: '/sms' }
    ] },
    { label: 'Groups', rights: ['team:manage_people'], route: '/groups' },
    { label: 'Roles', rights: ['team:manage_people'], route: '/roles' },
    { label: 'Sessions', rights: ['team:manage_people'], route: '/sessions' },
    { label: 'Settings', rights: ['team:manage_team'], route: '/settings' },
    { label: 'Supervisors', rights: ['team:manage_team'], route: '/supervisors' },
    { label: 'Users', rights: ['team:manage_people'], route: '/users' }
  ]
})

export default navigation
