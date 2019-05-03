import Migration from '../../../../core/objects/migration'

const CreateTeamsApps = new Migration({
  
  up: async (knex) => {
    return await knex.schema.createTable('maha_teams_apps', (table) => {
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('app_id').unsigned()
      table.foreign('app_id').references('maha_apps.id')
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_teams_apps')
  }

})

export default CreateTeamsApps
