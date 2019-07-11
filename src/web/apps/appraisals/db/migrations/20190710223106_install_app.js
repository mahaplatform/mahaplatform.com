const InstallApp = {

  up: async (knex) => {

    const app = await knex('maha_apps').insert({
      code: 'appraisals'
    }).returning('id')

    await knex('maha_teams_apps').insert({
      team_id: 1,
      app_id: app[0]
    })

    await knex('maha_installations').insert({
      team_id: 1,
      app_id: app[0],
      settings: {}
    })

    await knex('maha_roles_apps').insert({
      role_id: 4,
      app_id: app[0]
    })

  },

  down: async (knex) => {
  }

}

export default InstallApp
