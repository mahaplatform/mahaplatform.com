const CreateType = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('datasets_types', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('dataset_id').unsigned()
      table.foreign('dataset_id').references('datasets_datasets.id')
      table.string('code')
      table.string('title')
      table.jsonb('config')
      table.timestamp('deleted_at')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('datasets_types')
  }

}

export default CreateType
