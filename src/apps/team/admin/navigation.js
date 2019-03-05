import { Navigation } from 'maha'

const navigation = new Navigation(async (req, trx) => ({
  items: [
    { label: 'Activities', rights: ['team:manage_team'], route: '/activities' },
    { label: 'Apps', rights: ['team:manage_apps'], route: '/apps' },
    { label: 'Emails', rights: ['team:manage_team'], route: '/emails' },
    { label: 'Groups', rights: ['team:manage_people'], route: '/groups' },
    { label: 'Imports', rights: ['team:manage_team'], route: '/imports' },
    { label: 'Roles', rights: ['team:manage_people'], route: '/roles' },
    { label: 'Sessions', rights: ['team:manage_people'], route: '/sessions' },
    { label: 'Settings', rights: ['team:manage_team'], route: '/settings' },
    { label: 'Supervisors', rights: ['team:manage_team'], route: '/supervisors' },
    { label: 'Users', rights: ['team:manage_people'], route: '/users' }
  ]
}))

export default navigation
