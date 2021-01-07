const CreateDocuments = {

  databaseName: 'maha',

  up: async (knex) => {
    return await knex.schema.createTable('drive_documents', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('owner_id').unsigned()
      table.foreign('owner_id').references('maha_users.id')
      table.integer('folder_id').unsigned()
      table.foreign('folder_id').references('drive_folders.id')
      table.string('code')
      table.string('name')
      table.text('body')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('drive_documents')
  }

}

export default CreateDocuments
