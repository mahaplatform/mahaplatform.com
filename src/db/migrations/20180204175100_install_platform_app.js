import { Migration } from 'maha'
import moment from 'moment'

const InstallPlatformApp = new Migration({

  up: async (knex) => {
    
    await await knex('maha_roles').whereIn('id', [1,16]).update({ title: 'Team Administrators' })

    const app = await knex('maha_apps').insert({
      title: 'Platform',
      app_category_id: 1,
      app_author_id: 1,
      description: 'Platform Management',
      version: '1.0.0',
      color: 'yellow',
      icon: 'cog',
      created_at: moment(),
      updated_at: moment()
    }).returning('id')
    
    await knex('maha_installations').insert({
      team_id: 1,
      app_id: app[0],
      settings: {},
      created_at: moment(),
      updated_at: moment()
    })
    
    const role = await knex('maha_roles').insert({
      team_id: 1,
      title: 'Platform Administrators',
      description: 'Platform Administrators',
      created_at: moment(),
      updated_at: moment()      
    }).returning('id')

    await knex('maha_roles_apps').insert({
      role_id: role[0],
      app_id: app[0]
    })

    await knex('maha_users_roles').insert({
      role_id: role[0],
      user_id: 79
    })

  },

  down: async (knex) => {}

})

export default InstallPlatformApp
