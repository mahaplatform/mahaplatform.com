import { Rights } from  'maha'

const rights = new Rights([

  {
    code: 'manage_team',
    title: 'Manage Team',
    description: 'manage team settings and view activities'
  }, {
    code: 'manage_apps',
    title: 'Manage Apps',
    description: 'install and manage apps and settings'
  }, {
    code: 'manage_people',
    title: 'Manage People',
    description: 'manage users, groups, and roles'
  }
])

export default rights
