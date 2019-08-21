const CreateEmailAddresses = {

  up: async (knex) => {
    await knex.schema.createTable('crm_email_addresses', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('contact_id').unsigned()
      table.foreign('contact_id').references('crm_contacts.id')
      table.string('code')
      table.string('address')
      table.bool('is_primary')
      table.bool('is_valid')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('crm_email_addresses')
  }

}

export default CreateEmailAddresses
