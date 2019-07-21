const CreateOrganizations = {

  up: async (knex) => {
    return await knex.schema.createTable('crm_organizations', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('logo_id').unsigned()
      table.foreign('logo_id').references('maha_assets.id')
      table.string('name')
      table.jsonb('values')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('crm_organizations')
  }

}

export default CreateOrganizations
