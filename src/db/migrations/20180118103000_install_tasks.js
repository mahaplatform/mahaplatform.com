import { Migration } from 'maha'
import moment from 'moment'

const InstallTasks = new Migration({

  up: async (knex) => {

    const app = await knex('maha_apps').insert({
      title: 'Tasks',
      app_category_id: 1,
      app_author_id: 1,
      description: 'Organization Task Management',
      version: '1.0.0',
      color: 'pink',
      icon: 'check',
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
      title: 'Task Beta Testers',
      description: 'Task Beta Testers',
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

export default InstallTasks
