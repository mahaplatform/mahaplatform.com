const CreatePhoneNumber = {

  up: async (knex) => {
    await knex.schema.createTable('crm_phone_numbers', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('contact_id').unsigned()
      table.foreign('contact_id').references('crm_contacts.id')
      table.string('number')
      table.bool('is_primary')
      table.bool('is_valid')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('crm_phone_numbers')
  }

}

export default CreatePhoneNumber
