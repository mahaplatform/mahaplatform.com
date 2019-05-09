import Migration from '../../../../core/objects/migration'

const CreateAccesses = new Migration({

  up: async (knex) => {
    return await knex.schema.createTable('drive_access', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('folder_id').unsigned()
      table.foreign('folder_id').references('drive_folders.id')
      table.integer('group_id').unsigned()
      table.foreign('group_id').references('maha_groups.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.integer('access_type_id').unsigned()
      table.foreign('access_type_id').references('drive_access_types.id')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('drive_access')
  }

})

export default CreateAccesses
