const CreateRolesRights = {

  databaseName: 'maha',

  up: async (knex) => {
    return await knex.schema.createTable('maha_roles_rights', (table) => {
      table.integer('role_id').unsigned()
      table.foreign('role_id').references('maha_roles.id')
      table.integer('right_id').unsigned()
      table.foreign('right_id').references('maha_rights.id')
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_roles_rights')
  }

}

export default CreateRolesRights
