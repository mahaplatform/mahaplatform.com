const CreateAssets = {

  up: async (knex) => {
    return await knex.schema.createTable('maha_assets', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.string('original_file_name')
      table.string('file_name')
      table.string('content_type')
      table.integer('file_size')
      table.integer('chunks_total')
      table.timestamps()    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_assets')
  }

}

export default CreateAssets
