import { Fixtures } from 'maha'

const rolesRightsFixtures = new Fixtures({
  tableName: 'maha_roles_apps',
  records: [
    {
      role_id: 1,
      app_id: 6
    }
  ]
})

export default rolesRightsFixtures
