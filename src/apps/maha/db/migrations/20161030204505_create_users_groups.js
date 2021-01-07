const CreateUsersGroups = {

  databaseName: 'maha',

  up: async (knex) => {
    return await knex.schema.createTable('maha_users_groups', (table) => {
      table.integer('group_id').unsigned()
      table.foreign('group_id').references('maha_groups.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_users_groups')
  }

}

export default CreateUsersGroups
