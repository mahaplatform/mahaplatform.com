const CreateRecord = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('datasets_records', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('type_id').unsigned()
      table.foreign('type_id').references('datasets_types.id')
      table.string('code')
      table.timestamp('deleted_at')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('datasets_records')
  }

}

export default CreateRecord
