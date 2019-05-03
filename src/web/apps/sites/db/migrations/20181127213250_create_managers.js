import Migration from '../../../../../core/objects/migration'

const CreateManagers = new Migration({

  up: async (knex) => {

    await knex.schema.createTable('sites_managers', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('site_id').unsigned()
      table.foreign('site_id').references('sites_sites.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.enum('role', ['administrator','contributor'])
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('sites_managers')
  }

})

export default CreateManagers
