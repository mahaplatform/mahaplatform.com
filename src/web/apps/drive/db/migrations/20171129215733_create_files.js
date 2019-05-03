import Migration from '../../../../../core/objects/migration'

const CreateFiles = new Migration({

  up: async (knex) => {
    return await knex.schema.createTable('drive_files', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('owner_id').unsigned()
      table.foreign('owner_id').references('maha_users.id')
      table.integer('folder_id').unsigned()
      table.foreign('folder_id').references('drive_folders.id')
      table.integer('asset_id').unsigned()
      table.foreign('asset_id').references('maha_assets.id')
      table.string('code')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('drive_files')
  }

})

export default CreateFiles
