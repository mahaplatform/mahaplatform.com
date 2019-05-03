import Fixtures from '../../../../core/objects/fixtures'

const rightsFixtures = new Fixtures({

  tableName: 'maha_rights',

  records: {

    team_manage_team: (data) => ({
      app_id: data.maha_apps.team.id,
      text: 'MANAGE TEAM',
      description: 'manage team settings and view activities'
    }),

    team_manage_apps: (data) => ({
      app_id: data.maha_apps.team.id,
      text: 'MANAGE APPS',
      description: 'install and manage apps and settings'
    }),

    team_manage_people: (data) => ({
      app_id: data.maha_apps.team.id,
      text: 'MANAGE PEOPLE',
      description: 'manage users, groups, and roles'
    })

  }

})

export default rightsFixtures
