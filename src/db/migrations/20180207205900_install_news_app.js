import { Migration } from 'maha'
import moment from 'moment'

const InstallNewsApp = new Migration({

  up: async (knex) => {

    const app = await knex('maha_apps').insert({
      title: 'News',
      app_category_id: 2,
      app_author_id: 1,
      description: 'Organizational Newsfeed',
      version: '1.0.0',
      color: 'brown',
      icon: 'newspaper-o',
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
      title: 'News Beta Testers',
      description: 'News Beta Testers',
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

export default InstallNewsApp
