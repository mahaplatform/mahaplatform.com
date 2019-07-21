const CreateContacts = {

  up: async (knex) => {
    return await knex.schema.createTable('crm_contacts', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('photo_id').unsigned()
      table.foreign('photo_id').references('maha_assets.id')
      table.string('first_name')
      table.string('last_name')
      table.string('email')
      table.string('phone')
      table.jsonb('values')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('crm_contacts')
  }

}

export default CreateContacts
