const CreateRolesApps = {

  up: async (knex) => {
    return await knex.schema.createTable('maha_roles_apps', (table) => {
      table.integer('role_id').unsigned()
      table.foreign('role_id').references('maha_roles.id')
      table.integer('app_id').unsigned()
      table.foreign('app_id').references('maha_apps.id')
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_roles_apps')
  }

}

export default CreateRolesApps
