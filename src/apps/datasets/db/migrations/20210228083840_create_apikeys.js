const CreateApikey = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('datasets_apikeys', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('dataset_id').unsigned()
      table.foreign('dataset_id').references('datasets_datasets.id')
      table.string('title')
      table.string('access_token')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('datasets_apikeys')
  }

}

export default CreateApikey
