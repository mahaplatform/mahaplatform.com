import { Migration } from 'maha'

const CreateFolders = new Migration({

  up: async (knex) => {
    return await knex.schema.createTable('drive_folders', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('owner_id').unsigned()
      table.foreign('owner_id').references('maha_users.id')
      table.integer('parent_id').unsigned()
      table.foreign('parent_id').references('drive_folders.id')
      table.string('code')
      table.string('label')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('drive_folders')
  }

})

export default CreateFolders
