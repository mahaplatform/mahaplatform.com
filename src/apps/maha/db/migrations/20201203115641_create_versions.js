const CreateVersion = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('maha_versions', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.string('versionable_type')
      table.integer('versionable_id')
      table.jsonb('value')
      table.timestamp('published_at')
      table.timestamp('unpublished_at')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('maha_versions')
  }

}

export default CreateVersion
