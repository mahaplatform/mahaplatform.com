import { Fixtures } from 'maha'

const rolesRightsFixtures = new Fixtures({
  tableName: 'maha_roles_apps',
  records: [
    {
      role_id: 1,
      app_id: 1
    }, {
      role_id: 1,
      app_id: 2
    }, {
      role_id: 1,
      app_id: 3
    }, {
      role_id: 2,
      app_id: 2
    }, {
      role_id: 4,
      app_id: 2
    }, {
      role_id: 4,
      app_id: 3
    }, {
      role_id: 5,
      app_id: 2
    }, {
      role_id: 5,
      app_id: 3
    },{
      role_id: 6,
      app_id: 1
    }, {
      role_id: 6,
      app_id: 2
    }, {
      role_id: 6,
      app_id: 3
    }
  ]
})

export default rolesRightsFixtures
