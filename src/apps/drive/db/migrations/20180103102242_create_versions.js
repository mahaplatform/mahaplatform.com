const CreateVersions = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.createTable('drive_versions', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.integer('file_id').unsigned()
      table.foreign('file_id').references('drive_files.id')
      table.integer('asset_id').unsigned()
      table.foreign('asset_id').references('maha_assets.id')
      table.timestamps()
    })

    await knex.schema.table('drive_files', (table) => {
      table.integer('version_id').unsigned()
      table.foreign('version_id').references('drive_versions.id')
    })

  },

  down: async (knex) => {
    return await knex.schema.dropTable('drive_versions')
  }

}

export default CreateVersions
