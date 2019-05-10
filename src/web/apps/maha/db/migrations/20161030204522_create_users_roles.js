const CreateUsersRoles = {

  up: async (knex) => {
    return await knex.schema.createTable('maha_users_roles', (table) => {
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.integer('role_id').unsigned()
      table.foreign('role_id').references('maha_roles.id')
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_users_roles')
  }

}

export default CreateUsersRoles
