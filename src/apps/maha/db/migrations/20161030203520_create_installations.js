const CreateInstallations = {

  up: async (knex) => {
    return await knex.schema.createTable('maha_installations', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('app_id').unsigned()
      table.foreign('app_id').references('maha_apps.id')
      table.jsonb('settings')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_installations')
  }

}

export default CreateInstallations
